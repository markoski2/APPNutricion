import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-information-recipes',
  templateUrl: './information-recipes.page.html',
  styleUrls: ['./information-recipes.page.scss'],
})
export class InformationRecipesPage implements OnInit {

  constructor() { }

  ngOnInit() {
    document.getElementById("Carousel1")?.addEventListener("click",()=>{
      var Carousel=document.getElementById("Carousel")
      Carousel!.style.transform="translateX(-0%)"
      console.log("jolasd")
    })
    document.getElementById("Carousel2")?.addEventListener("click",()=>{
      var Carousel=document.getElementById("Carousel")
      Carousel!.style.transform="translateX(-33.33%)"
      console.log("jolasd")
    })
    document.getElementById("Carousel3")?.addEventListener("click",()=>{
      var Carousel=document.getElementById("Carousel")
      Carousel!.style.transform="translateX(-66.66%)"
      console.log("jolasd")
    })
  }

}
