import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { countBy as _countBy } from 'lodash';
import { TreeViewService } from "../tree-view.service";
import { TreeItemDto } from "../tree-iten.dto";

@Component({
  selector: 'app-tree-item',
  templateUrl: './tree-item.component.html',
  styleUrls: ['./tree-item.component.scss']
})
export class TreeItemComponent implements OnInit {

  @Input()
  item: TreeItemDto;

  @Output()
  changed = new EventEmitter<boolean>();

  constructor(public treeService: TreeViewService) {
  }

  ngOnInit(): void {
  }

  async toggleSelection() {
    let desiredValue = !this.item.isSelected;
    await this.toggleRecursive(this.item, desiredValue)
    this.changed.emit(desiredValue);
    this.treeService.setQuery(); //TODO: set new data
  }

  toggleRecursive(item: TreeItemDto, desiredValue: boolean) {
    return new Promise(resolve => {
      item.isSelected = desiredValue;

      if (desiredValue) {
        this.treeService.addItem({value: item.value, selection: item.childSelectionStatus});
      } else {
        this.treeService.removeItem({value: item.value, selection: item.childSelectionStatus})
      }
      item.children.map(async child => {
        child.isSelected = desiredValue;
        await this.toggleRecursive(child, desiredValue)
      })
      resolve(true);
    })

  }

  childChanged(ev: any) {
    let qty = _countBy(this.item.children, (child) => {
      return child.isSelected === true;
    })
    this.item.childSelectionStatus = null;

    if (qty['true'] !== undefined && qty['false'] !== undefined) {
      this.item.childSelectionStatus = 'partial'
      return;
    }
    if (qty['true'] === undefined) {
      this.item.isSelected = false
      this.item.childSelectionStatus = 'none'
    }
    if (qty['false'] === undefined) {
      this.item.isSelected = true
      this.item.childSelectionStatus = 'full'
    }

    this.changed.emit(this.item.isSelected);
  }


}
