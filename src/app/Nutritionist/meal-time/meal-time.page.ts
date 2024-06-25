import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { BdService, InterRecipes } from 'src/app/Service/bd.service';
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


  Array: InterRecipes[] = []
  MealTime: any = [{ Id: "", Name: "" }, { Id: "", Name: "" }, { Id: "", Name: "" }, { Id: "", Name: "" }, { Id: "", Name: "" }, { Id: "", Name: "" }]
  Opc: number = 0

  name!: string;

  cancel() {
    this.ModalOpenMealTime = false
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.ModalOpenMealTime = false
    this.modal.dismiss(this.name, 'confirm');
  }

  constructor(private User: GenerationUserService,
    private Recipes: BdService
  ) { }

  ngOnInit() {
    document.getElementById("BtnPageSave")?.addEventListener("click", () => {
      this.User.CreateUser()
    })

    this.GetRecipes()

  }

  private GetRecipes() {
    for (let index = 0; index < 5; index++) {
      this.Array.push(this.Recipes.Recipes[index])
    }
  }

  public opcion(event: any, Id: string) {
    var MealTime = document.getElementById("" + Id)!
    if (event.detail.checked) {
      MealTime.style.display = "flex"
    } else {
      MealTime.style.display = "none"
    }
  }
  public EnableBtnChooseRecipes(event: any, Id: string) {
    var RecipesChoose = document.getElementById("" + Id)!
    if (event.detail.checked) {
      RecipesChoose.style.display = "flex"
    } else {
      RecipesChoose.style.display = "none"
    }
  }
  public OpenModal(opc:number) {
    this.Opc=opc
    this.ModalOpen = true
  }
  public CloseModal() {
    this.ModalOpen = false
  }

  public OpenModalChooseRecipes() {
    this.ModalOpenMealTime = true
  }

  public SaveRecipes(item: InterRecipes) {

    this.MealTime[this.Opc].Id = item.IdRecipes
    this.MealTime[this.Opc].Name = item.Name
    this.SetNameButton(item.Name)
    this.CloseModal()
  }
  private SetNameButton(name:string) {
    switch (this.Opc) {
      case 1:
        this.breakfast=name
        break;
      case 2:
        this.lunch=name
        break;
      case 3:
        this.meal=name
        break;
      case 4:
        this.snack=name
        break;
      case 5:
        this.dinner=name
        break;
      case 6:
        this.refreshment=name
        break;
    }
  }

}
