import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly router = 'http://localhost:3000/cliente'

  constructor(private http: HttpClient) { }

  salvar(cliente: Cliente): Observable<HttpResponse<Cliente>>{
    return this.http.post<Cliente>(`${this.router}/salvar`, cliente, {observe: 'response' });
  }

  listar(): Observable<HttpResponse<Cliente[]>> {
    return this.http.get<Cliente[]>(`${this.router}/listar`, { observe: 'response' });
  }

  filtrar(q: string): Observable<HttpResponse<Cliente[]>> {
    let params = new HttpParams().set("q", q);
    return this.http.get<Cliente[]>(`${this.router}/filtrar`, { params: params, observe: 'response' });
  }

  rotas(): Observable<HttpResponse<Cliente[]>> {
    return this.http.get<Cliente[]>(`${this.router}/rotas`, { observe: 'response' });
  }

  consultar(_id: string): Observable<HttpResponse<Cliente>> {
    return this.http.get<Cliente>(`${this.router}/consultar/${_id}`, { observe: 'response' });
  }

  atualizar(cliente: Cliente): Observable<HttpResponse<Cliente>>{
    return this.http.put<Cliente>(`${this.router}/atualizar`, cliente, { observe: 'response' });
  }

  excluir(_id: string): Observable<HttpResponse<Cliente>> {
    return this.http.delete<Cliente>(`${this.router}/excluir/${_id}`, { observe: 'response' });
  }
}
