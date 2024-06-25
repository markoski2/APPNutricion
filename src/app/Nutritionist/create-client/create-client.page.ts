import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { GenerationUserService } from 'src/app/Service/generation-user.service';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.page.html',
  styleUrls: ['./create-client.page.scss'],
})
export class CreateClientPage implements OnInit {

  constructor(private alertController:AlertController,private router:Router,private User:GenerationUserService) { }

  ngOnInit() {
    document.getElementById("BtnPage1")?.addEventListener("click",()=>{
      console.log("sadsd")
      var ContentPages=document.getElementById("ContentPage")
      ContentPages!.style.transform="translateX(-50%)"
      ContentPages!.style.transition="all 1s ease"
    });
    document.getElementById("BtnPage2")?.addEventListener("click",()=>{
      let ContentPages=document.getElementById("ContentPage")
      ContentPages!.style.transform="translateX(-0%)"
      ContentPages!.style.transition="all 1s ease"
    });
    document.getElementById("BtnPageSave")?.addEventListener("click",()=>{
      
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Horario de comida',
      message: '¿Deseas agregar un horario de comida?',
      buttons: [
        {
          text: 'Omitir',
          role: 'cancel',
          handler: () => {
            this.User.CreateUser()
          },
        },
        {
          text: 'Crear',
          role: 'confirm',
          handler: () => {
            this.router.navigate(["/mealTime"])
          },
        },
      ]
    });

    await alert.present();
  }

  

}
