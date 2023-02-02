import Advertisement from "../models/Advertisement.js";

/* CREATE */
export const createAd = async (req, res) => {
    try {
        const { name, website, picturePath, description } = req.body;
        const newAd = new Advertisement({ name, website, picturePath, description });
        await newAd.save();
        res.status(201).json({ message: "Successfully created an advert!" });
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

/* READ */
export const getAds = async (req, res) => {
    try {
        const adverts = await Advertisement.find();
        res.status(200).json({ ads: adverts });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

