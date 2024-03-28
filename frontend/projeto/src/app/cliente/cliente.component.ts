import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClienteService } from './cliente.service';
import { Cliente } from './cliente';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  providers: [ClienteService],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent {

  private readonly router = 'http://localhost:3000/cliente/'

  cliente:FormGroup;

  clientes: Cliente[] = [];

  constructor(
    private FormBuilder: FormBuilder, 
    private service: ClienteService,
  ){
    this.cliente = this.FormBuilder.group({
      _id: [{value:'', disabled: false},],
      nome: [{value:'', disabled: false}, Validators.compose([Validators.required])],
      telefone: [{value:'', disabled:false}, Validators.compose([Validators.required])],
      email: [{value:'', disabled: false}, Validators.compose([Validators.required])],
      coordenadas: this.FormBuilder.group({
        x: [{value:'', disabled: false}, Validators.compose([ Validators.required])],  
        y: [{value:'', disabled: false}, Validators.compose([ Validators.required])],
      }),
    })
  }

  salvar() {
    this.service.salvar(this.cliente.getRawValue())
    .subscribe({
      next: (response) => {
        alert(response);
        this.limpar();
        this.listar();
      },
      error: (response) => {
        console.error(response);
      }
    });
  }

  listar() {
    this.service.listar()
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
        console.error(response);
      }
    });
  }

  rotas(){
    this.service.rotas()
    .subscribe({
      next: (response) => {
        if(typeof response === 'string'){
          alert(response);
          return;
        }
        this.clientes = response
      },
      error: (response) => {
        console.error(response);
      }
    });
  }

  consultar(event: Event) {
    if(!this.cliente.get('_id')?.value){
      alert("Operação consultar: id obrigatório!");
      return;
    }

    this.service.consultar(this.cliente.get('_id')?.value)
    .subscribe({
      next: async (response) => {
        if(typeof response === 'string'){
          alert(response);
          return;
        }
        this.cliente.get('_id')?.disable();
        this.cliente.patchValue(response);
        if(event.target instanceof  HTMLButtonElement){
          event.target!.disabled=true;
        }
      },
      error: (response) => {
        console.error(response);
      }
    })
  }

  atualizar(){
    
    if(!this.cliente.get('_id')?.value){
      alert("Operação atualizar: id obrigatório!");
      return;
    }

    this.service.atualizar(this.cliente.getRawValue())
    .subscribe({
      next: (response) => {
        this.limpar();
        this.listar();
      },
      error: (response) => {
        console.error(response);
      }
    });
  }

  excluir() {
    if(!this.cliente.get('_id')?.value){
      alert("Operação excluir: id obrigatório!");
      return;
    }

    this.service.excluir(this.cliente.get('_id')?.value)
    .subscribe({
      next: (response) => {
        alert(response);
        this.limpar();
        this.listar();
      },
      error: (response) => {
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
    listar: () => !this.cliente.get('_id')?.value? 'Listar': 'Filtrar',
    salvar: () =>  'Salvar',
  }

}