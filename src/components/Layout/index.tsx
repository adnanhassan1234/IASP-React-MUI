import { ReactNode } from "react";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#F2F2F2",
        padding: "0 0 0 242px",
      }}
    >
      <Sidebar />
      <Topbar>{children}</Topbar>
    </div>
  );
};

export default Layout;
