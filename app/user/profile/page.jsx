"use client";
import Profile from "@component/usercomponents/profile/Profile";
import { useDataContext } from "@component/context/DataProvider";
import Loader from "@component/loader/Loader";

const page = () => {
  const { appLoading } = useDataContext();

  if (appLoading) return <Loader />;
  return <Profile />;
};
export default page;
