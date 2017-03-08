import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'bs-select',
  templateUrl: './bs-select.component.html',
  styleUrls: ['./bs-select.component.scss']
})
export class BsSelectComponent implements OnInit {
  @Input() options = [];
  @Output() onSelect = new EventEmitter<String>();
  constructor() { }


  ngOnInit() {
  }

  emitSelectEvent(value: String) {
    this.onSelect.emit(value);

  }

}
