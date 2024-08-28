import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { useUserBlogs } from "../hooks";
import { NoBlogsFound } from "../components/NotFound";
import { useNavigate } from "react-router-dom";

export const Blogs = () => {
    const nav = useNavigate();

    const { loading, blogs } = useUserBlogs();

    useEffect(() => {
        const name = localStorage.getItem("name");
        const token = localStorage.getItem("token");

        if (!token || !name) {
            nav("/");
        }
    }, []);

    if (loading) {
        return (
            <div>
                <Appbar />
                <div className="pt-4 flex flex-col justify-center h-screen">
                    {/* Skeleton for multiple blog cards */}
                    {[1, 2, 3, 4].map((_, index) => (
                        <div key={index} className="p-4 w-full max-w-screen-lg mx-auto">
                            <div className="animate-pulse flex flex-col space-y-4">
                                <div className="h-40 bg-gray-300 rounded-lg"></div>
                                <div className="space-y-2">
                                    <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                                    <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div>
            <Toaster />
            <Appbar />
            <div>
                <div className="flex flex-col justify-center pt-24 pb-6">
                    {(blogs && blogs.length > 0) ? (
                        blogs.map((blog, index) => (
                            <BlogCard
                                key={index}
                                id={blog.id}
                                authorName={blog.author.name}
                                title={blog.title}
                                content={blog.content}
                                date={new Date(blog.createdAt).toDateString()}
                                renderActions={true}
                            />
                        ))
                    ) : (
                        <NoBlogsFound title="No Blogs Found!" desc="It seems there are no blogs available at the moment." /> // Use the styled "No Blogs Found" component
                    )}
                </div>
            </div>
        </div>
    );
};
