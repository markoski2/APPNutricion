import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { InterRecipes } from 'src/app/Interface/interfaces.service';
import { BdService } from 'src/app/Service/bd.service';
import { ElementsService } from 'src/app/Service/elements.service';
import { FirebaseService } from 'src/app/Service/firebase.service';

@Component({
  selector: 'app-edit-information',
  templateUrl: './edit-information.page.html',
  styleUrls: ['./edit-information.page.scss'],
})
export class EditInformationPage implements OnInit {

  public Recipes:InterRecipes={
    IdRecipes:0,
    Name: "",
    Ingredinets: "",
    Procedure: "",
    Carbohydrate: 0,
    Fat: 0,
    Protein:0
  }

  constructor(private bd:BdService,
    private Firebase:FirebaseService,
    private Router:Router,
    private Elemento:ElementsService) { }

  ngOnInit() {
    this.GetInformationRecipes()
    document.getElementById("Edit")?.addEventListener("click",()=>{
      this.UpdateRecipe()
    })
  }

  private GetInformationRecipes(){
    let TemporaryInformation:any=this.bd.InformationRecipes
    this.Recipes=TemporaryInformation
  }
  private async UpdateRecipe(){
    this.GetInputInformation()
    await this.Firebase.UpdateRecipe(this.Recipes).finally(()=>{
      this.Router.navigate(['/homeNutritionist']).finally(()=>{
        this.Elemento.UpdateRecipeToast()
      })
    })
  }
  private GetInputInformation(){
    this.Recipes={
      IdRecipes:this.Recipes.IdRecipes,
      Name: (document.getElementById("InputName") as HTMLInputElement).value,
      Ingredinets: (document.getElementById("InputIngredients") as HTMLInputElement).value,
      Procedure: (document.getElementById("InputProcedure") as HTMLInputElement).value,
      Carbohydrate: parseInt((document.getElementById("InputCarbohydrate") as HTMLInputElement).value),
      Fat: parseInt((document.getElementById("InputFat") as HTMLInputElement).value),
      Protein:parseInt((document.getElementById("InputProtein") as HTMLInputElement).value)
    }
  }
  
}
