import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InterMenu, InterRecipes } from 'src/app/Interface/interfaces.service';
import { BdService } from 'src/app/Service/bd.service';
import { ElementsService } from 'src/app/Service/elements.service';
import { FirebaseService } from 'src/app/Service/firebase.service';

@Component({
  selector: 'app-edit-menu-day',
  templateUrl: './edit-menu-day.page.html',
  styleUrls: ['./edit-menu-day.page.scss'],
})
export class EditMenuDayPage implements OnInit {

  breakfast = "Escoger Receta"
  lunch = "Escoger Receta"
  meal = "Escoger Receta"
  snack = "Escoger Receta"
  dinner = "Escoger Receta"
  refreshment = "Escoger Receta"
  ModalOpen: boolean = false
  Opc: number = 0
  MealTime: any = [{ Id: "0" }, { Id: "0" }, { Id: "0" }, { Id: "0" }, { Id: "0" }, { Id: "0" }]
  Recipes!: InterRecipes[]
  Array: InterRecipes[] = []
  MenuMealTime!:InterMenu
  Menu: InterMenu = {
    IdMenu: 0,
    Breakfast: 0,
    Lunch: 0,
    Meal: 0,
    Snack: 0,
    Dinner: 0,
    Refreshment: 0
  }

  constructor(private Firebase: FirebaseService,
    private Information:BdService,
    private elementoHtml:ElementsService,
    private route:Router) { }

  ngOnInit() {
    this.GetRecipes()
    
  }

  public SaveInformation(){
    var x = "Escoger Receta"
    if (this.breakfast != x || this.lunch != x || this.meal != x || this.snack != x || this.dinner != x || this.refreshment != x){
      this.Menu = {
        IdMenu: this.MenuMealTime.IdMenu,
        Breakfast: this.MealTime[0].Id,
        Lunch: this.MealTime[1].Id,
        Meal: this.MealTime[2].Id,
        Snack: this.MealTime[3].Id,
        Dinner: this.MealTime[4].Id,
        Refreshment: this.MealTime[5].Id
      }
      console.log(this.Menu)
      this.Firebase.UpDateInformationMenuDay(this.Menu).finally(()=>{
        this.elementoHtml.UpdateClientToast()
        this.route.navigate(['/homeNutritionist'])
      })
    }else{
      this.AlertDelate()
    }
  }
  private async AlertDelate(){
    const alert = document.createElement('ion-alert');
    alert.header = 'No se ha seleccionado ninguna receta';
    alert.subHeader = '¿Deseas eliminar el elemento?';
    alert.buttons = [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Alert canceled');
        },
      },
      {
        text: 'OK',
        role: 'confirm',
        handler: () => {
          console.log('Alert confirmed');
        },
      },
    ];

    document.body.appendChild(alert);
    await alert.present();
  }

  public opcion(event: any, Id: string) {
    var MealTime = document.getElementById("" + Id)!
    if (event.detail.checked) {
      MealTime.style.display = "flex"
    } else {
      MealTime.style.display = "none"
      this.resertBtnMenu(Id)
    }
  }
  public resertBtnMenu(IdBtnMenus: string) {
    switch (IdBtnMenus) {
      case "Breakfast":
        this.MealTime[0].Id=0
        this.breakfast = "Escoger Receta"
        break;
      case "Lunch":
        this.MealTime[1].Id=0
        this.lunch = "Escoger Receta"
        break;
      case "Meal":
        this.MealTime[2].Id=0
        this.meal = "Escoger Receta"
        break;
      case "Snack":
        this.MealTime[3].Id=0
        this.snack = "Escoger Receta"
        break;
      case "Dinner":
        this.MealTime[4].Id=0
        this.dinner = "Escoger Receta"
        break;
      case "Refreshment":
        this.MealTime[5].Id=0
        this.refreshment = "Escoger Receta"
        break;
    }
  }
  private async GetRecipes() {
    var GetRecipe: any = await this.Firebase.GetRecipes()
    this.Recipes = GetRecipe
    for (let index = 0; index < 5; index++) {
      this.Array.push(this.Recipes[index])
    }
    this.pushMealTime()
  }
  
  //Modal Select recipe
  public SaveRecipes(item: InterRecipes) {
    this.MealTime[this.Opc - 1].Id = item.IdRecipes
    this.SetNameButton(item.Name)
    this.CloseModal()
  }
  private SetNameButton(name: string) {
    switch (this.Opc) {
      case 1:
        this.breakfast = name
        break;
      case 2:
        this.lunch = name
        break;
      case 3:
        this.meal = name
        break;
      case 4:
        this.snack = name
        break;
      case 5:
        this.dinner = name
        break;
      case 6:
        this.refreshment = name
        break;
    }
  }
  public CloseModal() {
    this.ModalOpen = false
  }
  public OpenModal(opc: number) {
    this.Opc = opc
    this.ModalOpen = true
  }
  //Push Information In Html
  private pushMealTime(){
    let temporal:any=this.Information.InformationMenu
    this.MenuMealTime=temporal
    let elementHtml:any
    console.log(this.MenuMealTime.Breakfast)
    if(this.MenuMealTime.Breakfast!=0){
      this.MealTime[0].Id=this.MenuMealTime.Breakfast
      elementHtml=document.getElementById("Breakfast")!
      elementHtml.style.display="flex"
      elementHtml=document.getElementById("check1")!
      elementHtml.checked=true
      this.breakfast=this.SearchRecipe(this.MenuMealTime.Breakfast)
    }
    console.log(this.MenuMealTime.Lunch)
    if(this.MenuMealTime.Lunch!=0){
      elementHtml=document.getElementById("Lunch")!
      elementHtml.style.display="flex"
      elementHtml=document.getElementById("check2")!
      elementHtml.checked=true
      this.MealTime[1].Id=this.MenuMealTime.Lunch
      this.lunch=this.SearchRecipe(this.MenuMealTime.Lunch)
    }
    if(this.MenuMealTime.Meal!=0){
      elementHtml=document.getElementById("Meal")!
      elementHtml.style.display="flex"
      elementHtml=document.getElementById("check3")!
      elementHtml.checked=true
      this.MealTime[2].Id=this.MenuMealTime.Meal
      this.meal=this.SearchRecipe(this.MenuMealTime.Meal)
    }
    if(this.MenuMealTime.Snack!=0){
      elementHtml=document.getElementById("Snack")!
      elementHtml.style.display="flex"
      elementHtml=document.getElementById("check4")!
      elementHtml.checked=true
      this.MealTime[3].Id=this.MenuMealTime.Snack
      this.snack=this.SearchRecipe(this.MenuMealTime.Snack)
    }
    if(this.MenuMealTime.Dinner!=0){
      elementHtml=document.getElementById("Dinner")!
      elementHtml.style.display="flex"
      elementHtml=document.getElementById("check5")!
      elementHtml.checked=true
      this.MealTime[4].Id=this.MenuMealTime.Dinner
      this.dinner=this.SearchRecipe(this.MenuMealTime.Dinner)
    }
    if(this.MenuMealTime.Refreshment!=0){
      elementHtml=document.getElementById("Refreshment")!
      elementHtml.style.display="flex"
      elementHtml=document.getElementById("check6")!
      elementHtml.checked=true
      this.MealTime[5].Id=this.MenuMealTime.Refreshment
      this.refreshment=this.SearchRecipe(this.MenuMealTime.Refreshment)
    }
  }
  private SearchRecipe(Id:any){
    let Name:string=""
    for(let element of this.Recipes){
      if(element.IdRecipes==Id){
        Name=element.Name
        break;
      }
    }
    return Name
  }

}
