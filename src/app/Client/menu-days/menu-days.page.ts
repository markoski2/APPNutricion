import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { InterClient, InterMenu, InterRecipes } from 'src/app/Interface/interfaces.service';
import { BdService } from 'src/app/Service/bd.service';
import { ElementsService } from 'src/app/Service/elements.service';
import { FirebaseService } from 'src/app/Service/firebase.service';

@Component({
  selector: 'app-menu-days',
  templateUrl: './menu-days.page.html',
  styleUrls: ['./menu-days.page.scss'],
})
export class MenuDaysPage implements OnInit {

  constructor(private route: Router,
    private information: BdService,
    private Firebase: FirebaseService,
    private alertController: AlertController,
    private elemento: ElementsService) { }

  NumberMenus: number[] = []
  Menus: InterMenu[] = []
  Nothing:boolean=true
  FlagBoolean: InterRecipes[] = []
  Days: string[] = []
  Recipes!: InterRecipes[]
  FlagAddDayMenu:boolean=false
  private flagOptions: boolean = false
  private Recipe!: InterRecipes

  ngOnInit() {
    this.GetInformationClient()
    this.GetRecipes()
  }
  public User!: InterClient
  public InformationRecipes(NumberCard: number) {
    if (this.FlagBoolean[NumberCard] != null) {
      this.information.InformationRecipes = this.FlagBoolean[NumberCard]
      this.route.navigate(['/informationRecipes'])
    }
  }
  private async GetInformationClient() {
    this.elemento.ElementLoading('TagHeader')
    var information: any = this.information.InformationClient
    this.FlagAddDayMenu=this.information.FlagMenu
    /*try {
      await this.Firebase.GetClient(information.IdClient).subscribe(res=>{
        if(res){
          this.User=res
          console.log("informacion firebase")
          console.log(res)
        }
      })
      
    } catch (error) {
      this.User = information
    }*/
    this.User = information
    this.GetMenus()
  }

  private async GetMenus() {
    this.Days = []
    try {
      if (this.User.Menus.Monday != 0) {
        this.NumberMenus.push(this.User.Menus.Monday)
        this.Days.push("Lunes")
      }
      if (this.User.Menus.Tuesday != 0) {
        this.NumberMenus.push(this.User.Menus.Tuesday)
        this.Days.push("Martes")
      }
      if (this.User.Menus.Wednesday != 0) {
        this.NumberMenus.push(this.User.Menus.Wednesday)
        this.Days.push("Miercoles")
      }
      if (this.User.Menus.Thursday != 0) {
        this.NumberMenus.push(this.User.Menus.Thursday)
        this.Days.push("Jueves")
      }
      if (this.User.Menus.Friday != 0) {
        this.NumberMenus.push(this.User.Menus.Friday)
        this.Days.push("Viernes")
      }
      if (this.User.Menus.Saturday != 0) {
        this.NumberMenus.push(this.User.Menus.Saturday)
        this.Days.push("Sabado")
      }
      if (this.User.Menus.Sunday != 0) {
        this.NumberMenus.push(this.User.Menus.Sunday)
        this.Days.push("Domingo")
      }

      console.log("informacion menu")
      console.log(this.NumberMenus)

      await this.Firebase.GetMenu(this.NumberMenus).subscribe(async(res)=>{
        if(res!=null){
          this.Nothing=false
          this.Menus=res
          //this.Menus.push(res)
          this.elemento.RemoveLoad()
        }else{
          this.Nothing=true
          console.log("No se encontraron datos del menu")
        }
      })

      /*for (let Element of this.NumberMenus) {
        await this.Firebase.GetMenu(Element).subscribe(async(res)=>{
         if(res!=null){
           this.Nothing=false
           this.Menus.push(res)
           this.elemento.RemoveLoad()
         }else{
           this.Nothing=true
           console.log("No se encontraron datos del menu")
         }
         
        })
       }*/
      
    } catch (error) {
      this.elemento.RemoveLoad()
      console.log("Error en la información")
    }
  }

  public SetNameCard(idMenu: InterMenu, IdRecipe: string, NameImg: string, index: number) {

    this.SearchRecipe(IdRecipe)
    this.ChangeImg("" + idMenu.IdMenu, NameImg)
    let Name = document.getElementById("" + idMenu.IdMenu)
    this.FlagBoolean[index] = this.Recipe
    Name!.innerText = this.Recipe.Name
  }
  private async GetRecipes() {
    this.Nothing=true
    var CollectionRecipes: any
    await this.Firebase.GetRecipes().subscribe(res=>{
      if(res!=null){
        CollectionRecipes = res
        this.Recipes = CollectionRecipes
        console.log("Informacion de firebase")
        console.log(this.Recipes)
      }
      
    })
    
  }
  private SearchRecipe(IdRecipe: string) {
    for (let Element of this.Recipes) {
      if ((Element.IdRecipes).toString()==IdRecipe) {
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

  public async ShowOptions(item: InterMenu, NumberDay: number) {
    this.flagOptions = await this.information.FlagMenu
    if (this.flagOptions) {
      this.OptionsMenu(item, NumberDay)
      let BtnAdd=document.getElementById("Add")!
      BtnAdd.style.display="block"
    }
  }
  private async OptionsMenu(item: InterMenu, NumberDay: number) {
    const actionSheet = document.createElement('ion-action-sheet');
    actionSheet.header = 'Opciones';
    actionSheet.buttons = [
      {
        text: 'Borrar',
        role: 'destructive',
        handler: () => {
          console.log("hola")
          this.QuestionsDelate(item.IdMenu, NumberDay)
        },
      },
      {
        text: 'Editar',
        handler: () => {
          this.information.InformationMenu = item
          this.route.navigate(['/EditInformation/EditMenuDay'])
        }
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
  private async QuestionsDelate(item: number, NumberDay: number) {
    console.log("hola de nuevo")
    const alert = await this.alertController.create({
      message: '¿Deseas borrar el menu?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          },
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => {
            this.ChooseNameDay(this.Days[NumberDay])
            this.Firebase.DelateMenuDay(item, this.User).subscribe(() => {
              this.elemento.DelateToast()
              this.route.navigate(['/homeNutritionist'])
            })
          },
        }]
    });

    document.body.appendChild(alert);
    await alert.present();
  }

  private ChooseNameDay(Day: string) {
    switch (Day) {
      case "Lunes":
        this.User.Menus.Monday=0
        break;
      case "Martes":
        this.User.Menus.Tuesday=0
        break;
      case "Miercoles":
        this.User.Menus.Wednesday=0
        break;
      case "Jueves":
        this.User.Menus.Thursday=0
        break;
      case "Viernes":
        this.User.Menus.Friday=0
        break;
      case "Sabado":
        this.User.Menus.Saturday=0
        break;
      case "Domingo":
        this.User.Menus.Sunday=0
        break;
    }
  }
  
  public BtnAdd(){
    this.information.InformationClient=this.User
    this.route.navigate(['/mealTime'])
  }

}
