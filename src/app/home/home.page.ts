import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private alertController: AlertController,private router:Router) {}
  
  ngOnInit(){
    document.getElementById("BtnLogin")?.addEventListener("click",()=>{
      var user=(document.getElementById("InputUser") as HTMLInputElement).value
      if(user=="admin"){
        this.router.navigate(["/homeNutritionist"])
      }else{
        this.router.navigate(["/homeClient"])
      }
    })
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
