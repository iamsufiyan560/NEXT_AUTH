"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.reponse6);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center mt-8 min-h-screen py-2">
      <h1 className="text-4xl text-white  bg-slate-500 px-4 py-4 rounded-2xl">
        Verify Your Email
      </h1>

      <h2 className="p-2 mx-auto max-w-[50%]  mt-24 bg-gray-300 rounded-lg text-black">
        {token
          ? `your token :  ${token}`
          : "You dont have any token plaese reopen the Mail"}
      </h2>

      {verified && (
        <div>
          <h2 className=" text-2xl sm:text-xl flex mt-12 ">
            You Email Is Verified Succesfully
          </h2>
          <button className="mt-12 border border-solid py-2 px-2 bg-blue-400 rounded-lg pointer hover:bg-blue-300">
            <Link href="/login">Click to go login page </Link>
          </button>
        </div>
      )}
      {error && (
        <div className=" max-w-[50%]  flex flex-col items-center justify-center">
          <h2 className="px-2 py-6 mt-16 text-2xl bg-red-400 rounded text-white ">
            UnAuthorized (Please Reopen Mail or try again in some time)
          </h2>
        </div>
      )}
    </div>
  );
}
