// ======================================
// Gemini AI Service
// ======================================


import { config } from "../config/config.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

class AIService {
  constructor() {
    this.geminiApiKey = config.geminiApiKey;
    this.modelName = "gemini-1.5-flash"; // Default model
    this.genAI = new GoogleGenerativeAI(this.geminiApiKey);
  }

  async generateText(prompt) {
    try {
      console.log(`Starting Gemini AI generation at ${new Date().toISOString()}`);
      const startTime = Date.now();

      const model = this.genAI.getGenerativeModel({ model: this.modelName });

      const result = await model.generateContent({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      });

      const endTime = Date.now();
      console.log(`Gemini AI generation completed in ${(endTime - startTime) / 1000} seconds`);

      return result.response.text();
    } catch (error) {
      console.error("Error generating text with Gemini:", error);
      return `Error: ${error.message}`;
    }
  }

  _preparePropertyData(properties, maxProperties = 3) {
    const limitedProperties = properties.slice(0, maxProperties);
    return limitedProperties.map(property => ({
      building_name: property.building_name,
      property_type: property.property_type,
      location_address: property.location_address,
      price: property.price,
      area_sqft: property.area_sqft,
      amenities: Array.isArray(property.amenities)
        ? property.amenities.slice(0, 5)
        : [],
      description: property.description
        ? property.description.substring(0, 150) + (property.description.length > 150 ? "..." : "")
        : "",
    }));
  }

  _prepareLocationData(locations, maxLocations = 5) {
    return locations.slice(0, maxLocations);
  }

  async analyzeProperties(properties, city, maxPrice, propertyCategory, propertyType) {
    const preparedProperties = this._preparePropertyData(properties);

    const prompt = `As a real estate expert, analyze these properties:

        Properties Found in ${city}:
        ${JSON.stringify(preparedProperties, null, 2)}

        INSTRUCTIONS:
        1. Focus ONLY on these properties that match:
           - Property Category: ${propertyCategory}
           - Property Type: ${propertyType}
           - Maximum Price: ${maxPrice} crores
        2. Provide a brief analysis with these sections:
           - Property Overview (basic facts about each)
           - Best Value Analysis (which offers the best value)
           - Quick Recommendations

        Keep your response concise and focused on these properties only.
        `;

    return this.generateText(prompt);
  }

  async analyzeLocationTrends(locations, city) {
    const preparedLocations = this._prepareLocationData(locations);

    const prompt = `As a real estate expert, analyze these location price trends for ${city}:

        ${JSON.stringify(preparedLocations, null, 2)}

        Please provide:
        1. A brief summary of price trends for each location
        2. Which areas are showing the highest appreciation
        3. Which areas offer the best rental yield
        4. Quick investment recommendations based on this data

        Keep your response concise (maximum 300 words).
        `;

    return this.generateText(prompt);
  }
}

export default new AIService();



