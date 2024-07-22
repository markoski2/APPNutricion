import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonInput } from '@ionic/angular';
import { InterClient, InterExtraInformationClient } from 'src/app/Interface/interfaces.service';
import { ElementsService } from 'src/app/Service/elements.service';
import { FirebaseService } from 'src/app/Service/firebase.service';
import { GenerationUserService} from 'src/app/Service/generation-user.service';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.page.html',
  styleUrls: ['./create-client.page.scss'],
})
export class CreateClientPage implements OnInit {

  constructor(private alertController: AlertController,
    private router: Router,
    private User: GenerationUserService,
    private Firebase:FirebaseService ) { }
    inputModel = '';

    @ViewChild('InputCellPhone', { static: true }) ionInputEl!: IonInput;
    onInput(ev:any) {
      const value = ev.target!.value;
      const filteredValue = value.replace(/[^0-9]+/g, '');
      this.ionInputEl.value = this.inputModel = filteredValue;
    }


  InformationClient?: InterClient = {
    IdClient: 0,
    IdUser: 0,
    IdClientInformation: 0,
    Name: "",
    LastName: "",
    Phone: "",
    NextDate: "",
    NextHours: "",
    Menus: {
      Monday: 0,
      Tuesday: 0,
      Wednesday: 0,
      Thursday: 0,
      Friday: 0,
      Saturday: 0,
      Sunday: 0,
    }
  }

  ExtraInformationClient: InterExtraInformationClient = {
    IdClientInformation: 0,
    IdClient: 0,
    TargetWeight: 0,
    ActualWeight: 0,
    Height: 0,
    Waist: 0,
    Hip: 0,
    Arms: 0,
    Chest: 0,
    Thigh: 0,
    Weights: {
      StarWeight: 0,
      Weight3: 0,
      Weight2: 0,
      Weight1: 0,
      LastWeight: 0
    }
  }
  Id: string = ""
  ngOnInit() {
    document.getElementById("BtnPage1")?.addEventListener("click", () => {
      var ContentPages = document.getElementById("ContentPage")
      ContentPages!.style.transform = "translateX(-50%)"
      ContentPages!.style.transition = "all 1s ease"
    });
    document.getElementById("BtnPage2")?.addEventListener("click", () => {
      let ContentPages = document.getElementById("ContentPage")
      ContentPages!.style.transform = "translateX(-0%)"
      ContentPages!.style.transition = "all 1s ease"
    });
  }
  public SaveInformationClient(){
    this.GetInformationInputs()
    if(this.InformationClient?.Name&&this.InformationClient.LastName&&this.InformationClient.Phone){
      this.presentAlert()
    }else{
      this.MissingDates()
    }
  }
  private async MissingDates() {//Missing dates
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Faltan datos por rellenar',
      buttons: [
        {
          text: 'Ok',
          role: 'confirm',
          handler: () => {
          },
        },
      ]
    });

    await alert.present();
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
            this.Firebase.AddDate(this.InformationClient!).finally(()=>{
              this.Firebase.AddExtraInformation(this.ExtraInformationClient!)
              this.User.CreateUser(this.InformationClient!.Name,this.InformationClient!.LastName,this.InformationClient!.IdClient)
            })
            //this.User.CreateUser(this.InformationClient!.Name,this.InformationClient!.LastName)
          },
        },
        {
          text: 'Crear',
          role: 'confirm',
          handler: () => {
            this.User.InformationClient=this.InformationClient
            this.User.ExtraInformationClient=this.ExtraInformationClient
            this.router.navigate(["/mealTime"])
            /*this.Firebase.AddExtraInformation(this.ExtraInformationClient!).finally(()=>
              this.router.navigate(["/mealTime"])
            )*/
            
          },
        },
      ]
    });

    await alert.present();
  }

  public GetInformationInputs() {
    this.Id = this.User.GenerationId()
    this.GetInputsPage1()
    this.GetInputsPage2()
  }

  private GetInputsPage1() {
    this.InformationClient!.IdClient = parseInt("69" + this.Id)
    this.InformationClient!.IdClientInformation = parseInt("67" + this.Id)
    this.InformationClient!.IdUser = parseInt("85" + this.Id)
    this.InformationClient!.Name = (document.getElementById("InputName") as HTMLInputElement).value
    this.InformationClient!.LastName = (document.getElementById("InputLastName") as HTMLInputElement).value
    this.InformationClient!.Phone = (document.getElementById("InputCellPhone") as HTMLInputElement).value
    this.InformationClient!.NextDate = "00/00/0000"
    this.InformationClient!.NextHours = "00/00/0000"

    this.InformationClient!.Menus.Monday = 0
    this.InformationClient!.Menus.Friday = 0
    this.InformationClient!.Menus.Saturday = 0
    this.InformationClient!.Menus.Sunday = 0
    this.InformationClient!.Menus.Thursday = 0
    this.InformationClient!.Menus.Tuesday = 0
    this.InformationClient!.Menus.Wednesday = 0
  }
  private GetInputsPage2() {
    this.ExtraInformationClient!.IdClientInformation = parseInt("67" + this.Id)
    this.ExtraInformationClient!.IdClient = parseInt("69" + this.Id)
    this.ExtraInformationClient!.TargetWeight = parseFloat((document.getElementById("Object") as HTMLInputElement).value)
    this.ExtraInformationClient!.ActualWeight = parseFloat((document.getElementById("ActualWeight") as HTMLInputElement).value)
    this.ExtraInformationClient!.Height = parseFloat((document.getElementById("Height") as HTMLInputElement).value)
    this.ExtraInformationClient!.Waist = parseFloat((document.getElementById("Waist") as HTMLInputElement).value)
    this.ExtraInformationClient!.Hip = parseFloat((document.getElementById("Hip") as HTMLInputElement).value)
    this.ExtraInformationClient!.Arms = parseFloat((document.getElementById("Arms") as HTMLInputElement).value)
    this.ExtraInformationClient!.Chest = parseFloat((document.getElementById("Breasts") as HTMLInputElement).value)
    this.ExtraInformationClient!.Thigh = parseFloat((document.getElementById("Thighs") as HTMLInputElement).value)
    this.ExtraInformationClient!.Weights.StarWeight = parseFloat((document.getElementById("ActualWeight") as HTMLInputElement).value)
    this.ExtraInformationClient!.Weights.Weight3 = parseFloat((document.getElementById("ActualWeight") as HTMLInputElement).value)
    this.ExtraInformationClient!.Weights.Weight2 = parseFloat((document.getElementById("ActualWeight") as HTMLInputElement).value)
    this.ExtraInformationClient!.Weights.Weight1 = parseFloat((document.getElementById("ActualWeight") as HTMLInputElement).value)
    this.ExtraInformationClient!.Weights.LastWeight = parseFloat((document.getElementById("ActualWeight") as HTMLInputElement).value)
  }



}
