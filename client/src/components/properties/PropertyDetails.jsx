import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "motion/react";
import {
  BedDouble,
  Bath,
  Maximize,
  ArrowLeft,
  Phone,
  Calendar,
  MapPin,
  Loader,
  Building,
  Share2,
  ChevronLeft,
  ChevronRight,
  Copy,
  Compass,
  Home,
  Tag,
  CheckCircle,
  Clock,
  Sofa,
  Dog,
  School,
  Hospital,
  Train,
  ShoppingBag,
  Box
} from "lucide-react";
import ScheduleViewing from "./ScheduleViewing";
import { API_URL } from "../../api/index.js";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSchedule, setShowSchedule] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [copySuccess, setCopySuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/api/products/single/${id}`);

        if (response.data.success) {
          const propertyData = response.data.property;
          console.log("Raw property data:", propertyData);

          // Process the amenities directly here
          let processedAmenities = [];

          if (propertyData.amenities) {
            try {
              if (Array.isArray(propertyData.amenities)) {
                // If it's an array of strings, use it directly
                if (propertyData.amenities.length > 0 && typeof propertyData.amenities[0] === 'string' &&
                  !propertyData.amenities[0].includes('[')) {
                  processedAmenities = propertyData.amenities;
                }
                // If it's an array with a JSON string, parse it
                else if (propertyData.amenities.length > 0 && typeof propertyData.amenities[0] === 'string'
                  && propertyData.amenities[0].includes('[')) {
                  const cleaned = propertyData.amenities[0].replace(/'/g, '"');
                  processedAmenities = JSON.parse(cleaned);
                }
                // Special case: If amenities is an array with a single string value that looks like "Lake View,Fireplace,..."
                else if (propertyData.amenities.length === 1 && typeof propertyData.amenities[0] === 'string'
                  && propertyData.amenities[0].includes(',')) {
                  processedAmenities = propertyData.amenities[0].split(',').map(item => item.trim());
                }
              } else if (typeof propertyData.amenities === 'string') {
                // If it's a JSON string, parse it
                if (propertyData.amenities.includes('[')) {
                  processedAmenities = JSON.parse(propertyData.amenities.replace(/'/g, '"'));
                } else if (propertyData.amenities.includes(',')) {
                  // If it's a comma-separated string
                  processedAmenities = propertyData.amenities.split(',').map(item => item.trim());
                } else {
                  // Single amenity
                  processedAmenities = [propertyData.amenities];
                }
              }
            } catch (err) {
              console.error("Error processing amenities:", err, "Raw value:", propertyData.amenities);
              // Fallback: if all parsing fails, try to convert to string and split by comma
              if (propertyData.amenities.toString) {
                const amenitiesStr = propertyData.amenities.toString();
                if (amenitiesStr.includes(',')) {
                  processedAmenities = amenitiesStr.split(',').map(item => item.trim());
                } else {
                  processedAmenities = [amenitiesStr];
                }
              } else {
                processedAmenities = [];
              }
            }
          }

          console.log("Processed amenities:", processedAmenities);

          setProperty({
            ...propertyData,
            amenities: processedAmenities
          });
          setError(null);
        } else {
          setError(response.data.message || "Failed to load property details.");
        }
      } catch (err) {
        console.error("Error fetching property details:", err);
        setError("Failed to load property details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  useEffect(() => {
    // Reset scroll position and active image when component mounts
    window.scrollTo(0, 0);
    setActiveImage(0);
  }, [id]);

  const handleKeyNavigation = useCallback((e) => {
    if (e.key === 'ArrowLeft') {
      setActiveImage(prev => (prev === 0 ? property.image.length - 1 : prev - 1));
    } else if (e.key === 'ArrowRight') {
      setActiveImage(prev => (prev === property.image.length - 1 ? 0 : prev + 1));
    } else if (e.key === 'Escape' && showSchedule) {
      setShowSchedule(false);
    }
  }, [property?.image?.length, showSchedule]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyNavigation);
    return () => window.removeEventListener('keydown', handleKeyNavigation);
  }, [handleKeyNavigation]);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: property.title,
          text: `Check out this ${property.type}: ${property.title}`,
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Navigation Skeleton */}
          <div className="flex items-center justify-between mb-8">
            <div className="w-32 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="w-24 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>

          {/* Main Content Skeleton */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Image Gallery Skeleton */}
            <div className="relative h-[500px] bg-gray-200 rounded-xl mb-8 animate-pulse">
              {/* Image Navigation Buttons */}
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/50 rounded-full"></div>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/50 rounded-full"></div>

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-20 h-8 bg-black/20 rounded-full"></div>
            </div>

            {/* Content Skeleton */}
            <div className="p-8">
              {/* Title and Location */}
              <div className="flex justify-between items-start mb-6">
                <div className="space-y-3 w-full max-w-md">
                  <div className="h-10 bg-gray-200 rounded-lg w-3/4 animate-pulse"></div>
                  <div className="h-6 bg-gray-200 rounded-lg w-1/2 animate-pulse"></div>
                </div>
                <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Price Box */}
                  <div className="h-28 bg-blue-50/50 rounded-lg animate-pulse"></div>

                  {/* Features Grid */}
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-24 bg-gray-100 rounded-lg animate-pulse"></div>
                    ))}
                  </div>

                  {/* Contact */}
                  <div className="space-y-2">
                    <div className="h-7 bg-gray-200 rounded-lg w-1/3 animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded-lg w-1/2 animate-pulse"></div>
                  </div>

                  {/* Button */}
                  <div className="h-12 bg-blue-200 rounded-lg animate-pulse"></div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Description */}
                  <div className="space-y-2">
                    <div className="h-7 bg-gray-200 rounded-lg w-1/3 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded-lg w-full animate-pulse mt-2"></div>
                    <div className="h-4 bg-gray-200 rounded-lg w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded-lg w-4/5 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded-lg w-full animate-pulse"></div>
                  </div>

                  {/* Amenities */}
                  <div className="space-y-2">
                    <div className="h-7 bg-gray-200 rounded-lg w-1/3 animate-pulse"></div>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-6 bg-gray-200 rounded-lg animate-pulse"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Location Skeleton */}
          <div className="mt-8 p-6 bg-blue-50/50 rounded-xl animate-pulse">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
              <div className="h-7 bg-gray-300 rounded-lg w-1/6"></div>
            </div>
            <div className="h-5 bg-gray-300 rounded-lg w-4/5 mb-4"></div>
            <div className="h-6 bg-gray-300 rounded-lg w-1/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Link
            to="/properties"
            className="text-blue-600 hover:underline flex items-center justify-center"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 pt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <nav className="flex items-center justify-between mb-8">
          <Link
            to="/properties"
            className="inline-flex items-center text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Properties
          </Link>
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg
              hover:bg-gray-100 transition-colors relative"
          >
            {copySuccess ? (
              <span className="text-green-600">
                <Copy className="w-5 h-5" />
                Copied!
              </span>
            ) : (
              <>
                <Share2 className="w-5 h-5" />
                Share
              </>
            )}
          </button>
        </nav>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Image Gallery */}
          <div className="relative h-[500px] bg-gray-100 rounded-xl overflow-hidden mb-8">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImage}
                src={property.image[activeImage]}
                alt={`${property.title} - View ${activeImage + 1}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Image Navigation */}
            {property.image.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImage(prev =>
                    prev === 0 ? property.image.length - 1 : prev - 1
                  )}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full
                    bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setActiveImage(prev =>
                    prev === property.image.length - 1 ? 0 : prev + 1
                  )}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full
                    bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 
              bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
              {activeImage + 1} / {property.image.length}
            </div>
          </div>

          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {property.title}
                </h1>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2" />
                  {property.location}
                </div>
              </div>
              <button
                onClick={handleShare}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="bg-blue-50 rounded-lg p-6 mb-6">
                  <p className="text-3xl font-bold text-blue-600 mb-2">
                    ₹{Number(property.price).toLocaleString('en-IN')}
                  </p>
                  <p className="text-gray-600">
                    Available for {property.availability}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <BedDouble className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      {property.beds} {property.beds > 1 ? 'Beds' : 'Bed'}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <Bath className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      {property.baths} {property.baths > 1 ? 'Baths' : 'Bath'}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <Maximize className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">{property.sqft} sqft</p>
                  </div>
                </div>

                {/* Property Details */}
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h2 className="text-xl font-semibold mb-4">Property Details</h2>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-600">
                        <Home className="w-5 h-5 mr-2 text-blue-600" />
                        <span>Property Type</span>
                      </div>
                      <span className="font-medium">{property.type}</span>
                    </div>

                    {property.furnishing && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-gray-600">
                          <Sofa className="w-5 h-5 mr-2 text-blue-600" />
                          <span>Furnishing</span>
                        </div>
                        <span className="font-medium">{property.furnishing}</span>
                      </div>
                    )}

                    {property.propertyStatus && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-gray-600">
                          <CheckCircle className="w-5 h-5 mr-2 text-blue-600" />
                          <span>Status</span>
                        </div>
                        <span className="font-medium">{property.propertyStatus}</span>
                      </div>
                    )}

                    {property.facingDirection && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-gray-600">
                          <Compass className="w-5 h-5 mr-2 text-blue-600" />
                          <span>Facing</span>
                        </div>
                        <span className="font-medium">{property.facingDirection}</span>
                      </div>
                    )}

                    {property.floorLevel && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-gray-600">
                          <Building className="w-5 h-5 mr-2 text-blue-600" />
                          <span>Floor Level</span>
                        </div>
                        <span className="font-medium">{property.floorLevel}</span>
                      </div>
                    )}

                    {property.ageOfProperty && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-gray-600">
                          <Clock className="w-5 h-5 mr-2 text-blue-600" />
                          <span>Age of Property</span>
                        </div>
                        <span className="font-medium">{property.ageOfProperty}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-600">
                        <Dog className="w-5 h-5 mr-2 text-blue-600" />
                        <span>Pet Friendly</span>
                      </div>
                      <span className="font-medium">{property.petFriendly ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-4">Contact Details</h2>
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-5 h-5 mr-2" />
                    {property.phone}
                  </div>
                </div>

                <div className=" flex flex-col gap-4">
                  <button
                    onClick={() => setShowSchedule(true)}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg 
                    hover:bg-blue-700 transition-colors flex items-center 
                    justify-center gap-2"
                  >
                    <Calendar className="w-5 h-5" />
                    Schedule Viewing
                  </button>

                  {/*  */}
                  <button
                   onClick={() => window.open("http://localhost:5175", "_blank")}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Box className="w-5 h-5" />
                    {/* <Calendar className="w-5 h-5" /> */}
                    View 3D Tour
                  </button>

                </div>

              </div>

              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-4">Description</h2>
                  <p className="text-gray-600 leading-relaxed">
                    {property.description}
                  </p>
                </div>

                {/* Keywords/Tags */}
                {property.keywords && property.keywords.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">Keywords</h2>
                    <div className="flex flex-wrap gap-2">
                      {property.keywords.map((keyword, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm 
                            bg-blue-50 text-blue-700"
                        >
                          <Tag className="w-3 h-3 mr-1" />
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Amenities
                    <button
                      onClick={() => console.log("Current amenities:", property.amenities)}
                      className="ml-2 text-xs bg-gray-100 px-2 py-1 rounded text-gray-500 hover:bg-gray-200"
                    >
                      Debug
                    </button>
                  </h2>
                  {property.amenities && Array.isArray(property.amenities) && property.amenities.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4">
                      {property.amenities.map((amenity, index) => (
                        amenity && (
                          <div
                            key={index}
                            className="flex items-center text-gray-600"
                          >
                            <CheckCircle className="w-4 h-4 mr-2 text-blue-600" />
                            {amenity}
                          </div>
                        )
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No amenities listed for this property</p>
                  )}
                </div>

                {/* Nearby Facilities */}
                {property.nearbyFacilities && Object.values(property.nearbyFacilities).some(arr => arr.length > 0) && (
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">Nearby Facilities</h2>

                    {property.nearbyFacilities.schools && property.nearbyFacilities.schools.length > 0 && (
                      <div className="mb-4">
                        <h3 className="text-lg font-medium text-gray-700 mb-2 flex items-center">
                          <School className="w-5 h-5 mr-2 text-blue-600" />
                          Schools
                        </h3>
                        <ul className="list-disc list-inside pl-2 text-gray-600">
                          {property.nearbyFacilities.schools.map((school, index) => (
                            <li key={index}>{school}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {property.nearbyFacilities.hospitals && property.nearbyFacilities.hospitals.length > 0 && (
                      <div className="mb-4">
                        <h3 className="text-lg font-medium text-gray-700 mb-2 flex items-center">
                          <Hospital className="w-5 h-5 mr-2 text-blue-600" />
                          Hospitals
                        </h3>
                        <ul className="list-disc list-inside pl-2 text-gray-600">
                          {property.nearbyFacilities.hospitals.map((hospital, index) => (
                            <li key={index}>{hospital}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {property.nearbyFacilities.stations && property.nearbyFacilities.stations.length > 0 && (
                      <div className="mb-4">
                        <h3 className="text-lg font-medium text-gray-700 mb-2 flex items-center">
                          <Train className="w-5 h-5 mr-2 text-blue-600" />
                          Stations
                        </h3>
                        <ul className="list-disc list-inside pl-2 text-gray-600">
                          {property.nearbyFacilities.stations.map((station, index) => (
                            <li key={index}>{station}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {property.nearbyFacilities.malls && property.nearbyFacilities.malls.length > 0 && (
                      <div className="mb-4">
                        <h3 className="text-lg font-medium text-gray-700 mb-2 flex items-center">
                          <ShoppingBag className="w-5 h-5 mr-2 text-blue-600" />
                          Malls
                        </h3>
                        <ul className="list-disc list-inside pl-2 text-gray-600">
                          {property.nearbyFacilities.malls.map((mall, index) => (
                            <li key={index}>{mall}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {property.nearbyFacilities.others && property.nearbyFacilities.others.length > 0 && (
                      <div className="mb-4">
                        <h3 className="text-lg font-medium text-gray-700 mb-2 flex items-center">
                          <Building className="w-5 h-5 mr-2 text-blue-600" />
                          Other Facilities
                        </h3>
                        <ul className="list-disc list-inside pl-2 text-gray-600">
                          {property.nearbyFacilities.others.map((facility, index) => (
                            <li key={index}>{facility}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Add Map Location */}
        <div className="mt-8 p-6 bg-blue-50 rounded-xl">
          <div className="flex items-center gap-2 text-blue-600 mb-4">
            <Compass className="w-5 h-5" />
            <h3 className="text-lg font-semibold">Location</h3>
          </div>
          <p className="text-gray-600 mb-4">
            {property.location}
          </p>
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(property.location)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <MapPin className="w-4 h-4" />
            View on Google Maps
          </a>
        </div>

        {/* Viewing Modal */}
        <AnimatePresence>
          {showSchedule && (
            <ScheduleViewing
              propertyId={property._id}
              onClose={() => setShowSchedule(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default PropertyDetails;