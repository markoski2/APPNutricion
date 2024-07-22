import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { InterExtraInformationClient } from 'src/app/Interface/interfaces.service';
import { BdService } from 'src/app/Service/bd.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.page.html',
  styleUrls: ['./information.page.scss'],
})
export class InformationPage implements OnInit {
  char!: Chart | undefined
  Information!:InterExtraInformationClient
  constructor(private bd:BdService) { }

  ngOnInit() {
    this.GetInformation()
  }
  @ViewChild('someInput2',{static: true}) someInput!: ElementRef;

  graph() {
    console.log("Informacion recibida")
    console.log(this.Information)
    let min=this.Information.Weights.LastWeight-30
    this.char=new Chart(this.someInput.nativeElement, {
      type: 'line',
      data: {
        labels: ['Inicial', '01/01/0001', '01/01/0001', '01/01/0001', '01/01/0001'],
        datasets: [
          {
            label: 'Pesos',
            data: [this.Information.Weights.StarWeight, 
              this.Information.Weights.Weight3, 
              this.Information.Weights.Weight2, 
              this.Information.Weights.Weight1, 
              this.Information.Weights.LastWeight],
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
            min:min,
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

  private async GetInformation(){
    let ExtraInformation:any=this.bd.ExtraInformationClient
    this.Information=ExtraInformation
    this.graph()
  }

}
