export class TreeItem {
  constructor(
    public text: string,
    public value: string,
    public qty: number = 0,
    public children: TreeItem[] = []
  ) {
  }

}
