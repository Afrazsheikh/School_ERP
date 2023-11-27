import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss']
})
export class DynamicTableComponent {
  @Input() columns: any ={};
  @Input() data:any =[];
  @Output() rowEvent = new EventEmitter();
  tableHeader:any;
  searchText:any = "";
  peopleFilter:any;
  fields:any={};
  caseInsensitive: boolean = false;
  order:  string = 'categoryName';
  reverse: boolean = false;
  count =1;
  constructor( private router: Router){
   
  }
  ngOnInit(): void {       
    this.tableHeader = this.columns;
    this.count = this.tableHeader.data.length;
    this.order = this.tableHeader.sortBy.field;
    this.updateFilters();
  }
  updateFilters(){
    this.columns.data.forEach(element => {
      if(element.search){
        this.fields[element.field]= this.searchText
      }      
    });
    this.peopleFilter = this.fields;
  }
  selected_tool($event: any, lead: any) {
		this.rowEvent.emit({ event: $event, lead: lead });
	}
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }
}
