// controllers/landingPageController.js
import LandingPage from "../models/LandingPage.js";

// ✅ Get Landing Page Data
export const getLandingPage = async (req, res) => {
  try {
    const page = await LandingPage.findOne();
    if (!page) return res.status(404).json({ message: "Landing page not found" });
    res.status(200).json(page);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update Landing Page Data (Admin)
export const updateLandingPage = async (req, res) => {
  try {
    let page = await LandingPage.findOne();
    if (!page) {
      page = new LandingPage();
    }

    // Handle sliders
    if (req.files.sliders) {
      const sliders = req.files.sliders.map(file => ({ image: file.path }));
      page.sliders = sliders;
    }

    // Handle offers
    if (req.files.offers) {
      const offers = req.files.offers.map(file => ({ image: file.path }));
      page.offers = offers;
    }

    // Handle social media
    if (req.files.socialMedia) {
      const socialMedia = req.files.socialMedia.map(file => ({ image: file.path }));
      page.socialMedia = socialMedia;
    }

    await page.save();
    res.status(200).json({ message: "Landing page updated successfully", page });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Clear a specific section (sliders, offers, socialMedia)
export const clearLandingSection = async (req, res) => {
  try {
    const { section } = req.params; // section = sliders | offers | socialMedia

    // Validate section name
    if (!["sliders", "offers", "socialMedia"].includes(section)) {
      return res.status(400).json({ message: "Invalid section name" });
    }

    let page = await LandingPage.findOne();
    if (!page) {
      return res.status(404).json({ message: "Landing page not found" });
    }

    // Empty the array for that section
    page[section] = [];
    await page.save();

    res.status(200).json({ message: `${section} cleared successfully`, page });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete single image from sliders, offers, or socialMedia by index
export const deleteSingleImage = async (req, res) => {
  try {
    const { section, index } = req.params;

    // Validate section name
    if (!["sliders", "offers", "socialMedia"].includes(section)) {
      return res.status(400).json({ message: "Invalid section name" });
    }

    let page = await LandingPage.findOne();
    if (!page) return res.status(404).json({ message: "Landing page not found" });

    const idx = parseInt(index);
    if (isNaN(idx) || idx < 0 || idx >= page[section].length) {
      return res.status(400).json({ message: "Invalid index" });
    }

    // Remove the image at the given index
    page[section].splice(idx, 1);
    await page.save();

    res.status(200).json({ message: `Image removed from ${section}`, page });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
