import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonModal } from '@ionic/angular';
import { InterClient, InterExtraInformationClient, InterMenu, InterRecipes } from 'src/app/Interface/interfaces.service';
import { BdService } from 'src/app/Service/bd.service';
import { ElementsService } from 'src/app/Service/elements.service';
import { FirebaseService } from 'src/app/Service/firebase.service';
import { GenerationUserService } from 'src/app/Service/generation-user.service';

@Component({
  selector: 'app-meal-time',
  templateUrl: './meal-time.page.html',
  styleUrls: ['./meal-time.page.scss'],
})
export class MealTimePage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  ModalOpen: boolean = false
  ModalOpenMealTime: boolean = false
  breakfast = "Escoger Receta"
  lunch = "Escoger Receta"
  meal = "Escoger Receta"
  snack = "Escoger Receta"
  dinner = "Escoger Receta"
  refreshment = "Escoger Receta"

  InformationClient?: InterClient
  ExtraInformationClient?: InterExtraInformationClient
  FlagNewMenu:boolean=false

  Day!: number
  Recipes!: InterRecipes[]
  Array: InterRecipes[] = []
  IdMenu: number = 0
  MealTime: any = [{ Id: "0" }, { Id: "0" }, { Id: "0" }, { Id: "0" }, { Id: "0" }, { Id: "0" }]
  Menu: InterMenu = {
    IdMenu: 0,
    Breakfast: 0,
    Lunch: 0,
    Meal: 0,
    Snack: 0,
    Dinner: 0,
    Refreshment: 0
  }
  MenusDays = {
    MONDAY: 0,
    TUESDAY: 0,
    WEDNESDAY: 0,
    THURSDAY: 0,
    FRIDAY: 0,
    SATURDAY: 0,
    SUNDAY: 0
  }
  Opc: number = 0
  name!: string;
  RecipesShow:number=0
  CopyRecipes:InterRecipes[]=[]

  constructor(private User: GenerationUserService,
    private alertController: AlertController,
    private Firebase: FirebaseService,
    private information:BdService,
    private Elemento:ElementsService,
    private router:Router) { }

  ngOnInit() {
    this.GetRecipes()
    this.CheckNewDayMenu()
  }

  public async BtnSave() {
    await this.AddMenuDayToInformationClient()
    if(this.FlagNewMenu){
      await this.Firebase.ModificateMenuClient(this.InformationClient!,this.InformationClient!.IdClient).finally(()=>{
        this.Elemento.UpdateClientToast()
        this.router.navigate(['/homeNutritionist']).finally(() => { window.location.reload() })
      })
    }else{
      await this.Firebase.AddDate(this.InformationClient!)
      await this.Firebase.AddExtraInformation(this.ExtraInformationClient!).finally(() => {
        this.User.CreateUser(this.InformationClient!.Name, this.InformationClient!.LastName)
      })
    }
  }

  private AddMenuDayToInformationClient() {
    this.InformationClient!.Menus.Monday = this.MenusDays.MONDAY
    this.InformationClient!.Menus.Tuesday = this.MenusDays.TUESDAY
    this.InformationClient!.Menus.Wednesday = this.MenusDays.WEDNESDAY
    this.InformationClient!.Menus.Thursday = this.MenusDays.THURSDAY
    this.InformationClient!.Menus.Friday = this.MenusDays.FRIDAY
    this.InformationClient!.Menus.Saturday = this.MenusDays.SATURDAY
    this.InformationClient!.Menus.Sunday = this.MenusDays.SUNDAY
  }

  //Mopdal save menu day
  cancel() {
    this.ModalOpenMealTime = false
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    var x = "Escoger Receta"
    if (this.breakfast != x || this.lunch != x || this.meal != x || this.snack != x || this.dinner != x || this.refreshment != x) {
      this.saveMenu()//guardar menu
      this.SaveMenuDay()
      this.ModalOpenMealTime = false
      this.modal.dismiss(this.name, 'confirm');
      this.ClearVariables()
    } else {
      this.Alert()
    }
  }
  private async saveMenu() {
    this.IdMenu = parseInt("77" + this.User.GenerationId())
    this.Menu = {
      IdMenu: this.IdMenu,
      Breakfast: this.MealTime[0].Id,
      Lunch: this.MealTime[1].Id,
      Meal: this.MealTime[2].Id,
      Snack: this.MealTime[3].Id,
      Dinner: this.MealTime[4].Id,
      Refreshment: this.MealTime[5].Id
    }
    await this.Firebase.AddMenu(this.Menu)
  }

  private SaveMenuDay() {
    switch (this.Day) {
      case 0:
        this.ChangeColorBtnDay("Recipes1", true)
        this.MenusDays.MONDAY = this.Menu.IdMenu
        break;
      case 1:
        this.ChangeColorBtnDay("Recipes2", true)
        this.MenusDays.TUESDAY = this.Menu.IdMenu
        break;
      case 2:
        this.ChangeColorBtnDay("Recipes3", true)
        this.MenusDays.WEDNESDAY = this.Menu.IdMenu
        break;
      case 3:
        this.ChangeColorBtnDay("Recipes4", true)
        this.MenusDays.THURSDAY = this.Menu.IdMenu
        break;
      case 4:
        this.ChangeColorBtnDay("Recipes5", true)
        this.MenusDays.FRIDAY = this.Menu.IdMenu
        break;
      case 5:
        this.ChangeColorBtnDay("Recipes6", true)
        this.MenusDays.SATURDAY = this.Menu.IdMenu
        break;
      case 6:
        this.ChangeColorBtnDay("Recipes7", true)
        this.MenusDays.SUNDAY = this.Menu.IdMenu
        break;
    }
  }

  private ClearVariables() {
    this.Menu = {
      IdMenu: 0,
      Breakfast: 0,
      Lunch: 0,
      Meal: 0,
      Snack: 0,
      Dinner: 0,
      Refreshment: 0
    }
    this.breakfast = "Escoger Receta"
    this.lunch = "Escoger Receta"
    this.meal = "Escoger Receta"
    this.snack = "Escoger Receta"
    this.dinner = "Escoger Receta"
    this.refreshment = "Escoger Receta"
    this.MealTime = [{ Id: "0" }, { Id: "0" }, { Id: "0" }, { Id: "0" }, { Id: "0" }, { Id: "0" }]
    this.Opc = 0
  }

  private async Alert() {//No recipe selected
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Ingrese por lo menos una receta',
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
  //
  //GetInformation
  private GetInformationClient() {
    this.InformationClient = this.User.InformationClient
    this.ExtraInformationClient = this.User.ExtraInformationClient
  }

  private async GetRecipes() {
    var GetRecipe: any = await this.Firebase.GetRecipes()
    this.Recipes = GetRecipe
    this.CopyRecipes=GetRecipe
    for (let index = 0; index < 5; index++) {
      this.Array.push(this.Recipes[index])
    }
  }
  //

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
  //Days of the week
  public EnableBtnChooseRecipes(event: any, Id: string) {
    var RecipesChoose = document.getElementById("" + Id)!
    if (event.detail.checked) {
      RecipesChoose.style.display = "flex"
    } else {
      RecipesChoose.style.display = "none"
      this.ChangeColorBtnDay(Id, false)
    }
  }
  private ChangeColorBtnDay(IdBtn: string, flag: boolean) {
    var btn = document.getElementById(IdBtn)
    if (flag) {
      btn!.style.setProperty('--background', '#20D600')
    } else {
      btn!.style.setProperty('--background', '#5f98ff')
      this.resertValueMenuDays(IdBtn)
    }
  }
  private resertValueMenuDays(IdBtn: string) {
    switch (IdBtn) {
      case "Recipes1":
        this.MenusDays.MONDAY = 0
        break;
      case "Recipes2":
        this.MenusDays.TUESDAY = 0
        break;
      case "Recipes3":
        this.MenusDays.WEDNESDAY = 0
        break;
      case "Recipes4":
        this.MenusDays.THURSDAY = 0
        break;
      case "Recipes5":
        this.MenusDays.FRIDAY = 0
        break;
      case "Recipes6":
        this.MenusDays.SATURDAY = 0
        break;
      case "Recipes7":
        this.MenusDays.SUNDAY = 0
        break;
    }
  }
  //
  public OpenModal(opc: number) {
    this.Opc = opc
    this.ModalOpen = true
  }

  public OpenModalChooseRecipes(Opc: number) {
    this.ModalOpenMealTime = true
    this.Day = Opc
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
  public BtnModalNext(){
    this.RecipesShow+=6
    document.getElementById("BtnModalBack")!.style.display="block"
    this.PushArrayRecipe()
    this.CreateItemSearchRecipes(this.Array)
    if((this.RecipesShow+6)>this.Array.length){
      document.getElementById("BtnModalNext")!.style.display="none"
    }
  }
  public BtnModalBack(){
    this.RecipesShow-=6
      document.getElementById("BtnModalNext")!.style.display="block"
      this.PushArrayRecipe()
      this.CreateItemSearchRecipes(this.Array)
      if((this.RecipesShow-6)<0){
        document.getElementById("BtnModalBack")!.style.display="none"
      }
  }
  private PushArrayRecipe(){
    this.Array=[]
    for (let index = this.RecipesShow; index < this.CopyRecipes.length; index++) {
      if(index<(this.RecipesShow+6)){
        this.Array.push(this.CopyRecipes[index])
      }else{
        index=10000
      }
    }
    let BtnNext=document.getElementById("BtnModalNext")//see btn next
    if(this.CopyRecipes.length<6){
      BtnNext!.style.display="none"
    }
  }
  private CreateItemSearchRecipes(ArraySearch:InterRecipes[]){
    let Content=document.getElementById("ContentRecipes")
    Content!.innerHTML=""
    ArraySearch.forEach(element => {
      let item=document.createElement("ion-item")
      let label=document.createElement("ion-label")
      label.addEventListener("click",()=>{
        this.SaveRecipes(element)
      })
      let h2=document.createElement("h2")
      h2.textContent=element.Name
      label.appendChild(h2)
      item.appendChild(label)
      Content?.appendChild(item)
    });
    

  }
  //Add new day to menu
  private async CheckNewDayMenu(){
    this.FlagNewMenu=await this.information.FlagMenu
    if(this.FlagNewMenu){
      this.InformationClient = this.information.InformationClient
      this.PutCheckOptionesDay()
    }else{
      this.GetInformationClient()
    }
  }
  private PutCheckOptionesDay(){
    let CheckDay:any
    if(this.InformationClient?.Menus.Monday!=0){
      CheckDay=document.getElementById("CheckLunes")
      CheckDay.checked=true
      CheckDay.disabled=true
      this.MenusDays.MONDAY=this.InformationClient!.Menus.Monday
    }
    if(this.InformationClient?.Menus.Tuesday!=0){
      CheckDay=document.getElementById("CheckMartes")
      CheckDay.checked=true
      CheckDay.disabled=true
      this.MenusDays.TUESDAY=this.InformationClient!.Menus.Tuesday
    }
    if(this.InformationClient?.Menus.Wednesday!=0){
      CheckDay=document.getElementById("CheckMiercoles")
      CheckDay.checked=true
      CheckDay.disabled=true
      this.MenusDays.WEDNESDAY=this.InformationClient!.Menus.Wednesday
    }
    if(this.InformationClient?.Menus.Thursday!=0){
      CheckDay=document.getElementById("CheckJueves")
      CheckDay.checked=true
      CheckDay.disabled=true
      this.MenusDays.THURSDAY=this.InformationClient!.Menus.Thursday
    }
    if(this.InformationClient?.Menus.Friday!=0){
      CheckDay=document.getElementById("CheckViernes")
      CheckDay.checked=true
      CheckDay.disabled=true
      this.MenusDays.FRIDAY=this.InformationClient!.Menus.Friday
    }
    if(this.InformationClient?.Menus.Saturday!=0){
      CheckDay=document.getElementById("CheckSabado")
      CheckDay.checked=true
      CheckDay.disabled=true
      this.MenusDays.SATURDAY=this.InformationClient!.Menus.Saturday
    }
    if(this.InformationClient?.Menus.Sunday!=0){
      CheckDay=document.getElementById("CheckDomingo")
      CheckDay.checked=true
      CheckDay.disabled=true
      this.MenusDays.SUNDAY=this.InformationClient!.Menus.Sunday
    }
  }
}
