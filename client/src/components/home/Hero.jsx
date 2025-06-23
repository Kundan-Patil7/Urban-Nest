import React, { useRef, useEffect, useState } from "react";
import { Search, MapPin, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import heroimage from "../../assets/images/heroimage.png";

const popularLocations = ["Nashik", "Mumbai", "Pune", "Nagpur", "Amravati", "Thane"];

const Hero = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  const handleSubmit = (location = searchQuery) => {
    navigate(`/properties?location=${encodeURIComponent(location)}`);
    setShowSuggestions(false);
  };

  const handleBlur = (e) => {
    if (!searchRef.current.contains(e.relatedTarget)) {
      setShowSuggestions(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="mt-20"
    >
      <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 my-3 mx-6">
        {/* Background Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0 rounded-2xl overflow-hidden"
          style={{
            backgroundImage: `url(${heroimage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-sky-300/40 via-slate/10 to-transparent" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-12"
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                Find Your Perfect
                <br />
                <span className="text-gray-800">Living Space</span>
              </span>
            </h1>

            <p className="text-slate-700 text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
              Discover your dream home in the most sought-after locations
            </p>
          </motion.div>

          {/* Search Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative max-w-md mx-auto"
          >
            <div
              ref={searchRef}
              className="flex flex-col md:flex-row gap-4 p-2 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg"
              onBlur={handleBlur}
            >
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder="Enter location..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border-0 bg-white/90 shadow-sm focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              <button
                onClick={() => handleSubmit()}
                className="md:w-auto w-full bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 
                  transition-colors flex items-center justify-center gap-2 font-medium shadow-md"
              >
                <Search className="w-5 h-5" />
                <span>Search</span>
              </button>
            </div>

            {/* Location Suggestions */}
            <AnimatePresence>
              {showSuggestions && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-lg divide-y divide-gray-100 overflow-hidden"
                >
                  <div className="p-2">
                    <h3 className="text-xs font-medium text-gray-500 px-3 mb-2">Popular Locations</h3>
                    {popularLocations.map((location) => (
                      <button
                        key={location}
                        onClick={() => {
                          setSearchQuery(location);
                          handleSubmit(location);
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg flex items-center 
                          justify-between text-gray-700 transition-colors"
                      >
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                          <span>{location}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Hero;
