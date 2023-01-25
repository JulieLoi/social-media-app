import mongoose from "mongoose";

const AdSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        website: {
            type: String, 
            required: true,
        },
        description: {
            type: String,
            required: true,
        }
    }
);

const Advertisement = mongoose.model("Advertisement", AdSchema);

export default Advertisement;