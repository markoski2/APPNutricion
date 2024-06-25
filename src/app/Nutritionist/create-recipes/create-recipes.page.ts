import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-create-recipes',
  templateUrl: './create-recipes.page.html',
  styleUrls: ['./create-recipes.page.scss'],
})
export class CreateRecipesPage implements OnInit {

  constructor(private toastController: ToastController,private router:Router) { }

  ngOnInit() {
    document.getElementById("Add")?.addEventListener("click",()=>{
      this.presentToast()
      this.router.navigate(['/homeNutritionist'])
    })
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

}
