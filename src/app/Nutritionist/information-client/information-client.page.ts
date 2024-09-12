import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Chart } from 'chart.js/auto';
import { InterClient, InterExtraInformationClient } from 'src/app/Interface/interfaces.service';
import { BdService } from 'src/app/Service/bd.service';
import { ElementsService } from 'src/app/Service/elements.service';
import { FirebaseService } from 'src/app/Service/firebase.service';
import { PreferenceService } from 'src/app/Service/preference.service';


@Component({
  selector: 'app-information-client',
  templateUrl: './information-client.page.html',
  styleUrls: ['./information-client.page.scss'],
})
export class InformationClientPage implements OnInit {
  ctx: any = document.getElementById('myChart');
  char!: Chart
  //User
  User!:InterClient
  ExtraInformation:InterExtraInformationClient={
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
  Weights:{
    StarWeight:80,
    Weight3:80,
    Weight2:80,
    Weight1:80,
    LastWeight:80,
    DateStar:"0/00/0000",
    Date3:"0/00/0000",
    Date2:"0/00/0000",
    Date1:"0/00/0000",
    DateLast:"0/00/0000",
  }
  }
  constructor(private router:Router,
    private bd:BdService,
    private Firebase:FirebaseService,
    private alertController:AlertController,
    private Bar:ElementsService,
    private Preference:PreferenceService,
    private Elements:ElementsService) { }

  ngOnInit() {
    this.GetInformation()
  }
  //Graph
  @ViewChild('someInput2') someInput!: ElementRef;
  graph() {
    let min=this.ExtraInformation.Weights.LastWeight-30
    this.char=new Chart(this.someInput.nativeElement, {
      type: 'line',
      data: {
        labels: [this.ExtraInformation.Weights.DateStar,
           this.ExtraInformation.Weights.Date3,
           this.ExtraInformation.Weights.Date2, 
           this.ExtraInformation.Weights.Date1,
           this.ExtraInformation.Weights.DateLast],
        datasets: [
          {
            label: 'Pesos',
            data: [this.ExtraInformation.Weights.StarWeight,
              this.ExtraInformation.Weights.Weight3,
              this.ExtraInformation.Weights.Weight2,
              this.ExtraInformation.Weights.Weight1,
              this.ExtraInformation.Weights.LastWeight],
            borderWidth: 1,
            borderColor: '#00E4FF',
            backgroundColor:'#00E4FF'
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: false,
            min:min,
            grid: {
              color: 'rgba(165, 165, 165)', // Color de las líneas de fondo en el eje X
          },
          ticks: {
              color: '#5361cf', // Color del texto en el eje X
          }
          },
          x:{
            grid: {
              color: 'rgba(165, 165, 165)', // Color de las líneas de fondo en el eje Y
          },
          ticks: {
              color: '#5361cf', // Color del texto en el eje Y
          }
          }
        },
      },
    });
  } //end ngAfterViewInit
  //Information
  private async GetInformation(){
    var cosa:any=this.bd.InformationClient
    this.User=cosa
    await this.Firebase.GetExtraInformationClient(cosa.IdClientInformation).subscribe(res=>{
      if(res){
        this.ExtraInformation=res
        this.graph()
      }
    })

    
  }
  //Menu
  public async ShowMenu(){
    const actionSheet = document.createElement('ion-action-sheet');
    actionSheet.header = 'Opciones';
    actionSheet.buttons = [
      {
        text: 'Eliminar',
        role: 'destructive',
        handler:()=>{
          this.searchMenuforDelate()
        },
      },
      {
        text: 'Editar Informacion Personal',
        handler:()=>{
          this.EditInformationPersonal()
        },
      },
      {
        text: 'Editar Informacion Extra',
        handler:()=>{
          this.EditExtraInformation()
        },
      },
      {
        text: 'Cancel',
        role: 'cancel',
        data: {
          action: 'cancel',
        },
      },
    ];

    document.body.appendChild(actionSheet);
    await actionSheet.present();
  }
  //Delate all information
  private async searchMenuforDelate(){
    this.Elements.ElementLoading('TagHeader')
    let ArrayDelateMenus:number[]=[]
    if(this.User.Menus.Friday!=0){
      ArrayDelateMenus.push(this.User.Menus.Friday)
    }
    if(this.User.Menus.Monday!=0){
      ArrayDelateMenus.push(this.User.Menus.Monday)
    }
    if(this.User.Menus.Saturday!=0){
      ArrayDelateMenus.push(this.User.Menus.Saturday)
    }
    if(this.User.Menus.Sunday!=0){
      ArrayDelateMenus.push(this.User.Menus.Sunday)
    }
    if(this.User.Menus.Thursday!=0){
      ArrayDelateMenus.push(this.User.Menus.Thursday)
    }
    if(this.User.Menus.Tuesday!=0){
      ArrayDelateMenus.push(this.User.Menus.Tuesday)
    }
    if(this.User.Menus.Wednesday!=0){
      ArrayDelateMenus.push(this.User.Menus.Wednesday)
    }
    await this.Firebase.DelateClientMENUS(ArrayDelateMenus).subscribe(async(res)=>{
      if(res.Flag){
        console.log("Se elimino menus")
        await this.Firebase.DelateClientInformation(this.User.IdClient).subscribe(async(res)=>{
          if(res.Flag){
            console.log("Se elimino cliente")
            await this.Firebase.DelateClientExtraInforamtion(this.User.IdClientInformation).subscribe(async(res)=>{
              if(res.Flag){
                console.log("Se elimino extra")
                this.Elements.RemoveLoad()
                this.router.navigate(['/homeNutritionist']).finally(() => { window.location.reload() })
              }else{
                console.log("Error al borrar")
              }
            })
          }else{
            console.log("Error al borrar")
          }
        })
        
      }else{
        console.log("Error al borrar")
      }
      
    })
    let ArrayPreference:InterClient[]= await this.Preference.Get()
      let NewArrayPreference:InterClient[]=[]
      for(let element of ArrayPreference){
        if(element.IdClient!=this.User.IdClient){
          NewArrayPreference.push(element)
        }
      }
      await this.Preference.SaveRecents(NewArrayPreference)

  }
//Edit Inforamtion Perosnal
  private async EditInformationPersonal(){
    const alert = await this.alertController.create({
      inputs:[
        {
          value:"Nombres",
          disabled:true
        },
        {
          label:'Nombres:',
          placeholder: 'Nombres',
          name:"Name",
          value:this.User.Name
        },{
          value:"Apellidos",
          disabled:true
        },
        {
          label:'Apellidos:',
          placeholder: 'Apellidos',
          name:"LastName",
          value:this.User.LastName
        },{
          value:"Celular",
          disabled:true
        },
        {
          label:'Celular:',
          type: 'number',
          placeholder: 'Celular',
          name:"Phone",
          value:this.User.Phone,
          min: 10,
          max: 10,
        }],
      buttons: [
        {
          text:"Guardar",
          handler:(date)=>{
            this.Elements.ElementLoading('TagHeader')
          this.ChangeDateInformationPersonal(date.Name,date.LastName,date.Phone)
          }
        }],
    });
    await alert.present();
  } 

  private async ChangeDateInformationPersonal(Name:string,LastName:string,Phone:number){
    let NewInforamtion={Id:this.User.IdClient,Name:Name,LastName:LastName,Phone:Phone}
    await this.Firebase.UpDateInformationClient(NewInforamtion).subscribe(async(res)=>{
      if(res.Flag){
        await this.modificatePreference(Name,Phone,this.User.IdClient)
        this.Bar.UpdateClientToast()
        this.Elements.RemoveLoad()
        this.router.navigate(['/homeNutritionist']).finally(()=>{
          window.location.reload()
        })
      }
      
    })
    
  }
  private async modificatePreference(Name:string,Phone:number,id:number){
    let array= await this.Preference.Get()
    let NewElement:InterClient[]=[]
    for(let element of array){
      if(element.IdClient==id){
        element.Name=Name
        element.Phone=Phone.toString()
      }
      NewElement.push(element)
    }
    this.Preference.SaveRecents(NewElement)
  }
  //Edith Information Extra
  private async EditExtraInformation(){
    const alert = await this.alertController.create({
      inputs:[
        {
          value:"Objetivo",
          disabled:true
        },{
          placeholder: 'Objetivo',
          label:'Objetivo:',
          name:"TargetWeight",
          type: 'number',
          value:this.ExtraInformation.TargetWeight
        },{
          value:"Peso",
          disabled:true
        },
        {
          placeholder: 'Peso',
          label:'Peso Actual:',
          name:"ActualWeight",
          type: 'number',
          value:this.ExtraInformation.ActualWeight
        },{
          value:"Altura",
          disabled:true
        },
        {
          placeholder: 'Altura: ',
          label:'Altura:',
          name:"Height",
          type: 'number',
          value:this.ExtraInformation.Height
        },{
          value:"Cintura",
          disabled:true
        },
        {
          placeholder: 'Cintura',
          label:'Cintura:',
          name:"Waist",
          type: 'number',
          value:this.ExtraInformation.Waist
        },{
          value:"Cadera",
          disabled:true
        },
        {
          placeholder: 'Cadera',
          label:'Cadera:',
          name:"Hip",
          type: 'number',
          value:this.ExtraInformation.Hip
        },{
          value:"Brazo",
          disabled:true
        },
        {
          placeholder: 'Brazo',
          label:'Brazo: ',
          name:"Arms",
          type: 'number',
          value:this.ExtraInformation.Arms
        },{
          value:"Muslo",
          disabled:true
        },
        {
          placeholder: 'Muslo',
          label:'Muslo: ',
          name:"Thigh",
          type: 'number',
          value:this.ExtraInformation.Thigh
        },{
          value:"Pecho",
          disabled:true
        },
        {
          placeholder: 'Pecho',
          label:'Pecho: ',
          name:"Chest",
          type: 'number',
          value:this.ExtraInformation.Chest
        }],
      buttons: [
        {
          text:"Guardar",
          handler:(date)=>{
            this.Elements.ElementLoading('TagHeader')
            let Time=new Date()
            let DateNow=Time.getDate()+"/"+(Time.getMonth()+1)+"/"+Time.getFullYear()
            let NewInfomation={
              Id:this.ExtraInformation.IdClientInformation,
              TargetWeight: date.TargetWeight,
              ActualWeight: date.ActualWeight,
              Height: date.Height,
              Waist: date.Waist,
              Hip: date.Hip,
              Arms: date.Arms,
              Chest: date.Chest,
              Thigh: date.Thigh,
              Weights:{
                StarWeight:this.ExtraInformation.Weights.StarWeight,
                Weight3:this.ExtraInformation.Weights.Weight2,
                Weight2:this.ExtraInformation.Weights.Weight1,
                Weight1:this.ExtraInformation.Weights.LastWeight,
                LastWeight:date.ActualWeight,
                DateStar:this.ExtraInformation.Weights.DateStar,
                Date3:this.ExtraInformation.Weights.Date2,
                Date2:this.ExtraInformation.Weights.Date1,
                Date1:this.ExtraInformation.Weights.DateLast,
                DateLast:DateNow
              }
            }
          this.ChangeDateExtraInformation(NewInfomation)
          }
        }],
    });
    await alert.present();
  } 
  private async ChangeDateExtraInformation(NewInfomation:any){
    await this.Firebase.UpDateExtraInformation(NewInfomation).subscribe((res)=>{
      if(res.Flag){
        this.Elements.RemoveLoad()
        this.Bar.UpdateClientToast()
        this.router.navigate(['/homeNutritionist']).finally(()=>{
          window.location.reload()
        })
      }
    })
  }
  //
  public GoMenu(){
    this.bd.InformationClient=this.User
    this.bd.FlagMenu=true
    this.router.navigate(['/menuDays'])
  }

}
