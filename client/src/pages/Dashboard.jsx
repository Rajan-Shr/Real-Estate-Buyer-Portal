import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PropertyCard from "../components/PropertyCard";
import {
    getAvailableProperties,
    getSavedProperties,
    addToFavourites,
    removeFromFavourites
} from "../api/propertyService";

const Dashboard = () => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    const [favourites, setFavourites] = useState([]);
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged out successfully");
        navigate("/login");
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [propData, favData] = await Promise.all([
                    getAvailableProperties(),
                    getSavedProperties()
                ]);

                if (!propData.success || !favData.success) {
                    throw new Error("Failed to fetch data");
                }

                setProperties(propData.data || []);
                setFavourites(favData.data || []);

            } catch (err) {
                const errorMessage = err.response?.data?.message || err.message;
                console.error("Error:", errorMessage);
                // toast.error("Failed to load dashboard");
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchData();
        } else {
            setLoading(false);
        }
    }, [user]);

    const handleAddFavourite = async (id) => {
        try {
            const data = await addToFavourites(id);
            if (!data.success) throw new Error(data.message);

            const selected = properties.find(p => p._id === id);

            setFavourites(prev => {
                if (prev.some(f => f._id === id)) return prev;
                return [...prev, selected];
            });

            toast.success("Added to favourites");
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message;
            console.error("Error:", errorMessage);
            toast.error(errorMessage || "Something went wrong");
        }
    };

    const handleRemoveFavourite = async (id) => {
        try {
            const data = await removeFromFavourites(id);
            if (!data.success) throw new Error(data.message);

            setFavourites(prev => prev.filter(item => item._id !== id));
            toast.success("Removed from favourites");
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message;
            console.error("Error:", errorMessage);
            toast.error(errorMessage || "Something went wrong");
        }
    };

    if (!user) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-slate-50">
                <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center">
                    <h2 className="text-xl font-semibold text-slate-800 mb-2">
                        Authentication Required
                    </h2>
                    <p className="text-sm text-slate-500 mb-6 text-center">
                        Please sign in to view your dashboard.
                    </p>
                    <Link to="/login" className="bg-slate-900 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
                        Go to Login
                    </Link>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-slate-50">
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-8 h-8 border-2 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
                    <p className="text-sm font-medium text-slate-500 animate-pulse">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

                    <h1 className="text-xl font-bold tracking-tight text-slate-900">
                        Real Estate Portal
                    </h1>

                    <div className="flex items-center gap-5">
                        <div className="flex items-center gap-3 text-right">
                            <div className="hidden sm:block">
                                <p className="text-sm font-semibold text-slate-900 leading-tight">
                                    {user.firstName} {user.lastName}
                                </p>
                                <p className="text-xs font-medium text-slate-500 capitalize mt-0.5">
                                    {user.role} Account
                                </p>
                            </div>

                            <div className="h-9 w-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-sm font-bold text-slate-700 uppercase">
                                {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                            </div>
                        </div>

                        <div className="w-px h-6 bg-slate-200"></div>

                        <button
                            onClick={handleLogout}
                            title="Logout"
                            className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer flex items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                        </button>
                    </div>

                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 mt-10 space-y-16">

                {/* Properties Section */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-slate-800 tracking-tight">
                            Available Properties
                        </h2>
                        <span className="bg-slate-200 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                            {properties.length}
                        </span>
                    </div>

                    {properties.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                            <div className="h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                            </div>
                            <p className="text-slate-500 text-sm font-medium">No properties available to view.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {properties.map((property) => (
                                <PropertyCard
                                    key={property._id}
                                    property={property}
                                    onAction={handleAddFavourite}
                                    isSaved={false}
                                />
                            ))}
                        </div>
                    )}
                </section>

                <hr className="border-slate-200" />

                {/* Favourites Section */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-slate-800 tracking-tight">
                            Saved Properties
                        </h2>
                        <span className="bg-slate-200 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                            {favourites.length}
                        </span>
                    </div>

                    {favourites.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                            <div className="h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                            </div>
                            <p className="text-slate-500 text-sm font-medium">You haven't saved any properties yet.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {favourites.map((property) => (
                                <PropertyCard
                                    key={property._id}
                                    property={property}
                                    onAction={handleRemoveFavourite}
                                    isSaved={true}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default Dashboard;