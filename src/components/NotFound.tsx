export const NoBlogsFound = ({ title, desc }: { title: string, desc: string }) => {
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
            <div className="text-gray-600">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 mb-4 text-red-500 ml-auto mr-auto"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11V6a1 1 0 00-2 0v1a1 1 0 00-1 1v4a1 1 0 102 0V8h1v3a1 1 0 002 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                    />
                </svg>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    {title}
                </h2>
                <p className="text-lg text-gray-500">
                    {desc}
                </p>
            </div>
        </div>
    );
};
