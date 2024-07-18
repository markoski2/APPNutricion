import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { InterRecipes } from 'src/app/Interface/interfaces.service';
import { FirebaseService } from 'src/app/Service/firebase.service';
import { GenerationUserService } from 'src/app/Service/generation-user.service';

@Component({
  selector: 'app-create-recipes',
  templateUrl: './create-recipes.page.html',
  styleUrls: ['./create-recipes.page.scss'],
})
export class CreateRecipesPage implements OnInit {

  flag:boolean=true

  constructor(
    private toastController: ToastController,
    private router:Router,
    private Generate:GenerationUserService,
    private Firebase:FirebaseService) { }

  ngOnInit() {
    document.getElementById("Add")?.addEventListener("click",()=>{
      if(this.flag){
        this.flag=false
        this.GetInformationRecipe()
      }
      
    })
  }
  Ingredients:string=""
  Recipe:InterRecipes={
    IdRecipes:0,
    Name: "",
    Ingredinets: "",
    Procedure: "",
    Carbohydrate: 0,
    Fat: 0,
    Protein:0
  }

  public createInputIngredients(){
    var father =document.getElementById("ingredients")
    var Div=document.createElement("div")
    var label1=document.createElement("label")
    label1.textContent="*"
    var input=document.createElement("input")
    input.style.width="250px"
    input.style.height="43px"
    input.style.margin="10px  10px 0 10px"
    input.style.fontSize="20px"
    input.style.padding="6px"
    input.className="IdIngredients"
    var label2=document.createElement("label")
    label2.textContent="X"
    label2.style.color="red"
    label2.style.fontSize="33px"
    label2.addEventListener("click",()=>{
      Div.remove()
    })
    Div.appendChild(label1)
    Div.appendChild(input)
    Div.appendChild(label2)
    father?.appendChild(Div)
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Receta creada',
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
  }
  async MissingDates() {
    const toast = await this.toastController.create({
      message: 'Faltan Datos por Rellenar',
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
  }

  public GetInformationRecipe(){
    this.ExtractIngredients()
    this.Recipe={
      IdRecipes: parseInt("82"+this.Generate.GenerationId()),
      Name: (document.getElementById("InputName") as HTMLInputElement).value,
      Ingredinets: this.Ingredients,
      Procedure: (document.getElementById("TextAreaProcedure") as HTMLInputElement).value,
      Carbohydrate: parseInt((document.getElementById("Carbohydrate") as HTMLInputElement).value),
      Fat: parseInt((document.getElementById("Fat") as HTMLInputElement).value),
      Protein:parseInt((document.getElementById("Protein") as HTMLInputElement).value)
    }
    this.CheckInformation()
  }

  private ExtractIngredients(){
    this.Ingredients=(document.getElementById("InputIngredients") as HTMLInputElement).value
    document.querySelectorAll(".IdIngredients").forEach(Element=>{
      if((Element as HTMLInputElement).value){
        this.Ingredients+="\n\n"+(Element as HTMLInputElement).value
      }
      
    })
  }

  private RemoveInputsIngredients(){
    document.querySelectorAll(".IdIngredients").forEach(Element=>{
      Element.remove()
    })
  }
  private ClearInputs(){
    (document.getElementById("InputName") as HTMLInputElement).textContent="";
    this.RemoveInputsIngredients();
    (document.getElementById("InputIngredients") as HTMLInputElement).textContent="";
    (document.getElementById("TextAreaProcedure") as HTMLInputElement).textContent="";
    (document.getElementById("Carbohydrate") as HTMLInputElement).textContent="";
    (document.getElementById("Fat") as HTMLInputElement).textContent="";
    (document.getElementById("Protein") as HTMLInputElement).textContent="";
  }

  private async CheckInformation(){
    if(this.Recipe.Name&&this.Recipe.Ingredinets&&this.Recipe.Procedure){
      if(this.Recipe.Protein&&this.Recipe.Carbohydrate&&this.Recipe.Fat){
        this.Firebase.AddNewRecipe(this.Recipe).finally(()=>{
          this.presentToast()
          this.ClearInputs()
          this.router.navigate(['/homeNutritionist'])
        })
      }else{
        this.MissingDates()
      }
    }else{
      this.MissingDates()
    }
    this.flag=true
  }
  
}
