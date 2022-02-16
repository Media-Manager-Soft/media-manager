export class TreeItemDto {

  text: string;
  value: string;
  qty: number = 0;
  isSelected = false;
  childSelectionStatus: selectionType = null;
  children: TreeItemDto[] = []

}
export type selectionType = 'full' | 'partial' | 'none' | null ;
export type selectionToQuery = { value: string, selection: selectionType }
