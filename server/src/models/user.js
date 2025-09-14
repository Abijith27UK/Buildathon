const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  name: { type: String, required: true },        
  type: { type: String, required: true },       
  pic: {
    data: Buffer,                              
    contentType: String                          
  }
}, { _id: false });

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  occupation: { type: String },
  maritalStatus: { type: String, enum: ["Single", "Married", "Divorced", "Widowed"], default: "Single" },
  dependents: { type: Number, default: 0 },

  documents: [documentSchema] 
  
}, { versionKey: false, timestamps: true });

const Client = mongoose.model("Client", clientSchema);

module.exports = { Client };
