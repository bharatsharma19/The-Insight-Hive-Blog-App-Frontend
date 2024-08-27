export const FullBlogSkeleton = () => {
    return (
        <div className="flex justify-center pt-12 pb-12 px-4 lg:px-0">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full max-w-screen-xl">
                {/* Blog Content Skeleton */}
                <div className="lg:col-span-8">
                    <div className="h-12 lg:h-16 bg-gray-300 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded mt-4 w-1/4 animate-pulse"></div>
                    <div className="h-40 bg-gray-200 rounded mt-4 animate-pulse"></div>
                </div>

                {/* Author Section Skeleton */}
                <div className="lg:col-span-4">
                    <div className="lg:px-12">
                        <div className="h-6 bg-gray-300 rounded animate-pulse"></div>
                        <div className="flex items-center space-x-4 pt-4">
                            <div className="rounded-full bg-gray-300 h-12 w-12 animate-pulse"></div>
                            <div className="flex-1">
                                <div className="h-6 bg-gray-300 rounded animate-pulse w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded mt-2 animate-pulse w-full"></div>
                                <div className="h-4 bg-gray-200 rounded mt-2 animate-pulse w-5/6"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
