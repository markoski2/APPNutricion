import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js/auto';


@Component({
  selector: 'app-information-client',
  templateUrl: './information-client.page.html',
  styleUrls: ['./information-client.page.scss'],
})
export class InformationClientPage implements OnInit {
  ctx: any = document.getElementById('myChart');
  char!: Chart
  constructor(private router:Router) { }

  ngOnInit() {
    document.getElementById("BtnMenu")?.addEventListener("click",()=>{
      this.router.navigate(['/menuDays'])
    })
  }
  @ViewChild('someInput2') someInput!: ElementRef;

  ngAfterViewInit() {
    this.char=new Chart(this.someInput.nativeElement, {
      type: 'line',
      data: {
        labels: ['Inicial', '01/01/0001', '01/01/0001', '01/01/0001', '01/01/0001'],
        datasets: [
          {
            label: 'Pesos',
            data: [80, 78, 81, 72, 70],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  } //end ngAfterViewInit

}
