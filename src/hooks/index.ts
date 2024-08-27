import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";

export interface Blog {
  id: string;
  author: {
    name: string;
  };
  title: string;
  content: string;
  createdAt: Date;
}

export const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

export const useBlog = ({ id }: { id: string }) => {
  const [blog, setBlog] = useState<Blog>();
  const [loading, setLoading] = useState(true);

  const fetchBlog = useCallback(() => {
    axios
      .get(
        `${import.meta.env.VITE_APP_BACKEND_URL}/api/v1/blog/single/${id}`,
        config
      )
      .then((response) => {
        setBlog(response.data.blog);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something Went Wrong"); // Show error toast
      })
      .finally(() => {
        setLoading(false);
      });
  }, [import.meta.env.VITE_APP_BACKEND_URL]);

  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);

  return { blog, loading };
};

export const useUserBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = useCallback(() => {
    axios
      .get(`${import.meta.env.VITE_APP_BACKEND_URL}/api/v1/blog`, config)
      .then((response) => {
        setBlogs(response.data.blogs);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something Went Wrong"); // Show error toast
      })
      .finally(() => {
        setLoading(false);
      });
  }, [import.meta.env.VITE_APP_BACKEND_URL]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return { blogs, loading };
};

export const useBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = useCallback(() => {
    axios
      .get(`${import.meta.env.VITE_APP_BACKEND_URL}/api/v1/blog/bulk`, config)
      .then((response) => {
        setBlogs(response.data.blogs);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something Went Wrong"); // Show error toast
      })
      .finally(() => {
        setLoading(false);
      });
  }, [import.meta.env.VITE_APP_BACKEND_URL]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return { blogs, loading };
};
