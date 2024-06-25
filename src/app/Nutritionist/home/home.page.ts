import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScreenShotService } from 'src/app/Service/screen-shot.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  FlagMenu:boolean=false
  constructor(private route:Router,private prueba:ScreenShotService) { }
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
    document.getElementById("modal")?.addEventListener("click",()=>{
      let modal=document.getElementById("modal")!
      this.FlagMenu=false
        modal.style.transform="translateX(200%)"
    })
    document.getElementById("AddClient")?.addEventListener("click",()=>{
      this.route.navigate(["/createClient"])
    })

    document.getElementById("AddRecipes")?.addEventListener("click",()=>{
      this.route.navigate(["/createRecipes"])
    })
    
  }

  public InformationClient(){
    this.route.navigate(["/informationClient"])
  }

}
