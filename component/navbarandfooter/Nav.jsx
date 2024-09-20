"use client";
import { signOut } from "next-auth/react";

const Nav = () => {
  return (
    <span onClick={() => signOut()} className="cursor-pointer">
      {" "}
      LogOut
    </span>
  );
};
export default Nav;
