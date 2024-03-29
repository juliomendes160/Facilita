import { CommonModule } from '@angular/common';
import { HttpClientModule,} from '@angular/common/http';
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
        alert(response.body);
        this.limpar();
        this.listar();
      },
      error: (response) => {
        alert(response.error);
      }
    });
  }

  listar() {
    this.service.listar()
    .subscribe({
      next: (response) => {
        if(response.status===204){
          return alert('Registro inexistente!');
        }
        if(response.body instanceof Object){
          this.clientes = response.body
        }
      },
      error: (response) => {
        alert(response.error);
      }
    });
  }

  filtrar() {
    this.service.filtrar(this.cliente.get('_id')?.value)
    .subscribe({
      next: (response) => {
        if(response.status===204){
          return alert('Registro inexistente!');
        }
        if(response.body instanceof Object){
          this.clientes = response.body
        }
      },
      error: (response) => {
        alert(response.error);
      }
    });
  }

  rotas(){
    this.service.rotas()
    .subscribe({
      next: (response) => {
        if(response.status===204){
          return alert('Registro inexistente!');
        }
        if(response.body instanceof Object){
          this.clientes = response.body
        }
      },
      error: (response) => {
        alert(response.error);
      }
    });
  }

  consultar(event: Event) {
    this.service.consultar(this.cliente.get('_id')?.value)
    .subscribe({
      next: async (response) => {
        if(response.status===204){
          return alert('Registro inexistente!');
        }
        this.cliente.get('_id')?.disable();
        this.cliente.patchValue(response.body as Object);
        if(event.target instanceof HTMLButtonElement){
          event.target.disabled = true;
        }
      },
      error: (response) => {
        alert(response.error);
      }
    })
  }

  atualizar(){
    this.service.atualizar(this.cliente.getRawValue())
    .subscribe({
      next: (response) => {
        alert(response.body)
        this.limpar();
        this.listar();
      },
      error: (response) => {
        alert(response.error);
      }
    });
  }

  excluir() {
    this.service.excluir(this.cliente.get('_id')?.value)
    .subscribe({
      next: (response) => {
        alert(response.body);
        this.limpar();
        this.listar();
      },
      error: (response) => {
        alert(response.error);
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

  disabled = {
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
            return this.disabled.limpar(formGroup.get(key) as FormGroup);
          }
          if (formGroup.get(key)?.value) {
            return false;
          }
        }
        return true;
    },
  }

  click = {
    listar: () => !this.cliente.get('_id')?.value? this.listar(): this.filtrar(),
  }

  text = {
    listar: () => !this.cliente.get('_id')?.value? 'Listar': 'Filtrar',
  }

}