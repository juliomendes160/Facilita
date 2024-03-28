import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly router = 'http://localhost:3000/cliente'

  constructor(private http: HttpClient) { }

  salvar(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(this.router, cliente);
  }
  
  listar(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.router);
  }

  rotas(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${this.router}/rotas`);
  }

  consultar(_id: string): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.router}/${_id}`);
  }

  atualizar(cliente: Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(this.router, cliente);
  }

  excluir(_id: string): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.router}/${_id}`);
  }
}
