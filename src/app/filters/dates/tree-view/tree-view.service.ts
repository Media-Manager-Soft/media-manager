import { Injectable } from '@angular/core';
import { remove as _remove, uniq as _uniq, filter as _filter, map as _map } from 'lodash';
import { MediaService } from "../../../media/media.service";
import { selectionToQuery } from "./tree-iten.dto";

@Injectable({
  providedIn: 'root'
})
export class TreeViewService {
  //TODO: Separate Service to be more reusable. I.e. Use Even bus
  items: selectionToQuery[] = []; //For future use: selection Query contains child selection type.

  constructor(private mediaService: MediaService) {

  }

  setQuery() {
    this.mediaService.setQuery({type: 'date', parameters: this.itemsPreparedForQuery()})
  }

  itemsPreparedForQuery() {

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
}
