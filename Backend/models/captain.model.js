const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, "First name must be at least 3 characters long"],
        },
        lastname: {
            type: String,
            minlength: [3, "Last name must be at least 3 characters long"],
        },
    },

    email: {
        type: String,
        required: true,
        unique: true,
        match : [/\S+@\S+\.\S+/, "Please enter a valid email address"],
      
    },
    password: { type: String, required: true, select: false },
    socketID: { type: String },
    vehicle:{
        color:{
          type: String,
          required: true,
          minlength: [3, "Color must be at least 3 characters long"],
      
        },
        plate:{
          type: String,
          required: true,
          minlength: [3, "Plate must be at least 3 characters long"],
        },
        capacity:{
          type: Number,
          required: true,
          min: [1, "Capacity must be at least 1"],
        },
        vehicleType:{
          type: String,
          required: true,
          enum: ["car", "auto", "motorcycle"],
          
        },
       
    },
    status: { type: String, default: "active", enum: ["active", "inactive"] },
    location: {
        lat:{
            type: Number,
        },
        lng:{
            type: Number,
        }
        
    },

    });
  
    captainSchema.methods.generateAuthToken = function () {
      const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "24h"}
      );
      return token;
    };

    captainSchema.methods.comparePassword = async function (password) {
      try {
        return await bcrypt.compare(password, this.password);
      } catch (error) {
        throw new Error("Password comparison failed");
      }
    };

    captainSchema.statics.hashPassword = async function (password) {
      return await bcrypt.hash(password, 10);
    };


const CaptainModel = mongoose.model("Captain", captainSchema);

module.exports = CaptainModel;
