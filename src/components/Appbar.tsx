import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { ConfirmationModal } from "./ConfirmationModal";

export const Appbar = () => {
    const navigate = useNavigate();
    const name = localStorage.getItem('name');
    const token = localStorage.getItem('token');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSignOut = async () => {
        // Show "Signing out..." immediately upon confirmation
        toast.loading("Signing out...", { duration: 1000, });

        try {
            // Clear localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('name');

            // Update the toast to success after a delay
            setTimeout(() => {
                // Navigate to the homepage
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
            <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
                <div className="border-b-2 border-black flex justify-between items-center px-6 py-4 lg:px-10 lg:py-5">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="font-semibold text-black text-xl">
                            The Insight Hive
                        </Link>
                    </div>

                    {/* Right section (buttons + avatar) */}
                    <div className="flex items-center space-x-6">
                        {token && name ? (
                            <>
                                <Link to="/publish">
                                    <button
                                        type="button"
                                        className="hidden sm:block text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-base px-5 py-2.5 text-center"
                                    >
                                        New
                                    </button>
                                </Link>
                                <div className="relative">
                                    <div
                                        onClick={toggleDropdown}
                                        className="cursor-pointer"
                                    >
                                        <Avatar name={name} size={9} />
                                    </div>
                                    {isDropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-1">
                                            <Link
                                                to="/profile"
                                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                            >
                                                My Profile
                                            </Link>
                                            <Link
                                                to="/blogs"
                                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                            >
                                                My Blogs
                                            </Link>
                                            <button
                                                onClick={() => setIsModalOpen(true)}
                                                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                            >
                                                Sign Out
                                            </button>
                                            <Link
                                                to="/help"
                                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                            >
                                                Help
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <Link to="/signin">
                                <button
                                    type="button"
                                    className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-base px-5 py-2.5 text-center"
                                >
                                    Sign In
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
                {/* Confirmation Modal */}
                <ConfirmationModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={handleSignOut}
                    message="Are you sure you want to sign out?"
                />
            </div>
        </div>
    );
};
