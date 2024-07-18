import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ScreenShotService } from './screen-shot.service';
import { InterClient, InterExtraInformationClient } from '../Interface/interfaces.service';
import { ElementsService } from './elements.service';

@Injectable({
  providedIn: 'root'
})
export class GenerationUserService {

  constructor(private alertController:AlertController
    ,private router:Router,
    private Screenshot:ScreenShotService,
    private Elemento:ElementsService) { }
  InformationClient?: InterClient
  ExtraInformationClient?: InterExtraInformationClient
  private User:string=""
  private Password:string=""
  private letters="ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz1234567890"

  public CreateUser(Name:string,LastName:string){
    this.GenerationUser(Name,LastName)
    this.GenerationPassword()
    this.KeyUser()
  }
  private async KeyUser() {
    const alert = await this.alertController.create({
      header: 'Credenciales del usuario',
      subHeader: 'USUARIO: '+this.User,
      message: 'Contraseña: '+this.Password,

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
            this.Elemento.AddClientToast()
            this.router.navigate(['/homeNutritionist']).finally(()=>{
              window.location.reload()
            })
          },
        },
      ]
    });

    await alert.present();
  }

  public GenerationId(){
    var date=new Date()
    var Id=""+date.getSeconds()+date.getMinutes()+date.getHours()+date.getDay()+date.getMonth()+date.getFullYear()
    return Id
  }

  private GenerationUser(Name:string,LastName:string){
    this.User=""
    this.User+=Name[0]+Name[1]+Name[2]+LastName[0]+LastName[1]+LastName[2]
  }
  private GenerationPassword(){
    let random:number=0
    this.Password=this.User
    for (let index = 0; index < 3; index++) {
      random=Math.floor(Math.random()*this.letters.length)
      this.Password+=this.letters[random]
    }

  }
}




