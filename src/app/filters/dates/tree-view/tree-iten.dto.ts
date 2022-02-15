export class TreeItemDto {

  text: string;
  isSelected = false;
  childSelectionStatus: selectionType = null;
  value: string;
  children: TreeItemDto[] = []

}
export type selectionType = 'full' | 'partial' | 'none' | null ;
export type selectionToQuery = { value: string, selection: selectionType }
