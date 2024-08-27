import { Appbar } from "../components/Appbar";
import { FaLinkedin, FaGithub, FaEnvelope, FaLink } from "react-icons/fa";

export const Contact = () => {
    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-300">
            <Appbar />
            <div className="flex flex-col justify-center items-center text-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="flex-1 p-6 w-full">
                    <div className="max-w-2xl mx-auto pt-12 pb-6 rounded-lg">
                        <h1 className="text-4xl font-extrabold mb-6 text-gray-800">Contact Us</h1>
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-gray-700">Get In Touch</h2>
                            <p className="text-lg text-gray-600">
                                Feel free to reach out to us via any of the platforms below. We’re always happy to connect and collaborate.
                            </p>
                        </section>
                        <section className="flex flex-col sm:flex-row justify-around items-center space-y-6 sm:space-y-0 sm:space-x-8 mt-8">
                            <a href="mailto:bharat8717sharma@gmail.com" className="flex flex-col items-center group">
                                <FaEnvelope className="text-4xl text-red-500 mb-2 transition-transform transform group-hover:scale-125 group-hover:text-red-700 group-hover:rotate-12" />
                                <span className="text-lg text-gray-600 group-hover:text-red-700">Email</span>
                            </a>
                            <a href="https://www.linkedin.com/in/bharatsharma1909/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group">
                                <FaLinkedin className="text-4xl text-blue-700 mb-2 transition-transform transform group-hover:scale-125 group-hover:text-blue-900 group-hover:rotate-12" />
                                <span className="text-lg text-gray-600 group-hover:text-blue-900">LinkedIn</span>
                            </a>
                            <a href="https://github.com/bharatsharma19/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group">
                                <FaGithub className="text-4xl text-gray-800 mb-2 transition-transform transform group-hover:scale-125 group-hover:text-black group-hover:rotate-12" />
                                <span className="text-lg text-gray-600 group-hover:text-black">GitHub</span>
                            </a>
                            <a href="https://bharatsharma.co/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group">
                                <FaLink className="text-4xl text-green-500 mb-2 transition-transform transform group-hover:scale-125 group-hover:text-green-700 group-hover:rotate-12" />
                                <span className="text-lg text-gray-600 group-hover:text-green-700">Portfolio</span>
                            </a>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};
