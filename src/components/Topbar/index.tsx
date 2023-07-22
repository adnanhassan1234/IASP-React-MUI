import { ILayoutProps } from "@interfaces/ILayoutProps";

const Topbar: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      {children}
    </div>
  );
};

export default Topbar;
