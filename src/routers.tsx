import AddAdmin from "@pages/Admins/NewAdmin";
import MembersList from "@pages/Employees/MembersList";
import ReportsList from "@pages/Reports/ReportsList";
import ListJobs from "@pages/Jobs/ListJobs";
import ArticlesList from "@pages/Articles/ArticlesList/ArticlesList";
import AddArticle from "@pages/Articles/NewArticle";
import Projects from "@pages/Projects/ListProjects";
import ListAdmins from "@pages/Admins/ListAdmins";
import AddProject from "@pages/Projects/NewProject";
import AddJobs from "@pages/Jobs/NewJob";
import AddEmployees from "@pages/Employees/NewEmployee";
import AddReports from "@pages/Reports/NewReport";
import Login from "@pages/Login";
import Layout from "@components/Layout";
import ListSector from "./pages/Sectors/ListSector";
import AddSector from "./pages/Sectors/NewSector";

const withLayout = (Component: any) => {
  return (
    <Layout>
      <Component />
    </Layout>
  );
};

export const routers = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/logout",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admins",
    element: withLayout(() => <ListAdmins />),
  },
  {
    path: "/dashboard",
    element: withLayout(() => <div></div>),
  },
  {
    path: "/projects",
    element: withLayout(() => <Projects />),
  },
  {
    path: "/projects/:id",
    element: withLayout(() => <AddProject />),
  },
  {
    path: "/projects/new",
    element: withLayout(() => <AddProject />),
  },

  {
    path: "/articles",
    element: withLayout(() => <ArticlesList />),
  },
  {
    path: "/articles/:id",
    element: withLayout(AddArticle),
  },
  {
    path: "/articles/new",
    element: withLayout(AddArticle),
  },
  {
    path: "/jobs",
    element: withLayout(ListJobs),
  },
  {
    path: "/jobs/:id",
    element: withLayout(AddJobs),
  },
  {
    path: "/jobs/new",
    element: withLayout(AddJobs),
  },
  {
    path: "/employees",
    element: withLayout(MembersList),
  },
  {
    path: "/employees/:id",
    element: withLayout(AddEmployees),
  },
  {
    path: "/employees/new",
    element: withLayout(AddEmployees),
  },
  {
    path: "/reports",
    element: withLayout(ReportsList),
  },
  {
    path: "/reports/:id",
    element: withLayout(AddReports),
  },
  {
    path: "/reports/new",
    element: withLayout(AddReports),
  },
  {
    path: "/sectors",
    element: withLayout(() => <ListSector />),
  },
  {
    path: "/sectors/new",
    element: withLayout(() => <AddSector />),
  },
  {
    path: "/sectors/:id",
    element: withLayout(() => <AddSector />),
  },
  {
    path: "/settings",
    element: withLayout(() => <div></div>),
  },
  {
    path: "/admins/new",
    element: withLayout(AddAdmin),
  },
  {
    path: "/admins/:id",
    element: withLayout(AddAdmin),
  },
];
