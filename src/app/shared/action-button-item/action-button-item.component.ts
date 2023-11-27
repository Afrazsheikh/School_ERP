import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-action-button-item',
  templateUrl: './action-button-item.component.html',
  styleUrls: ['./action-button-item.component.scss']
})
export class ActionButtonItemComponent {
  @Input() tools_config: any = {
		'edit': {
			show: true,
		},
		'delete': {
			show: true
		}
	}
	@Input() row:any
	@Output() tools_configChange = new EventEmitter()

	@Output() tool_selected = new EventEmitter<any>()
	clicked(tool: any) {
		this.tool_selected.emit(tool)
	}

	isMarkOut:boolean=false;

	ngOnInit(){
		if(this.row?.visitingPersonSignOut != ''){
			this.isMarkOut = true;
		}
	}
}
