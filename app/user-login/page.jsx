import Login from "@component/authcomponents/Login";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession();

  if (session) {
    redirect("/user/profile");
  }

  return <Login />;
};
export default page;
