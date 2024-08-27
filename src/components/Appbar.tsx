import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { ConfirmationModal } from "./ConfirmationModal";
import { FiChevronDown, FiHome, FiUser, FiBook, FiMail, FiLogOut } from "react-icons/fi"; // React Icons
import { FaBlog } from "react-icons/fa6";

export const Appbar = () => {
    const navigate = useNavigate();

    const name = localStorage.getItem('name');
    const token = localStorage.getItem('token');

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSignOut = async () => {
        toast.loading("Signing out...", { duration: 1000 });

        try {
            localStorage.removeItem('token');
            localStorage.removeItem('name');

            setTimeout(() => {
                navigate('/');
                toast.success('Successfully signed out!');
            }, 1200);
        } catch (error) {
            toast.error("An error occurred while signing out.");
        } finally {
            setIsModalOpen(false);
        }
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div>
            <Toaster />
            <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-lg">
                <div className="border-b-2 border-black flex justify-between items-center px-6 py-4 lg:px-10 lg:py-5">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/">
                            <img src="/favicon.ico" alt="Logo" className="h-12 w-16 mr-3" />
                        </Link>
                        <Link to="/" className="font-semibold text-black text-2xl transition-colors hover:text-gray-700">
                            The Insight Hive
                        </Link>
                    </div>

                    {/* Right section (buttons + avatar) */}
                    <div className="flex items-center space-x-4 lg:space-x-6">
                        {token && name ? (
                            <>
                                <Link to="/publish">
                                    <button
                                        type="button"
                                        className="flex justify-center items-center text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-base px-5 py-2.5 transition-all duration-300 ease-in-out"
                                    >
                                        <FaBlog className="pr-2 w-6 h-6" />
                                        New
                                    </button>
                                </Link>
                                <div className="relative">
                                    <div
                                        onClick={toggleDropdown}
                                        className="cursor-pointer flex items-center"
                                    >
                                        <Avatar name={name} size={9} />
                                        <FiChevronDown className="ml-2 text-gray-700" />
                                    </div>
                                    {isDropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2 transition-all duration-300 ease-in-out">
                                            <Link
                                                to="/"
                                                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-black transition-colors"
                                            >
                                                <FiHome className="mr-2" /> Home
                                            </Link>
                                            <Link
                                                to="/profile"
                                                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-black transition-colors"
                                            >
                                                <FiUser className="mr-2" /> My Profile
                                            </Link>
                                            <Link
                                                to="/blogs"
                                                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-black transition-colors"
                                            >
                                                <FiBook className="mr-2" /> My Blogs
                                            </Link>
                                            <Link
                                                to="/contact"
                                                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-black transition-colors"
                                            >
                                                <FiMail className="mr-2" /> Contact Us
                                            </Link>
                                            <button
                                                onClick={() => setIsModalOpen(true)}
                                                className="w-full text-left flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-black transition-colors"
                                            >
                                                <FiLogOut className="mr-2" /> Sign Out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Link to="/signin">
                                    <button
                                        type="button"
                                        className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-base px-5 py-2.5 transition-all duration-300 ease-in-out"
                                    >
                                        Sign In
                                    </button>
                                </Link>
                                <Link to="/contact">
                                    <button
                                        type="button"
                                        className="text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-base px-5 py-2.5 transition-all duration-300 ease-in-out"
                                    >
                                        Contact Us
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
                {/* Confirmation Modal */}
                <ConfirmationModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={handleSignOut}
                    message="Are you sure you want to Sign Out?"
                />
            </div>
        </div>
    );
};
