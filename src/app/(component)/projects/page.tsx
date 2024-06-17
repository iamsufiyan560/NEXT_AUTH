"use client";

import useGetUserProfile from "@/hooks/useGetUserProfile";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const { data, loading } = useGetUserProfile();
  const router = useRouter();

  const isAdmin = data?.isAdmin;

  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [lang, setLang] = useState("");
  const [countdown, setCountdown] = useState(5);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!image) {
        return;
      }
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("githubLink", githubLink);
      formData.append("liveLink", liveLink);
      formData.append("lang", lang);

      const response = await axios.post("/api/projects", formData);
      const data = await response.data;

      toast.success("Created Succesfully");

      console.log({ data });
    } catch (error: any) {
      toast.error("Error ");
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isAdmin) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 1) {
            clearInterval(timer);
            router.push("/");
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isAdmin, router]);

  if (loading) {
    return (
      <>
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <div className="lds-spinner ">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {isAdmin ? (
        <form onSubmit={onSubmitHandler} className="w-1/2 mx-auto py-10">
          <input
            onChange={onChangeHandler}
            type="file"
            name="image"
            id="image"
          />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-4"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-4"
          ></textarea>
          <input
            type="url"
            placeholder="Github Link"
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
            className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-4"
          />
          <input
            type="url"
            placeholder="Live Link"
            value={liveLink}
            onChange={(e) => setLiveLink(e.target.value)}
            className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-4"
          />
          <input
            type="text"
            placeholder="Language"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-4"
          />
          <button className="bg-black text-white px-4 py-2 mt-4">Upload</button>
        </form>
      ) : (
        <div className=" flex justify-center items-center mt-[10%] text-red-700 text-3xl font-semibold ">
          <p>Unauthorized: You are not an admin.</p>
          <p>GET OUT {countdown}...</p>
        </div>
      )}
    </>
  );
};

export default Page;