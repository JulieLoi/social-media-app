import mongoose from "mongoose";

const advertisementSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        website: {
            type: String, 
            required: true,
        },
        picturePath: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        }
    }
);

const Advertisement = mongoose.model("Advertisement", advertisementSchema);

export default Advertisement;