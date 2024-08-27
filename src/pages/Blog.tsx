import { useBlog } from "../hooks";
import { useParams, Link } from "react-router-dom";
import { FullBlog } from "../components/FullBlog";
import { Appbar } from "../components/Appbar";
import { FullBlogSkeleton } from "../components/FullBlogSkeleton";
import { NoBlogsFound } from "../components/NotFound";

export const Blog = () => {
    const { id } = useParams();
    const { blog, loading } = useBlog({ id: id || "" });

    const token = localStorage.getItem("token");

    const backToBlogsButton = (
        <Link to={token ? "/blogs" : "/"}
            className="fixed top-20 left-4 lg:left-10 text-white font-bold text-lg bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 py-2 px-4 rounded-lg shadow-lg transition-all flex items-center space-x-2 z-50"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back</span>
        </Link>
    );

    if (loading) {
        return (
            <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
                <Appbar />
                {backToBlogsButton}
                <FullBlogSkeleton />
            </div>
        );
    }

    if (!blog) {
        return (
            <div>
                <Appbar />
                <NoBlogsFound title="Blog Not Found!" desc="We couldn't find the blog you're looking for." />
            </div>
        );
    }

    return (
        <div className="relative min-h-screen">
            <Appbar />
            {backToBlogsButton}
            <div className="pt-24 px-4 lg:px-12">
                <FullBlog blog={blog} />
            </div>
        </div>
    );
};
