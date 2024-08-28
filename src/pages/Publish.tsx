import axios from "axios";
import { useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'; // Import the styles
import { Appbar } from "../components/Appbar";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from 'react-hot-toast';
import { CreatePostType } from "@bharatsharma19/mediuminputparser";

export const Publish = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [blogInputs, setBlogInputs] = useState<CreatePostType>({
        title: "",
        content: "",
    });

    // Toolbar options
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6] }],
            [{ 'font': [] }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'align': [] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            ['blockquote', 'code-block'],
            ['clean']
        ],
    };

    // Formats allowed
    const formats = [
        'header', 'font', 'size', 'align',
        'bold', 'italic', 'underline', 'strike',
        'color', 'background',
        'list', 'bullet', 'indent', 'direction',
        'link', 'blockquote', 'code-block', 'image', 'video'
    ];

    const validateInputs = () => {
        if (blogInputs.title.length < 3) {
            toast.error("Title must be at least 3 characters long.");
            return false;
        }
        if (blogInputs.content.length < 12) {
            toast.error("Content must be at least 12 characters long.");
            return false;
        }
        return true;
    };

    const publishBlog = async () => {
        if (!validateInputs()) return;

        setIsLoading(true);

        toast.promise(
            axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/api/v1/blog/add`, blogInputs, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            }),
            {
                loading: 'Publishing...',
                success: (response) => {
                    setIsLoading(false);
                    navigate(`/blog/${response.data.blog.id}`);
                    return 'Blog published successfully!';
                },
                error: () => {
                    setIsLoading(false);
                    return 'Failed to publish blog!';
                },
            }
        );
    };

    return (
        <div>
            <Toaster />
            <Appbar />
            <div className="pt-28 flex flex-col items-start mx-auto w-full sm:w-2/3 px-4">
                <div className="flex items-center mb-4 w-full">
                    <button className="border-2 border-gray-300 rounded-full p-2 mr-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="w-6 h-6 text-gray-400"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.75v14.5M19.25 12H4.75" />
                        </svg>
                    </button>
                    <input
                        type="text"
                        value={blogInputs.title}
                        placeholder="Title"
                        className="text-3xl sm:text-5xl font-serif text-gray-500 placeholder-gray-400 focus:outline-none w-full"
                        onChange={(e) => setBlogInputs({ ...blogInputs, title: e.target.value })}
                    />
                </div>
                <ReactQuill
                    value={blogInputs.content}
                    onChange={(e) => setBlogInputs({ ...blogInputs, content: e })}
                    placeholder="Tell your story..."
                    className="w-full h-72 sm:h-96 text-lg sm:text-xl font-normal text-gray-500 placeholder-gray-400 resize-none focus:outline-none"
                    modules={modules}
                    formats={formats}
                />
                <button
                    type="button"
                    onClick={publishBlog}
                    disabled={isLoading}
                    className={`mt-8 w-full sm:w-auto text-white bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-base px-5 py-2.5 text-center shadow-lg transition-all duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl ${isLoading ? 'cursor-not-allowed opacity-75' : ''}`}
                >
                    {isLoading ? (
                        <svg
                            className="animate-spin h-5 w-5 text-white mx-auto"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 0116 0 8 8 0 01-16 0z"
                            ></path>
                        </svg>
                    ) : (
                        "Publish"
                    )}
                </button>
            </div>
        </div>
    );
};
