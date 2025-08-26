// models/LandingPage.js
import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  image: { type: String, required: true }, // URL or path
  link: { type: String, default: "" },     // optional for clickable images
  title: { type: String, default: "" },    // optional caption
}, { _id: false });

const landingPageSchema = new mongoose.Schema({
  sliders: [imageSchema],  // Sliding images array
  offers: [imageSchema],   // Offer images array
  socialMedia: [imageSchema], // Social media icons/images
}, { timestamps: true });

export default mongoose.model("LandingPage", landingPageSchema);