import { Component, Input, OnInit } from '@angular/core';
import { TreeItemDto } from "./TreeItemDto";

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss']
})
export class TreeViewComponent implements OnInit {

  constructor() {
  }

  @Input()
  items: TreeItemDto[];

  ngOnInit(): void {
  }

}
