import { Listar } from './../../../../../backend/src/cliente/daos/clienteDao';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent {

  private readonly router = 'http://localhost:3000/cliente/'

  cliente:FormGroup;

  clientes: any [] = [];

  constructor(private FormBuilder: FormBuilder, private http: HttpClient) {
    this.cliente = this.FormBuilder.group({
      _id: [{value:'', disabled: false},],
      nome: [{value:'', disabled: false}, Validators.compose([Validators.required])],
      telefone: [{value:'', disabled: false}, Validators.compose([Validators.required])],
      email: [{value:'', disabled: false}, Validators.compose([Validators.required])],
      coordenadas: this.FormBuilder.group({
        x: [{value:'', disabled: false}, Validators.compose([ Validators.required])],  
        y: [{value:'', disabled: false}, Validators.compose([ Validators.required])],
      }),
    })
  }
  
  salvar() {
    this.http.post(`${this.router}`, this.cliente.value)
    .subscribe({
      next: (response) => {
        alert(response);
        this.limpar();
        this.listar();
      },
      error: (response) => {
        alert(response.error);
        console.error(response);
      }
    });
  }

  listar() {
    this.http.get<[]>(`${this.router}?q=${this.cliente.value._id}`)
    .subscribe({
      next: (response) => {
        if(typeof response === 'string'){
          alert(response);
          this.limpar();
          return;
        }
        this.clientes = response;
      },
      error: (response) => {
        alert(response.error);
        console.error(response);
      }
    });
  }

  rotas(){
    this.http.get<[]>(`${this.router}rotas`)
    .subscribe({
      next: (response) => {
        if(typeof response === 'string'){
          alert(response);
          return;
        }
        this.clientes = response
      },
      error: (response) => {
        alert(response.error);
        console.error(response);
      }
    });
  }

  consultar(event: Event) {
    if(!this.cliente.value._id){
      alert("Operação consultar: id obrigatório!");
      return;
    }

    this.http.get(`${this.router}${this.cliente.value._id}`)
    .subscribe({
      next: (response) => {
        if(typeof response === 'string'){
          alert(response);
          return;
        }
        this.cliente.patchValue(response);
        this.cliente.get('_id')?.disable();
        if(event.target instanceof  HTMLButtonElement){
          event.target!.disabled=true;
        }
      },
      error: (response) => {
        alert(response.error);
        console.error(response);
      }
    })
  }

  atualizar(){
    
    if(!this.cliente.value._id){
      alert("Operação atualizar: id obrigatório!");
      return;
    }

    this.http.put(`${this.router}${this.cliente.value._id}`, this.cliente.value)
    .subscribe({
      next: (response) => {
        alert(response);
        this.listar();
      },
      error: (response) => {
        alert(response.error);
        console.error(response);
      }
    });
  }

  excluir() {
    if(!this.cliente.value._id){
      alert("Operação excluir: id obrigatório!");
      return;
    }

    this.http.delete(`${this.router}${this.cliente.value._id}`)
    .subscribe({
      next: (response) => {
        alert(response);
        this.limpar();
        this.listar();
      },
      error: (response) => {
        alert(response.error);
        console.error(response);
      }
    });
  }

  limpar() {
    this.cliente.reset({
      _id: {value:'', disabled: false},
      nome: {value:'', disabled: false},
      telefone: {value:'', disabled: false},
      email: {value:'', disabled: false},
      coordenadas: {
        x: {value:'', disabled: false},
        y: {value:'', disabled: false}
      }
    });
    this.clientes = [];
  }

  validar = {
      listar: () => false,
      rotas: () => false,
      consultar: () =>  !this.cliente.get('_id')?.value,
      salvar: () => this.cliente.valid? this.cliente.get('_id')?.disabled : true,
      atualizar: () => this.cliente.get('_id')?.enabled,
      excluir: () => this.cliente.get('_id')?.enabled,
      limpar: (formGroup: FormGroup): boolean  => {
        if (this.clientes.length){
          return false;
        }
        
        for (const key in formGroup.controls) {
          if (formGroup.get(key) instanceof FormGroup) {
            return this.validar.limpar(formGroup.get(key) as FormGroup);
          }
          if (formGroup.get(key)?.value) {
            return false;
          }
        }
        return true;
    },
  }

  text = {
    listar: () => !this.cliente.value._id? 'Listar': 'Filtrar',
    salvar: () =>  'Salvar',
  }

}