import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';


@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  listas: Lista[] = [];

  constructor() {

    this.loadLocalStorage();

  }

  setLista(titulo: string) {
    const nuevaLista = new Lista(titulo);
    this.listas.push( nuevaLista );
    this.saveLocalStorage();
  }

  saveLocalStorage() {
    localStorage.setItem('lista', JSON.stringify(this.listas))
  }

  loadLocalStorage() {
    if (localStorage.getItem('lista')) {
      this.listas = JSON.parse(localStorage.getItem('lista'));
    }
  }


}
