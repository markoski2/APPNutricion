import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  FlagMenu:boolean=false
  constructor(private route:Router) { }

  ngOnInit() {
    document.getElementById("BtnMenu")?.addEventListener("click",()=>{
      let modal=document.getElementById("modal")!
      if(!this.FlagMenu){
        this.FlagMenu=true
        modal.style.transform="translateX(0%)"
      }else{
        this.FlagMenu=false
        modal.style.transform="translateX(200%)"
      }
    })
    document.getElementById("BtnClose")?.addEventListener("click",()=>{
      let modal=document.getElementById("modal")!
       this.FlagMenu=false
        modal.style.transform="translateX(200%)"
    })

    document.getElementById("Information")?.addEventListener("click",()=>{
      this.route.navigate(['information'])
    })
    document.getElementById("MenuDays")?.addEventListener("click",()=>{
      this.route.navigate(['menuDays'])
    })
  }

  public InformationRecipes(){
    this.route.navigate(['/informationRecipes'])
  }

}
