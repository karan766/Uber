// const mongoose = require("mongoose");

// const blacklistTokenSchema = new mongoose.Schema({
//   token: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//     expires: 86400,
//   },
 
// });

// module.exports = mongoose.model("BlacklistToken", blacklistTokenSchema);
const mongoose = require("mongoose");

const blacklistTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true, // Prevents duplicates
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index: { expires: 86400 }, // Correct way to set TTL (1 day)
    },
  }
);



module.exports = mongoose.model("BlacklistToken", blacklistTokenSchema);
