import { Home, IndianRupee, Filter, Bed, Bath, Calendar, LampCeiling, Compass, Building, School, Hospital } from "lucide-react";
import { motion } from "motion/react";

const propertyTypes = ["House", "Apartment", "Villa", "Office"];
const availabilityTypes = ["Rent", "Buy", "Lease"];
const priceRanges = [
  { min: 0, max: 5000000, label: "Under ₹50L" },
  { min: 5000000, max: 10000000, label: "₹50L - ₹1Cr" },
  { min: 10000000, max: 20000000, label: "₹1Cr - ₹2Cr" },
  { min: 20000000, max: Number.MAX_SAFE_INTEGER, label: "Above ₹2Cr" }
];
const furnishingTypes = ["Fully Furnished", "Semi-Furnished", "Unfurnished"];
const propertyStatusTypes = ["Under Construction", "Ready to Move", "New Launch", "Resale"];
const facingDirections = ["East", "West", "North", "South", "North-East", "North-West", "South-East", "South-West"];
const ageOfPropertyRanges = ["0-1 year", "1-5 years", "5-10 years", "10+ years"];

const FilterSection = ({ filters, setFilters, onApplyFilters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleToggleChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: prev[name] === value ? "" : value
    }));
  };

  const handleBooleanChange = (name) => {
    setFilters(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const handlePriceRangeChange = (min, max) => {
    setFilters(prev => ({
      ...prev,
      priceRange: [min, max]
    }));
  };

  const handleReset = () => {
    setFilters({
      propertyType: "",
      priceRange: [0, Number.MAX_SAFE_INTEGER],
      bedrooms: "0",
      bathrooms: "0",
      availability: "",
      searchQuery: "",
      sortBy: "",
      furnishing: "",
      propertyStatus: "",
      facingDirection: "",
      ageOfProperty: "",
      petFriendly: false,
      nearbyFacilities: {
        schools: false,
        hospitals: false,
        stations: false,
        malls: false
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white p-6 rounded-xl shadow-lg overflow-y-auto max-h-[90vh] w-full max-w-md mx-auto"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-800">Filters</h2>
        </div>
        <button
          onClick={handleReset}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          Reset All
        </button>
      </div>

      <div className="space-y-8">
        {/* Property Type */}
        <div className="filter-group">
          <label className="flex items-center text-gray-700 font-medium mb-3">
            <Home className="w-5 h-5 mr-2 text-blue-600" />
            Property Type
          </label>
          <div className="grid grid-cols-2 gap-3">
            {propertyTypes.map((type) => (
              <button
                key={type}
                onClick={() => handleToggleChange("propertyType", type.toLowerCase())}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                  ${filters.propertyType === type.toLowerCase()
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        {/* <div className="filter-group">
          <label className="flex items-center text-gray-700 font-medium mb-3">
            <IndianRupee className="w-5 h-5 mr-2 text-blue-600" />
            Price Range
          </label>
          <div className="grid grid-cols-2 gap-3">
            {priceRanges.map(({ min, max, label }) => (
              <button
                key={label}
                onClick={() => handlePriceRangeChange(min, max)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                  ${filters.priceRange[0] === min && filters.priceRange[1] === max
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div> */}

        {/* Price Range */}
        <div className="filter-group">
          <label className="flex items-center text-gray-700 font-medium mb-3">
            <IndianRupee className="w-5 h-5 mr-2 text-blue-600" />
            Price Range (in ₹)
          </label>
          <div className="flex space-x-3">
            <input
              type="number"
              name="minPrice"
              value={filters.priceRange[0]}
              onChange={(e) => handlePriceRangeChange(Number(e.target.value), filters.priceRange[1])}
              className="w-full border px-3 py-2 rounded-md text-sm"
              placeholder="Min"
            />
            <input
              type="number"
              name="maxPrice"
              value={filters.priceRange[1]}
              onChange={(e) => handlePriceRangeChange(filters.priceRange[0], Number(e.target.value))}
              className="w-full border px-3 py-2 rounded-md text-sm"
              placeholder="Max"
            />
          </div>
        </div>


        {/* Availability */}
        <div className="filter-group">
          <label className="flex items-center text-gray-700 font-medium mb-3">
            <Calendar className="w-5 h-5 mr-2 text-blue-600" />
            Availability
          </label>
          <div className="grid grid-cols-3 gap-3">
            {availabilityTypes.map((type) => (
              <button
                key={type}
                onClick={() => handleToggleChange("availability", type.toLowerCase())}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                  ${filters.availability === type.toLowerCase()
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Bedrooms & Bathrooms */}
        {/* <div className="grid grid-cols-2 gap-6">
          <div className="filter-group">
            <label className="flex items-center text-gray-700 font-medium mb-3">
              <Bed className="w-5 h-5 mr-2 text-blue-600" />
              Bedrooms
            </label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, "4+"].map((num) => (
                <button
                  key={num}
                  onClick={() => handleToggleChange("bedrooms", num.toString())}
                  className={`flex-1 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                    ${filters.bedrooms === num.toString()
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"}`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label className="flex items-center text-gray-700 font-medium mb-3">
              <Bath className="w-5 h-5 mr-2 text-blue-600" />
              Bathrooms
            </label>
            <div className="flex space-x-2">
              {[1, 2, 3, "3+"].map((num) => (
                <button
                  key={num}
                  onClick={() => handleToggleChange("bathrooms", num.toString())}
                  className={`flex-1 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                    ${filters.bathrooms === num.toString()
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"}`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        </div> */}

        <div className="grid grid-cols-2 gap-6">
          <div className="filter-group">
            <label className="flex items-center text-gray-700 font-medium mb-2">
              <Bed className="w-5 h-5 mr-2 text-blue-600" />
              Bedrooms
            </label>
            <select
              name="bedrooms"
              value={filters.bedrooms}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="0">Any</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4+</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="flex items-center text-gray-700 font-medium mb-2">
              <Bath className="w-5 h-5 mr-2 text-blue-600" />
              Bathrooms
            </label>
            <select
              name="bathrooms"
              value={filters.bathrooms}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="0">Any</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3+</option>
            </select>
          </div>
        </div>


        {/* Furnishing */}
        {/* <div className="filter-group">
          <label className="flex items-center text-gray-700 font-medium mb-3">
            <LampCeiling className="w-5 h-5 mr-2 text-blue-600" />
            Furnishing
          </label>
          <div className="grid grid-cols-3 gap-3">
            {furnishingTypes.map((type) => (
              <button
                key={type}
                onClick={() => handleToggleChange("furnishing", type)}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                  ${filters.furnishing === type
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"}`}
              >
                {type.split(" ")[0]}
              </button>
            ))}
          </div>
        </div> */}

        <div className="filter-group">
          <label className="flex items-center text-gray-700 font-medium mb-2">
            <LampCeiling className="w-5 h-5 mr-2 text-blue-600" />
            Furnishing
          </label>
          <select
            name="furnishing"
            value={filters.furnishing}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Any</option>
            {furnishingTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>


        {/* Property Status */}
        {/* <div className="filter-group">
          <label className="filter-label mb-2">
            Property Status
          </label>
          <div className="grid grid-cols-2 gap-2">
            {propertyStatusTypes.map((type) => (
              <button
                key={type}
                onClick={() => handleToggleChange("propertyStatus", type)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all
                  ${filters.propertyStatus === type
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div> */}

        <div className="filter-group">
          <label className="text-gray-700 font-medium mb-2 block">Property Status</label>
          <select
            name="propertyStatus"
            value={filters.propertyStatus}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md text-sm"
          >
            <option value="">Select</option>
            {propertyStatusTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Facing Direction */}
        <div className="filter-group">
          <label className="filter-label text-gray-700 font-medium mb-2 block">
            Facing Direction
          </label>
          <div className="grid grid-cols-4 gap-2">
            {facingDirections.slice(0, 4).map((direction) => (
              <button
                key={direction}
                onClick={() => handleToggleChange("facingDirection", direction)}
                className={`px-2 py-2 rounded-lg text-xs font-medium transition-all
                  ${filters.facingDirection === direction
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              >
                {direction}
              </button>
            ))}
          </div>
        </div>

        {/* Age of Property */}
        {/* <div className="filter-group">
          <label className="filter-label mb-2">
            Age of Property
          </label>
          <div className="grid grid-cols-2 gap-2">
            {ageOfPropertyRanges.map((age) => (
              <button
                key={age}
                onClick={() => handleToggleChange("ageOfProperty", age)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all
                  ${filters.ageOfProperty === age
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              >
                {age}
              </button>
            ))}
          </div>
        </div> */}

        <div className="filter-group">
          <label className="text-gray-700 font-medium mb-2 block">Age of Property</label>
          <select
            name="ageOfProperty"
            value={filters.ageOfProperty}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md text-sm"
          >
            <option value="">Select</option>
            {ageOfPropertyRanges.map((range) => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>
        </div>


        {/* Pet Friendly */}
        <div className="filter-group">
          <label className="text-gray-700 font-medium mb-2 block">Pet Friendly</label>
          <button
            onClick={() => handleBooleanChange("petFriendly")}
            className={`flex items-center w-full px-4 py-3 rounded-lg text-sm font-medium transition-all
              ${filters.petFriendly
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
          >
            Pet Friendly
          </button>
        </div>

        {/* Nearby Facilities */}
        <div className="filter-group">
          <label className="text-gray-700 font-medium mb-2 block">
            Nearby Facilities
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleBooleanChange("nearbyFacilities.schools")}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all
                ${filters.nearbyFacilities?.schools
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
            >
              Schools
            </button>
            <button
              onClick={() => handleBooleanChange("nearbyFacilities.hospitals")}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all
                ${filters.nearbyFacilities?.hospitals
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
            >
              Hospitals
            </button>
            <button
              onClick={() => handleBooleanChange("nearbyFacilities.stations")}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all
                ${filters.nearbyFacilities?.stations
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
            >
              Stations
            </button>
            <button
              onClick={() => handleBooleanChange("nearbyFacilities.malls")}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all
                ${filters.nearbyFacilities?.malls
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
            >
              Malls
            </button>
          </div>
        </div>

        <div className="flex space-x-4 mt-8">
          <button
            onClick={() => onApplyFilters(filters)}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 
              transition-colors font-medium"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default FilterSection;