import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'icon-favorite',
  templateUrl: './favorite.component.html',
})
export class FavoriteComponent implements OnInit {

  constructor() { }

  @Input()
  filled: false;

  ngOnInit(): void {
  }

}
