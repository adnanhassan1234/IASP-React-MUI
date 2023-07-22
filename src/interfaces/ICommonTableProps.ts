export interface ICommonTableProps {
  tableContent: any[];
  tableHeadingData: { [key: string]: string };
  path: string;
  onEdit: (id: number) => any;
  onDelete: (id: number) => void;
}
