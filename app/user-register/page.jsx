import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import Register from "@component/authcomponents/Register";

const page = async () => {
  const session = await getServerSession();

  if (session) {
    redirect("/user/profile");
  }
  return <Register />;
};
export default page;
