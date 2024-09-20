"use client";
import { useDataContext } from "@component/context/DataProvider";
import Loader from "@component/loader/Loader";
import { redirect } from "next/navigation";
const page = () => {
  const { appLoading, currentUser } = useDataContext();
  if (appLoading) return <Loader />;

  if (currentUser && currentUser?.roles?.admin !== 5150) {
    return redirect("/user-login");
  }

  return <div>page</div>;
};
export default page;
