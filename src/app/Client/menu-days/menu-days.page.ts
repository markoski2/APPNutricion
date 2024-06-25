import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-days',
  templateUrl: './menu-days.page.html',
  styleUrls: ['./menu-days.page.scss'],
})
export class MenuDaysPage implements OnInit {

  constructor(private route:Router) { }

  ngOnInit() {
  }
  public InformationRecipes(){
    this.route.navigate(['/informationRecipes'])
  }

}
