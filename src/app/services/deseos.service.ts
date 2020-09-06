import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';
import { ListaItem } from '../models/lista-item.model';


@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  listas : Lista[]     = [];
  items  : ListaItem[] = [];

  constructor() {

    this.loadLocalStorage();

  }
// CONFIGURACIÓN LISTAS-------------------------------------------------------------------------------

  setLista(titulo: string) {
    const nuevaLista = new Lista(titulo);
    this.pushNewList( nuevaLista );
    this.saveLocalStorage();
    return this.returnListaId( nuevaLista );
  }
  pushNewList( lista:Lista ){
    this.listas.push( lista );
  }
  returnListaId( lista: Lista ){
    return lista.id;
  }

  obtenerLista( id: string | number ){
    id = Number( id );
    
    return this.listas.find( lista => lista.id === id );
  }


// CONFIGURACION ITEMS ----------------------------------------------------------------------------
  saveItem( description: string , id :string | number ){
   
    let lista = this.listas.find( lista => id === lista.id );
    const nuevoItem = new ListaItem( description );
    lista.items.push( nuevoItem  );
    this.saveLocalStorage();
   }

// LOCAL STORAGE -------------------------------------------------------------------------------------
  saveLocalStorage() {
    localStorage.setItem('lista', JSON.stringify(this.listas))
  }

  loadLocalStorage() {
    if (localStorage.getItem('lista')) {
      this.listas = JSON.parse(localStorage.getItem('lista'));
    }
  }


}

