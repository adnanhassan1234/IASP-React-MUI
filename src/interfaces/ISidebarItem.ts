import { ReactNode } from "react";

export interface ISideBarDataItem {
  path: string;
  icon: ReactNode;
  text: string;
  type: "mainPath" | "setting";
}
