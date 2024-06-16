import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetUserProfile = () => {
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    email: "",
    username: "",
    password: "",
    profilePicture: "",
    isAdmin: "",
  });

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/users/me");
        const user = res.data.data;

        setData({
          email: user.email,
          username: user.username,
          password: user.password,
          profilePicture: user.profilePicture,
          isAdmin: user.isAdmin,
        });
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);

  return {
    loading,
    data,
    setData,
  };
};

export default useGetUserProfile;
