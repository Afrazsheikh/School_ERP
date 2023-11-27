import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent {
  @Input() model: any;
  @Input() placeholder:any;
	@Output() modelChange = new EventEmitter();

	onModelChange() {
		this.modelChange.emit(this.model);
	}
}

