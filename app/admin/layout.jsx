import SideBar from "@component/navbarandfooter/SideBar";

const AdminLayout = ({ children }) => {
  return (
    <>
      <SideBar />
      <main className="w-full min-h-screen">{children}</main>
    </>
  );
};
export default AdminLayout;
