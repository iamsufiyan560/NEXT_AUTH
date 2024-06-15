"use client";
import useGetUserProfile from "@/hooks/useGetUserProfile";
import axios from "axios";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ProfilePage() {
  const { data, loading, setData } = useGetUserProfile();
  const [updating, setupdating] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setupdating(true);
    try {
      const res = await axios.post("/api/users/update", data);
      toast.success("Profile Update successful");
      data.password = "";
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setupdating(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div>
        <Toaster />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p className="text-3xl sm:text-2xl font-bold mb-8">Profile page</p>

          <form
            onSubmit={handleSubmit}
            className="flex    flex-col gap-4 sm:w-2/3  lg:w-1/4 md:w-2/4  px-4 py-8 rounded-xl border-2  "
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={data.username}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              disabled={updating}
            >
              {updating ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </>
      )}
      <hr />
    </div>
  );
}
