import mongoose from "mongoose"

const Schema = new mongoose.Schema({
    speciesName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: [String], 
    distribution: String,
    sizeAndWeight: String,
    diet: String,
    characteristics: String,
    conservationStatus: String,
    habitatType: String,
    intrestingFacts: [String],
    taxonomy: {
        genus: String,
        family: String,
    },
    externalLinks: [String],
}, { timestamps: true });

const Lizard = mongoose.model("Lizards", Schema); // Created model using this schema
export default Lizard;