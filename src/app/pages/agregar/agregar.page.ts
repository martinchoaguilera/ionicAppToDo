import { Component } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Lista } from '../../models/lista.model';
import { ActivatedRoute } from '@angular/router';
import { ListaItem } from 'src/app/models/lista-item.model';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage {
  lista: Lista;
  items: ListaItem[]= [];
  nameItem: string = '';
  constructor( private deseosService: DeseosService,
               private router: ActivatedRoute ) { 
    this.router.params.subscribe( params => {
      this.lista = deseosService.obtenerLista( params.idLista );
      this.items = this.lista.items;
    })
  }
  
  newItem( ){
    console.log('Holaa');
    const id = this.lista.id;
    if( this.nameItem.length === 0 ){
      return;
    }
    this.deseosService.saveItem( this.nameItem , id );
    this.nameItem = '';
  }

  changeCheck( item: ListaItem ){

    const pendientes= this.lista.items
                                .filter( itemData => !itemData.completado )
                                .length;
    if( pendientes === 0 ){
      this.lista.terminadaEn = new Date();
      this.lista.completada  = true;
    }else{
      this.lista.terminadaEn = null;
      this.lista.completada  = false;
    }
    this.deseosService.saveLocalStorage();
  }

  delete( index : number ){
    this.lista.items.splice( index, 1 );
    this.deseosService.saveLocalStorage();
  }
  // changeCheck( item: ListaItem ){
  //   console.log( item );
  //   this.deseosService.saveLocalStorage();
  //   let contador: number = 0;
  //   for( item of this.lista.items ){
      
  //     if( item.completado === true ){
  //       contador += 1;
  //     }
  //   }
  //   if( contador === this.items.length ){
  //     this.lista.completada = true
  //     this.deseosService.saveLocalStorage();
  //     console.log( this.lista.completada = true );
  //   }else{
  //     this.lista.completada = false;
  //     this.deseosService.saveLocalStorage();
  //   }
  // }

}
