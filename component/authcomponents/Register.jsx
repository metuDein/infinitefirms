"use client";
import React from "react";

import { Label } from "@components/ui/label";
import { Input } from "@components/ui/input";
import { cn } from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import Image from "next/image";
import CountrySelect from "./components/CountrySelect";
import { useRouter } from "@node_modules/next/navigation";

export function Register() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");

    try {
      setLoading(true);
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          email,
          username,
          firstname: firstName,
          lastname: lastName,
          password,
          phoneNumber,
          country: selectedCountry,
        }),
      });
      const data = await response.json();
      console.log(data);

      if(!response.ok) {

      
        toast.error(data?.error || "An error occurred while creating your account", {
          position: "top-center",
        });
      }
      if (response.ok) {
        await fetch("/api/mails/signup", {
          method: "POST",
          body: JSON.stringify({
            email,
          }),
        });
        toast.success("Your account was successfully created. (check your email and spam folder)", {
          position: "top-center",
        });
        router.push("/user-login");
      }
       
    } catch (error) {

      console.log(error);
      
      toast.error(data.error, {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black "
      style={{}}
    >
      <div
        className="mx-auto w-full"
        style={{
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Image
          src={"/assets/logo/logo.png"}
          alt="logo"
          width={80}
          height={80}
          className="mx-auto"
        />
      </div>
      <p className="text-neutral-600 text-center font-semibold max-w-sm mt-2 dark:text-neutral-300">
        Sign up for an Infinitefirms account
      </p>
      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input
              id="firstname"
              placeholder="John"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input
              id="lastname"
              placeholder="Doe"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer>
          <Label htmlFor="phonenumber">
            Phone number <small>(include country code)</small>
          </Label>
          <Input
            id="phonenumber"
            placeholder="+1 (234)-567-890"
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="lastname">Select Country</Label>
          <CountrySelect
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            placeholder="username"
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="email@email.com"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </LabelInputContainer>

        {!loading && (
          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            sign up &rarr;
            <BottomGradient />
          </button>
        )}
        {loading && (
          <article
            className=" text-center bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            <FontAwesomeIcon
              icon={faSpinner}
              spin
              className="mx-auto text-center"
            />
            <BottomGradient />
          </article>
        )}
        <div className="mt-2 float-right text-left">
          <Link
            href={"/user-login"}
            className="text-gray-400 float-right text-left w-full"
            style={{
              textDecoration: "underline",
              color: "#3182CE",
            }}
          >
            Already registered?
            <span className="underline font-bold text-indigo-400 ml-2">
              Login to your Account
            </span>
          </Link>
        </div>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default Register;
