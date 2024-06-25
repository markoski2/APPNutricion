import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-information',
  templateUrl: './information.page.html',
  styleUrls: ['./information.page.scss'],
})
export class InformationPage implements OnInit {
  ctx: any = document.getElementById('myChart');
  char!: Chart
  constructor() { }

  ngOnInit() {
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
            borderColor: '#00E4FF',
            backgroundColor:'#00E4FF'
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: false,
            min:40,
            grid: {
              color: 'rgba(165, 165, 165)', // Color de las líneas de fondo en el eje X
          },
          ticks: {
              color: '#5361cf', // Color del texto en el eje X
          }
          },
          x:{
            grid: {
              color: 'rgba(165, 165, 165)', // Color de las líneas de fondo en el eje Y
          },
          ticks: {
              color: '#5361cf', // Color del texto en el eje Y
          }
          }
        },
      },
    });
  } //end ngAfterViewInit

}
