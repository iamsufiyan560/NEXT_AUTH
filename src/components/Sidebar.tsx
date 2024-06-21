"use client";

import useGetUserProfile from "@/hooks/useGetUserProfile";
import Link from "next/link";
import React, { useState } from "react";

const Sidebar = () => {
  const { data, loading } = useGetUserProfile();

  const isAdmin = data?.isAdmin;
  return (
    <>
      {isAdmin && (
        <aside className="max-h-[480px] sticky mt-8 ml-4  rounded-lg border bg-background p-4  bg-gray-50 text-black w-[170px]  md:w-[260px]">
          <div className="flex flex-col gap-5">
            <Link
              href={"/projects"}
              className="hover:bg-orange-400 border hover:text-black p-2 rounded-md"
            >
              <span>Create Project</span>
            </Link>
            <Link
              href={"/All-projects"}
              className="hover:bg-orange-400 border hover:text-black p-2 rounded-md"
            >
              <span>View All Project</span>
            </Link>
          </div>
        </aside>
      )}
    </>
  );
};

export default Sidebar;
