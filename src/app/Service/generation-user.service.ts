import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ScreenShotService } from './screen-shot.service';

@Injectable({
  providedIn: 'root'
})
export class GenerationUserService {

  constructor(private alertController:AlertController,private router:Router,private Screenshot:ScreenShotService) { }

  public CreateUser(){
    this.KeyUser()
  }
  private async KeyUser() {
    const alert = await this.alertController.create({
      header: 'Credenciales del usuario',
      message: 'USUARIO: asdadadada \n Contraseña: sdadasdads',
      buttons: [
        {
          text: 'Guardar Información',
          role: 'cancel',
          handler: () => {
            this.Screenshot.capture(alert)
          },
        },
        {
          text: 'Finalizar',
          role: 'confirm',
          handler: () => {
            this.router.navigate(['/homeNutritionist'])
          },
        },
      ]
    });

    await alert.present();
  }
}
