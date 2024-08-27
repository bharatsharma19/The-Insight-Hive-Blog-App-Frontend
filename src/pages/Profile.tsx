import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Appbar } from "../components/Appbar";

export const Profile = () => {
    const nav = useNavigate();

    useEffect(() => {
        const name = localStorage.getItem("name");
        const token = localStorage.getItem("token");

        if (!token || !name) {
            nav("/");
        }
    }, []);

    return (
        <div className="h-screen bg-gray-100">
            <Appbar />
            <div className="flex flex-col text-center">
                <div className="flex-1 p-6">
                    <div className="max-w-md mx-auto pt-24 pb-6 bg-white rounded-lg shadow-lg">
                        <h1 className="text-4xl font-extrabold mb-6 text-gray-800">Profile Page</h1>
                        <p className="text-lg text-gray-700">Coming Soon...</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
