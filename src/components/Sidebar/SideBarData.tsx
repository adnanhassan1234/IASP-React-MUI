import {
  DashboardOutlined,
  TextSnippetOutlined,
  PeopleOutline,
  SettingsOutlined,
} from "@mui/icons-material";
import { ISideBarDataItem } from "@interfaces/ISidebarItem";

const sideBarData: ISideBarDataItem[] = [
  {
    path: "/dashboard",
    icon: <DashboardOutlined />,
    text: "Dashboard",
    type: "mainPath",
  },
  {
    path: "/projects",
    icon: <TextSnippetOutlined />,
    text: "Projects",
    type: "mainPath",
  },
  {
    path: "/articles",
    icon: <TextSnippetOutlined />,
    text: "Articles",
    type: "mainPath",
  },
  {
    path: "/jobs",
    icon: <TextSnippetOutlined />,
    text: "Job Posts",
    type: "mainPath",
  },
  {
    path: "/employees",
    icon: <PeopleOutline />,
    text: "Team",
    type: "mainPath",
  },
  {
    path: "/reports",
    icon: <PeopleOutline />,
    text: "Reports",
    type: "mainPath",
  },
  {
    path: "/sectors",
    icon: <PeopleOutline />,
    text: "Sectors",
    type: "mainPath",
  },
  {
    path: "/admins",
    icon: <PeopleOutline />,
    text: "Admins",
    type: "mainPath",
  },
  {
    path: "/settings",
    icon: <SettingsOutlined />,
    text: "Settings",
    type: "setting",
  },
];

export default sideBarData;
