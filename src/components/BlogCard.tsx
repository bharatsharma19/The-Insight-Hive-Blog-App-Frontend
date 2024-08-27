import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { ConfirmationModal } from "./ConfirmationModal";

interface BlogCardProps {
    id: string;
    authorName: string;
    title: string;
    content: string;
    date: string;
    renderActions?: boolean
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    date,
    renderActions = false
}: BlogCardProps) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDelete = async () => {
        setIsModalOpen(false);
        setIsDeleting(true);

        // Define the promise for deleting the blog
        const deletePromise = axios.delete(`${import.meta.env.VITE_APP_BACKEND_URL}/api/v1/blog/delete`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            data: JSON.stringify({ postId: id })
        });

        toast.promise(
            deletePromise,
            {
                loading: "Deleting blog...",
                success: "Blog deleted successfully!",
                error: "Failed to delete blog.",
            },
            {
                style: {
                    minWidth: '250px',
                },
                success: {
                    icon: '👏',
                },
                error: {
                    icon: '❌',
                },
            }
        );

        try {
            await deletePromise;
            // Optionally, you can trigger a state update or re-fetch blogs here
            window.location.reload();
        } catch (error) {
            // Error handling already done in toast.promise
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="ml-auto mr-auto">
            <div className="p-4 border-b-2 border-slate-200 cursor-pointer w-screen max-w-screen-lg">
                <div className="flex justify-between">
                    <div className="flex items-center">
                        <Avatar name={authorName} />
                        <div className="pl-2 font-extralight text-sm">
                            {authorName}
                        </div>
                        <div className="flex items-center pl-2">
                            <Circle />
                        </div>
                        <div className="pl-2 font-thin text-slate-500 text-sm">
                            {date}
                        </div>
                    </div>
                    {renderActions &&
                        <div className="relative">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="text-red-500 hover:text-red-600 focus:outline-none"
                                aria-label="Delete Blog"
                                disabled={isDeleting}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M6 2a1 1 0 00-1 1v1H2a1 1 0 100 2h16a1 1 0 100-2h-3V3a1 1 0 00-1-1H6zM4 4h12v1H4V4zM4 6h12a1 1 0 011 1v11a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                            <div className="absolute -bottom-6 right-0 hidden group-hover:block bg-gray-800 text-white text-xs rounded-lg py-1 px-2">
                                Delete Blog
                            </div>
                        </div>
                    }
                </div>
                <Link to={`/blog/${id}`}>
                    <div className="text-xl font-semibold pt-2">
                        {title}
                    </div>
                    <div
                        className="text-md font-thin leading-relaxed"
                        dangerouslySetInnerHTML={{
                            __html: content.length > 148 ? content.slice(0, 148) + "..." : content,
                        }}
                    ></div>
                </Link>
                <div className="pt-4 flex justify-between text-center">
                    <div className="text-slate-500 text-sm">
                        {Math.ceil(content.length / 232)} Minute(s) Read
                    </div>
                    <div>
                        <Link
                            to={`/blog/${id}`}
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-full hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4 mr-2"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.293 9.293a1 1 0 011.414 0L11 10.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Read More
                        </Link>
                    </div>
                </div>
            </div>
            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleDelete}
                message={`Are you sure you want to delete blog?`}
            />
        </div>
    );
};

export function Avatar({ name, size = 6 }: { name: string; size?: number }) {
    const pixelSize = size * 4; // Tailwind size units are multiples of 4px
    const fontSize = pixelSize * 0.75; // Adjust this fraction as needed

    return (
        <div
            style={{ width: `${pixelSize}px`, height: `${pixelSize}px` }}
            className="relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full"
        >
            <span
                style={{ fontSize: `${fontSize}px` }}
                className="font-medium text-white"
            >
                {name[0].toLocaleUpperCase()}
            </span>
        </div>
    );
}

function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-400"></div>;
}
