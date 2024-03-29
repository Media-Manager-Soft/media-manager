import { Injectable } from '@angular/core';
import { remove as _remove, uniq as _uniq, map as _map } from 'lodash';
import { selectionToQuery } from "./tree-iten.dto";
import { DatesService } from "../dates.service";

@Injectable({
  providedIn: 'root'
})
export class TreeViewService {
  //TODO: Separate Service to be more reusable. I.e. Use Even bus
  items: selectionToQuery[] = []; //For future use: selection Query contains child selection type.

  constructor(private dateService: DatesService) {
  }

  setQuery() {
    this.dateService.setQuery(this.prepareItemsForQuery())
  }
  addItem(value: selectionToQuery) {
    this.items.push(value)
    _uniq(this.items)
  }

  removeItem(value: selectionToQuery) {
    _remove(this.items, function (item: selectionToQuery) {
      return item.value === value.value;
    });
    _uniq(this.items)
  }

  unselectAll() {
    this.items = [];
    this.dateService.unselectAll();
  }

  prepareItemsForQuery() {

    let dataItems = [...this.items];

    _uniq(dataItems);

    return _map(dataItems, 'value');

    // 4 - Years, 7 - months
    // [4, 7].map(stringLength => {
    //
    //   let items = _filter(dataItems, function (i) { // Filter parent items
    //     return i.value.length === stringLength;
    //   })
    //
    //   items.map((item) => {
    //     if (item.selection == 'full') {
    //       return;
    //     }
    //     _remove(dataItems, function (i) {
    //       return i.value.startsWith(item.value) && i.value.length > stringLength;
    //     })
    //   })
    //
    // })
    // return _map(dataItems, 'value');
  }
}
