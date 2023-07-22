import { ISector } from "./ISector";
export interface IReport {
  id: string;
  title: string;
  expertize: string;
  sectors: ISector[];
  regions: {
    id: string;
    name: string;
  }[];
  year: number;
  pdfUrl: string;
  slug: string;
}
