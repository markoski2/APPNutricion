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
  
}
