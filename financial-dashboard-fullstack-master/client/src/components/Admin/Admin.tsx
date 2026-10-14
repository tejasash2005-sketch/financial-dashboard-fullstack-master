import Sidebar from "../Sidebar/Sidebar";
import AdminMain from "./AdminMain";

const Admin = () => {
  return (
    <div className="general-layout">
      <Sidebar />
      <AdminMain />
    </div>
  );
};

export default Admin;
