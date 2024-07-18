import { Component, OnInit } from '@angular/core';
import { InterRecipes } from 'src/app/Interface/interfaces.service';
import { BdService } from 'src/app/Service/bd.service';

@Component({
  selector: 'app-information-recipes',
  templateUrl: './information-recipes.page.html',
  styleUrls: ['./information-recipes.page.scss'],
})
export class InformationRecipesPage implements OnInit {

  public Recipes:InterRecipes={
    IdRecipes: 0,
    Name: "",
    Ingredinets: "",
    Procedure: "",
    Carbohydrate: 0,
    Fat: 0,
    Protein:0
  }
  constructor(private Information:BdService) { }

  ngOnInit() {
    this.getInformationRecipes()

    document.getElementById("Carousel1")?.addEventListener("click",()=>{
      var Carousel=document.getElementById("Carousel")
      Carousel!.style.transform="translateX(-0%)"
    })
    document.getElementById("Carousel2")?.addEventListener("click",()=>{
      var Carousel=document.getElementById("Carousel")
      Carousel!.style.transform="translateX(-33.33%)"
    })
    document.getElementById("Carousel3")?.addEventListener("click",()=>{
      var Carousel=document.getElementById("Carousel")
      Carousel!.style.transform="translateX(-66.66%)"
    })
  }

  private getInformationRecipes(){
    var Information:any=this.Information.InformationRecipes
    this.Recipes=Information
  }

}
