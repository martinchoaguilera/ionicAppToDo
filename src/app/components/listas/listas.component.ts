import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Lista } from 'src/app/models/lista.model';
import { AlertController, IonList } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent {

  @ViewChild( IonList ) lista: IonList;
  @Input() terminada = true;

  constructor(public deseosServices: DeseosService,
    private alertController: AlertController,
    private router: Router) { }

  viewDetail(id: number) {

    if (this.terminada) {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${id}`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${id}`);
    }

  }

  delete(i: number) {
    this.deseosServices.listas.splice(i, 1);
    this.deseosServices.saveLocalStorage();
  }

  async edit(titulo: string , id : number) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Modifica el título',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: titulo,
          placeholder: 'Placeholder 1'
        },
      ],
      buttons:[ {
        text:'Cancel',
        role:'cancel',
        handler:()=>{
          this.lista.closeSlidingItems();
        }
      },{
        text: 'Edit',
        handler: ( data )=>{
          if( data.titulo.length === 0 ){
              return;
          }   
          let list = this.deseosServices.listas.find( list => list.id === id );
          list.titulo = data.titulo;
          console.log( list.titulo );
          console.log( list );
          this.deseosServices.saveLocalStorage();
          this.lista.closeSlidingItems();
        }
      }]
    });
    alert.present();
  }
}
