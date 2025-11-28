import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Moradia } from '../models/moradia/moradia';

@Injectable({
  providedIn: 'root'
})
export class MoradiaService {

  private api = 'http://localhost:8080/api/moradias';

  constructor(private http: HttpClient) { }

  getById(id: number): Observable<Moradia> {
    return this.http.get<Moradia>(`${this.api}/${id}`);
  }

  // lembrar de talvez adicionar no back o sistema de mandar mensagem e o de reservar
  // sendMessageToOwner(moradiaId: number, payload: { fromEmail?: string; message: string }) {
  //   return this.http.post(`${this.api}/${moradiaId}/message`, payload);
  // }

  // // endpoint reserva (opcional)
  // reservar(moradiaId: number, payload: { usuarioId?: number; dataInicio: string; dataFim: string }) {
  //   return this.http.post(`${this.api}/${moradiaId}/reservar`, payload);
  // }

  filtrar(f: any) {
    let params = new HttpParams();

    if (f.texto) params = params.set('texto', f.texto);
    if (f.minPreco) params = params.set('minPreco', f.minPreco);
    if (f.maxPreco) params = params.set('maxPreco', f.maxPreco);
    if (f.quartos) params = params.set('quartos', f.quartos);
    if (f.tipo) params = params.set('tipo', f.tipo);

    return this.http.get<any[]>(`${this.api}/filtrar`, { params });
  }

  getByOwner(ownerId: number): Observable<Moradia[]> {
    return this.http.get<Moradia[]>(`${this.api}/dono/${ownerId}`);
  }

  criarMoradia(data: any) {
    return this.http.post(`${this.api}`, data);
  }


}
