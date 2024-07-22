import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirebaseService } from '../Service/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private alertController: AlertController,private router:Router,
    private Firebase:FirebaseService) {}
  
  ngOnInit(){
    document.getElementById("BtnLogin")?.addEventListener("click",()=>{
      var user=(document.getElementById("InputUser") as HTMLInputElement).value
      let password=(document.getElementById("InputPassword") as HTMLInputElement).value
      this.login(user,password)
    })
  }

  private async login(User:string,Password:string){
    this.Firebase.GetUser(User,Password)
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Pedir Información',
      message: '¿Deseas pedir información?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Alert canceled');
          },
        },
        {
          text: 'Chatear',
          role: 'confirm',
          handler: () => {
            try {
              var message:string="prueba mensaje enviado"
              var texto = encodeURIComponent(message);
              var url = `https://wa.me/524525203328?text=${texto}`;
              window.open(url, '_blank');
            } catch (error) {
              
            }
            
          },
        },
      ]
    });

    await alert.present();
  }
  

  


}
