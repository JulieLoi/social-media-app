import Advertisement from "../models/Advertisement.js";

/* CREATE */
export const createAd = async (req, res) => {
    try {
        
        const { name, website, picturePath, description } = req.body;

        // Creates New Advert
        const newAd = new Advertisement({
            name, website, picturePath, description
        })

        // Returns newly created advert
        const advert = await newAd.save();
        res.status(201).json(advert);

    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

/* READ */
export const getAds = async (req, res) => {
    try {
        const adverts = await Advertisement.find();

        res.status(200).json(adverts);

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

