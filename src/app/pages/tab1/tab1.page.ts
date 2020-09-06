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
  title: string= 'Pendientes';
  constructor(public deseosServices: DeseosService,
    private router: Router,
    private alertCtrl: AlertController) {}

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
              const listaId = this.deseosServices.setLista(data.titulo);

              
              this.router.navigateByUrl( `/tabs/tab1/agregar/${ listaId }`);
              console.log( this.deseosServices.listas );
          }
          
        }
      ]
      
    });
    alert.present();
  }
}