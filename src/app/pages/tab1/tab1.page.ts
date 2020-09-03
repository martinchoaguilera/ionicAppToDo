import { Component } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  lists: any[]=[];
  constructor( public deseosServices: DeseosService,
               private router: Router) {

    this.lists = deseosServices.listas;
    console.log( this.lists );
  }
  
  agregarLista(){
    this.router.navigateByUrl( '/tabs/tab1/agregar' );
  }
}