import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InterClient, InterExtraInformationClient, InterMenu, InterRecipes } from 'src/app/Interface/interfaces.service';
import { BdService } from 'src/app/Service/bd.service';
import { FirebaseService } from 'src/app/Service/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  FlagMenu: boolean = false
  Days: string = ""
  Recipes!: InterRecipes[]
  private Recipe!: InterRecipes
  public User!: InterClient
  ExtraUser!:InterExtraInformationClient
  public MenuDay:InterMenu={
    IdMenu:0,
  Breakfast:0,
  Lunch:0,
  Meal:0,
  Snack:0,
  Dinner:0,
  Refreshment:0
  }
  flagShowMenu:boolean=false
  constructor(private route: Router,
    private Firebase: FirebaseService,
    private bd: BdService
  ) { }

  ngOnInit() {
    this.GetInformationClient()
    this.GetRecipes()
    document.getElementById("BtnMenu")?.addEventListener("click", () => {
      let modal = document.getElementById("modal")!
      if (!this.FlagMenu) {
        this.FlagMenu = true
        modal.style.transform = "translateX(0%)"
      } else {
        this.FlagMenu = false
        modal.style.transform = "translateX(200%)"
      }
    })
    document.getElementById("BtnClose")?.addEventListener("click", () => {
      let modal = document.getElementById("modal")!
      this.FlagMenu = false
      modal.style.transform = "translateX(200%)"
    })

    document.getElementById("Information")?.addEventListener("click", () => {
      this.bd.ExtraInformationClient=this.ExtraUser
      this.route.navigate(['information'])
    })
    document.getElementById("MenuDays")?.addEventListener("click", () => {
      this.bd.InformationClient=this.User
      this.route.navigate(['menuDays'])
    })
  }

  public InformationRecipes() {
    this.bd.InformationRecipes=this.Recipe
    this.route.navigate(['/informationRecipes'])
  }
  public SetNameCard(IdRecipe: number, NameImg: string) {

    this.SearchRecipe(IdRecipe)
    this.ChangeImg("" + this.MenuDay.IdMenu, NameImg)
    let Name = document.getElementById("" + this.MenuDay.IdMenu)
    Name!.innerText = this.Recipe.Name
  }

  private SearchRecipe(IdRecipe: number) {
    for (let Element of this.Recipes) {
      if (Element.IdRecipes == IdRecipe) {
        this.Recipe = Element
      }
    }
  }
  private ChangeImg(id: string, NameImg: string) {
    var img = document.getElementById("I" + id)!
    let newImg = new Image()
    newImg.src = "./../../../assets/Img/" + NameImg + ".png"
    newImg.onload = () => {
      img.setAttribute("src", "./../../../assets/Img/" + NameImg + ".png")
    }
  }
  //Recipes
  private async GetRecipes() {
    var CollectionRecipes: any = await this.Firebase.GetRecipes()
    this.Recipes = CollectionRecipes
  }
  //User
  private async GetInformationClient() {
    try {
      let doc: any = await this.Firebase.GetClient(this.bd.User)
      this.User = doc
      let extraDoc:any = await this.Firebase.GetExtraInformationClient(this.User.IdClientInformation)
      this.ExtraUser=extraDoc
    } catch (error) {
      //this.User = information
    }
    this.GetMenus()
  }
  private async GetMenus() {
    this.Days = ""
    this.flagShowMenu=false
    const InformationDay = new Date().getDay()
    let IdMenu:number=0
    switch (InformationDay) {
      case 1:
        this.Days = "Lunes"
        IdMenu=this.User.Menus.Monday
        break;
      case 2:
        this.Days = "Martes"
        IdMenu=this.User.Menus.Tuesday
        break;
      case 3:
        this.Days = "Miercoles"
        IdMenu=this.User.Menus.Wednesday
        break;
      case 4:
        this.Days = "Jueves"
        IdMenu=this.User.Menus.Thursday
        
        break;
      case 5:
        this.Days = "Viernes"
        IdMenu=this.User.Menus.Friday
        break;
      case 6:
        this.Days = "Sabado"
        IdMenu=this.User.Menus.Saturday
        console.log(IdMenu)
        break;
      case 7:
        this.Days = "Domingo"
        IdMenu=this.User.Menus.Sunday
        break;
      default:
        
        break;
    }
    if(IdMenu!=0){
      console.log("entro if para los menus")
      this.MenuDay=await this.Firebase.GetMenus(IdMenu)
    }else{
      this.flagShowMenu=true
    }
    
  }
  //SignOff
  public SingOff(){
    this.route.navigate(['/home'])
  }


}
