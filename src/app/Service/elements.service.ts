import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ElementsService {

  constructor(private toastController:ToastController,
    private alertController:AlertController) { }

  public async UpdateRecipeToast() {
    const toast = await this.toastController.create({
      message: 'Receta Actualizada',
      duration: 1500,
      position: "bottom",
    });
    await toast.present();
  }
  public async AddClientToast() {
    const toast = await this.toastController.create({
      message: 'Cliente Registrado',
      duration: 1500,
      position: "bottom",
    });
    await toast.present();
  }
  
  public async ErrorRecipeToast() {
    const toast = await this.toastController.create({
      message: 'Hubo un problema ',
      duration: 1500,
      position: "bottom",
    });
    await toast.present();
  }
  public async ErrorToast(Error:any) {
    const toast = await this.toastController.create({
      header:'Hubo un problema ',
      message: Error,
      duration: 1500,
      position: "bottom",
    });
    await toast.present();
  }
  public async UpdateClientToast() {
    const toast = await this.toastController.create({
      message: 'Informacion Actualizada',
      duration: 1500,
      position: "bottom",
    });
    await toast.present();
  }
  public async DelateToast() {
    const toast = await this.toastController.create({
      message: 'Elemento Eliminado',
      duration: 1500,
      position: "bottom",
    });
    await toast.present();
  }

  public async AlertNoneRecipe(){
    const alert = await this.alertController.create({
      message: 'No Se Encontraron Recetas Disponibles',
      htmlAttributes: {
        'aria-label': 'alert dialog',
      },
      buttons :[
        {
          text: 'OK',
          role: 'cancel',
          handler: () => {},
        }]
    });
    await alert.present();
  }

  public async ElementLoading(ElementFather:string){
    let BackgroundLoad=document.createElement("div")
    BackgroundLoad.style.background="rgb(127,127,127,50%)";
    BackgroundLoad.style.width="100%"
    BackgroundLoad.style.height="100%"
    BackgroundLoad.style.position="fixed"
    BackgroundLoad.style.display="flex"
    BackgroundLoad.style.justifyContent="center"
    BackgroundLoad.style.alignItems="center"
    BackgroundLoad.id="ElementLoad"

    let ImgLoad=document.createElement('img');
    ImgLoad.src="./../../assets/icon/IconLoad2.gif";
    ImgLoad.style.width="200px";
    ImgLoad.style.height="200px";

    BackgroundLoad.appendChild(ImgLoad)
    let Father=document.getElementById(ElementFather)
    Father?.appendChild(BackgroundLoad)

  }
  public async RemoveLoad(){
    let elementLoad=document.getElementById('ElementLoad')
    elementLoad?.remove()
  }
  
}
