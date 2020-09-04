import { Component } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  lists: any[] = [];
  constructor(public deseosServices: DeseosService,
    private router: Router,
    private alertCtrl: AlertController) {

    this.lists = deseosServices.listas;
    console.log(this.lists);
  }

  async agregarLista() {

    const alert = await this.alertCtrl.create({
      header: 'Nueva lista!',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Ingresa el nombre de la Lista!'
        }],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Crear',
          handler: (data) => {

            
            if (data.titulo.length === 0) {
              return;
            }
              this.deseosServices.setLista(data.titulo);

              console.log( this.deseosServices.listas );
          }
          
        }
      ]
      // this.router.navigateByUrl( '/tabs/tab1/agregar' );
    });
    alert.present();
  }
}