"use client";
import AdminPanel from "@component/admincomponents/AdminPanel";
import { useDataContext } from "@component/context/DataProvider";
import Loader from "@component/loader/Loader";

const page = () => {
  const { appLoading } = useDataContext();

  if (appLoading) return <Loader />;
  return <AdminPanel />;
};
export default page;
