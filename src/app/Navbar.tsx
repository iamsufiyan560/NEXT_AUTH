import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import useGetUserProfile from "@/hooks/useGetUserProfile";

const Navbar = () => {
  const { data, loading } = useGetUserProfile();
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (data.profilePicture) {
      setImageLoading(true);
      setImageError(false);
    }
  }, [data.profilePicture]);

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex gap-4 list-none">
          {/* home  */}
          <div
            className={`${
              pathname === "/" ? "text-pink-500" : "text-white"
            } hover:bg-sky-400 rounded-md border px-2 py-1`}
          >
            <Link href="/">Home</Link>
          </div>
          {/* about  */}
          <div
            className={`${
              pathname === "/about" ? "text-blue-500" : "text-white"
            } hover:bg-sky-400 rounded-md border px-2 py-1`}
          >
            <Link href="/about">About</Link>
          </div>
        </div>
        <h1 className="font-bold text-2xl text-amber-200 hidden md:block">
          Next-Auth
        </h1>
        <div className="flex items-center gap-4">
          {data.profilePicture && (
            <>
              {imageLoading && !imageError && (
                <div className="h-12 w-12 rounded-full bg-gray-300 animate-pulse"></div>
              )}
              <Link href={"/profile"}>
                <img
                  className={`h-12 w-12 rounded-full ${
                    imageLoading ? "hidden" : "block"
                  }`}
                  src={data.profilePicture}
                  alt="Profile Picture"
                  onLoad={() => setImageLoading(false)}
                  onError={() => {
                    setImageLoading(false);
                    setImageError(true);
                  }}
                />
              </Link>
            </>
          )}
          {imageError && (
            <div className="h-12 w-12 rounded-full bg-red-500 flex items-center justify-center text-white">
              !
            </div>
          )}
          {!data.profilePicture && (
            <div className="h-12 w-12 rounded-full bg-gray-300 animate-pulse"></div>
          )}
          <button
            onClick={logout}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
