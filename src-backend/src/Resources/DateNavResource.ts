import { TreeItem } from "./Types/TreeType";
import { sumBy } from 'lodash';


export class DateNavResource {
  private result: TreeItem[] = [];

  constructor(private data: any) {
  }

  resource() {
    this.data.map((item: any) => {
      this.appendRow(item)
    })

    return [new TreeItem('All', '', sumBy(this.data, 'qty'), this.result)]
  }

  appendRow(item: any) {
    this.setYear(item)
    this.setMonths(item)
  }

  protected setMonths(item: any) {
    let yearIndex = this.result.findIndex(element => {
      return element.value === this.getDatePart(item.takenAtDate)
    })

    let monthIndex = this.result[yearIndex].children.findIndex(child => {
      const startsWith = this.getDatePart(item.takenAtDate, 7);
      return child.value.startsWith(startsWith)
    })

    if (monthIndex === -1) { // create Month in Year
      const monthAndYear = this.getDatePart(item.takenAtDate, 7)
      const treeItem = new TreeItem(this.retrieveText(item.takenAtDate, 'm'), monthAndYear, item.qty); //month
      monthIndex = this.result[yearIndex].children.push(treeItem) - 1; // Recently pushed item index
    } else {
      this.result[yearIndex].children[monthIndex].qty += item.qty;
    }

    // add day to month
    this.result[yearIndex].children[monthIndex].children.push(
      new TreeItem(
        this.retrieveText(item.takenAtDate, 'd'),
        item.takenAtDate,
        item.qty
      )
    )
  }

  protected setYear(item: any) {
    let year = this.getDatePart(item.takenAtDate)

    // let yearInResult = (this.result, {text: year});
    const yearIndex = this.result.findIndex(item => {
      return item.value === year;
    })


    if (yearIndex === -1) {
      this.result.push(new TreeItem(this.retrieveText(item.takenAtDate, 'y'), year, item.qty))
    } else {
      this.result[yearIndex].qty += item.qty;
    }

  }


  getDatePart(date: string, position: number = 4) {
    return date.slice(0, position);
  }

  retrieveText(date: string, type: string) {
    const dateArr = date.split('-')
    switch (type) {
      case 'y':
        return dateArr[0]
      case 'm':
        return dateArr[1]
      case 'd':
        return dateArr[2]
    }
    return ''
  }

  //recursive
  // resource() {
  //   this.data.map((item: any) => {
  //     const dateSplitted = item.takenAtDate.split('-')
  //     this.ensureTreeItemIsCreated(this.result, dateSplitted)
  //   })
  //
  //   return this.result;
  // }
  //
  // private ensureTreeItemIsCreated(currentTreeItem: any, itemsToAppend: string[]) { // 2018 02 29
  //
  //   if (currentTreeItem[itemsToAppend[0]] === undefined) {
  //     currentTreeItem[itemsToAppend[0]] = new TreeItem(itemsToAppend[0]);
  //   }
  //
  //   let a = currentTreeItem[itemsToAppend[0]]
  //
  //   itemsToAppend.shift()
  //
  //   if (itemsToAppend.length === 0) {
  //     return;
  //   }
  //
  //   this.ensureTreeItemIsCreated(a, itemsToAppend)
  //
  // }

}
