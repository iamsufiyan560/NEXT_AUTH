"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Page = () => {
  const params = useParams<{ id: string }>();

  const [projectData, setProjectData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    if (params.id) {
      axios
        .get(`/api/projects/${params.id}`)
        .then((response) => {
          const data = response.data;
          if (data.success) {
            setProjectData(data.project);
          } else {
            setError(data.msg);
          }
          setLoading(false);
        })
        .catch((error: any) => {
          setError(error);
          setLoading(false);
        });
    }
  }, [params.id]);

  if (loading) {
    return (
      <>
        <div className="flex flex-col items-center justify-center min-h-screen py-2 ml-[40%]">
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

  if (error) {
    return <div className="text-center mt-4 text-red-500">Error: {error}</div>;
  }
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setUpdate(true);
    try {
      const response = await fetch(`/api/projects/${params.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      const data = await response.json();

      toast.success(data?.msg);

      setUpdate(false);
      // Handle response if needed
    } catch (error: any) {
      toast.error(error);
    } finally {
      setUpdate(false);
    }
  };

  return (
    <>
      <Toaster />

      <div className="w-1/2 mx-auto mt-10 p-5 border rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Project Details</h1>
        {projectData && (
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700">Project Name:</label>
              <input
                type="text"
                name="name"
                value={projectData?.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700">
                Project Description:
              </label>
              <input
                type="text"
                name="description"
                value={projectData?.description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700">GitHub Link:</label>
              <input
                type="text"
                name="githubLink"
                value={projectData?.githubLink}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700">Live Link:</label>
              <input
                type="text"
                name="liveLink"
                value={projectData?.liveLink}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700">Languages:</label>
              <input
                type="text"
                name="lang"
                value={projectData?.lang}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700">Image Source:</label>
              <input
                type="text"
                name="imageSrc"
                value={projectData?.imageSrc}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={update}
              type="button"
              className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {update ? "updating.." : "Update"}
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default Page;
