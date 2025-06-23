import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: { 
    type: [String],
    required: true
  },
  beds: {
    type: Number,
    required: true,
  },
  baths: {
    type: Number,
    required: true,
  },
  sqft: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  availability: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amenities: {
    type: Array,
    required: true,
  },
  furnishing: {
    type: String,
    enum: ["Fully Furnished", "Semi-Furnished", "Unfurnished"],
  },
  propertyStatus: {
    type: String,
    enum: ["Under Construction", "Ready to Move", "New Launch", "Resale"],
  },
  facingDirection: {
    type: String,
    enum: ["East", "West", "North", "South", "North-East", "North-West", "South-East", "South-West"],
  },
  floorLevel: {
    type: String,
  },
  ageOfProperty: {
    type: String,
    enum: ["0-1 year", "1-5 years", "5-10 years", "10+ years"],
  },
  petFriendly: {
    type: Boolean,
    default: false,
  },
  nearbyFacilities: {
    schools: [String],
    hospitals: [String],
    stations: [String],
    malls: [String],
    others: [String]
  },
  keywords: {
    type: [String],
  },
  phone: {
    type: String,
    required: true,
  },
});

const Property = mongoose.model("Property", propertySchema);

export default Property;