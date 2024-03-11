import { Listar } from './../../../../../backend/src/cliente/daos/clienteDao';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent  {

  private readonly router = 'http://localhost:3000/cliente/'

  cliente:FormGroup;

  clientes: any[] = [];

  button = {
    listar: false,
    consultar: false,
    calcular: false,
    salvar: false,
    limpar: true,
    atualizar: true,
    excluir: true,
  }

  buttonText = {
    listar: 'Listar',
    salvar: 'Salvar',
  }

  constructor(private FormBuilder: FormBuilder, private http: HttpClient) {
    this.cliente = this.FormBuilder.group({
      _id: [''],
      nome: [''],
      telefone: [''],
      email: [''],
      coordenadas: this.FormBuilder.group({x: [''],  y: [''],}),
    });
  }
  

  habilitar(disabled: boolean){
    this.button.listar = disabled;
    this.button.consultar = disabled;
    this.button.calcular = disabled;
    this.button.salvar = disabled;
  }

  desabilitar(disabled: boolean){
    this.button.limpar = disabled;
    this.button.atualizar = disabled;
    this.button.excluir = disabled;
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
        this.clientes = response
        this.button.limpar = false;
      },
      error: (response) => {
        alert(response.error);
        console.error(response);
      }
    });
  }

  consultar() {
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
        this.button.limpar = false;
        this.button.atualizar = false;
        this.button.excluir = false;
        this.button.salvar = true;
      },
      error: (response) => {
        alert(response.error);
        console.error(response);
      }
    });
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

  rotas(){
    this.http.get<[]>(`${this.router}rotas`)
    .subscribe({
      next: (response) => {
        if(typeof response === 'string'){
          alert(response);
          return;
        }
        this.clientes = response
        this.button.limpar = false;
      },
      error: (response) => {
        alert(response.error);
        console.error(response);
      }
    });
  }

  filtrar(){
    if(!this.cliente.value._id){
      this.buttonText.listar = 'Listar';
    }
    else{
      this.buttonText.listar = 'Filtrar';
    }
    this.button.limpar = false;
  }

  limpar() {
    this.cliente.reset();
    this.clientes = [];
    this.buttonText.listar = 'Listar';
    this.cliente.value._id='';
    this.habilitar(false);
    this.desabilitar(true);
  }

}