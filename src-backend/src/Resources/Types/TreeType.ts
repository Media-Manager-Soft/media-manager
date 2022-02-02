export class TreeItem {
  constructor(public text: string, public value: string) {
  }

  children: TreeItem[] = []
}
