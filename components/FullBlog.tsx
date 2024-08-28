import { Blog } from "../hooks";
import { Avatar } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: Blog }) => {
    return (
        <div className="flex justify-center pt-12 pb-12 px-4 lg:px-0">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full max-w-screen-xl">
                {/* Blog Content */}
                <div className="lg:col-span-8">
                    <div className="text-4xl lg:text-5xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 pt-2 pl-1">
                        Posted on {new Date(blog.createdAt).toDateString()}
                    </div>
                    <div
                        className="pt-4 pl-1 text-base lg:text-lg leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                </div>

                {/* Author Section */}
                <div className="lg:col-span-4 lg:sticky">
                    <div className="lg:px-12 lg:fixed">
                        <div className="text-black text-lg font-medium">
                            Author
                        </div>
                        <div className="flex items-center space-x-4 pt-4">
                            <div>
                                {/* Avatar */}
                                <Avatar name={blog.author.name} size={12} /> {/* Adjust size accordingly */}
                            </div>
                            <div>
                                {/* Author Name */}
                                <div className="text-xl font-bold text-black">
                                    {blog.author.name}
                                </div>
                                {/* Description */}
                                <p className="text-sm text-gray-500 pt-2 leading-snug">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
