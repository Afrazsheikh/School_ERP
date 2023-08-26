import { Component, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexXAxis,
  ApexFill,
  ApexTitleSubtitle,
  ChartComponent,
} from 'ng-apexcharts';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  sectionObj : any;
  dashboardObj: any;
  studentTickets:any;
  employeeTickets:any;
  constructor(private api: ApiService, private toastr: ToastrService, private router: Router){

    this.chartOptions = {
      series: [
        {
          name: 'Fees Collected',
          data: [230, 310, 400, 110, 400, 360, 320, 230, 140, 80, 50, 20],
        },
      ],
      chart: {
        height: 350,
        type: 'bar',
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + '%';
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ['#304758'],
        },
      },

      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        position: 'top',
        labels: {
          offsetY: -18,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
          offsetY: -35,
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'horizontal',
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100],
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          // formatter: function (val) {
          //   return val + '%';
          // },
        },
      },
      title: {
        text: 'Fees Collected, 2023-2024',
        // floating: 0,
        offsetY: 330,
        align: 'center',
        style: {
          color: '#444',
        },
      },
    };
  }
  ngOnInit(): void {    
    this.getAllCount();
    this.getdashbaoradDataRecord();
    this.getRaiseTicketRecord();
  //  this.getAllVehicleRecord();
  }
  getAllCount(){
    this.api.getSectionCount().subscribe(data =>{
     this.sectionObj= data;
     });
  }
  getRaiseTicketRecord(){
    this.api.getRaiseTicket().subscribe(data =>{
      this.studentTickets = data?.studentTickets;
      this.employeeTickets = data?.teacherTickets;
     });
  }
  getAllVehicleRecord(){
    this.api.getAllVehicle().subscribe(data =>{
    console.log(data);
     });
  }
  getdashbaoradDataRecord(){
    this.api.getdashbaoradData().subscribe(data =>{
    this.dashboardObj = data;
     });
  }
 
}
