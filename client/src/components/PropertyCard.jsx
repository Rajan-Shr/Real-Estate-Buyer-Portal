import React from "react";

const PropertyCard = ({ property, onAction, isSaved }) => {
    return (
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col cursor-pointer">
            
            <div className="relative overflow-hidden h-52 w-full bg-slate-100">
                <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="p-5 flex flex-col">
                <div className="mb-3">
                    <h3 className="font-semibold text-slate-900" title={property.title}>
                        {property.title}
                    </h3>

                    <div className="flex items-center gap-1.5 mt-1.5 text-slate-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <p className="text-xs font-medium" title={property.location}>
                            {property.location}
                        </p>
                    </div>
                </div>

                <div className="mt-auto flex justify-between items-center pt-3 border-t border-slate-200">
                    <span className="text-slate-900 font-bold">
                        ${property.price.toLocaleString()}
                    </span>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onAction(property._id);
                        }}
                        className={`flex items-center gap-1.5 text-xs px-3 py-1.5 cursor-pointer rounded-lg font-medium transition-all duration-200 ${
                            isSaved 
                                ? "bg-red-50 text-red-600 border border-red-100 hover:bg-red-100" 
                                : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-slate-900 hover:shadow-sm"
                        }`}
                    >
                        {isSaved ? (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-red-500">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                </svg>
                                Saved
                            </>
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                </svg>
                                Save
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;