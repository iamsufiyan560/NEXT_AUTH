"use client";

import React, { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { MdOutlineArrowOutward } from "react-icons/md";
import axios from "axios";
import useGetUserProfile from "@/hooks/useGetUserProfile";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import Image from "next/image";

const Page = () => {
  const [projects, setProjects]: any = useState([]);

  const [error, setError]: any = useState(null);
  const { data, loading } = useGetUserProfile();
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  const isAdmin = data?.isAdmin;
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("/api/projects");
        setProjects(response.data.projects);
      } catch (error) {
        setError("Failed to fetch projects");
      }
    };

    fetchProjects();
  }, []);

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

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      {isAdmin && (
        <section className="relative isolate mb-16 sm:mb-12 px-4 py-4 md:px-8 pt-24">
          <div className="grid gap-6 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {projects.map((project: any) => (
              <Link
                href={`/All-projects/${project._id}`}
                key={project.id}
                className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <a target="_blank" rel="noopener noreferrer">
                  <Image
                    className="rounded-t-lg w-full h-48 object-cover"
                    src={project.imageSrc}
                    alt={project.name}
                  />
                </a>
                <div className="flex flex-wrap p-2">
                  {project.lang.split(" ").map((language: any, index: any) => (
                    <a
                      key={index}
                      className="border border-green-500 inline-flex items-center mt-2 ml-2 px-2 py-1 font-bold text-center text-emerald-600 rounded-[50px] bg-gray-700 text-[12px]"
                    >
                      {language.toUpperCase()}
                    </a>
                  ))}
                </div>
                <div className="p-5">
                  <a target="_blank" rel="noopener noreferrer">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {project.name}
                    </h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {project.description}
                  </p>
                  <div className="flex">
                    <a
                      href={project.githubLink}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-[50px] bg-gray-700"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGithub className="mr-2 text-white-500" />
                      Github
                    </a>
                    <a
                      href={project.liveLink}
                      className="inline-flex ml-4 items-center px-3 py-2 text-sm font-medium text-center text-white rounded-[50px] bg-green-700"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Project{" "}
                      <MdOutlineArrowOutward className="ml-1" size={20} />
                    </a>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {!isAdmin && (
        <div className=" ml-[30%]   flex justify-center items-center mt-[10%] text-red-700   text-3xl font-semibold     ">
          <p>Unauthorized: You are not an admin.</p>
          <p>GET OUT {countdown}...</p>
        </div>
      )}
    </>
  );
};

export default Page;
