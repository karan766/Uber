// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const userSchema = new mongoose.Schema({
//     fullname:{
//         type: String,
//         required: true,
//         minlength:[3, "First name must beat least 3 characters long"] ,

//     } ,
//     firstname:{  
//         type: String,
//         minlength:[3, "First name must beat least 3 characters long"] ,
//     },
//     lastname:{  
//         type: String,
//         minlength:[3, "Last name must beat least 3 characters long"] ,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         match: [5,
//             " Email must be at least 5 characters long"
//         ]
//     },
//     password: {
//         type: String,
//         required: true,
//         select: false,
        
//     },
//     socketId: {
//         type: String,
//     },
    
    
    
// });

// userSchema.methods.generateAuthToken = function(){
//     const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});
//     return token;
// }

// userSchema.methods.comparePassword = async function(password){
//     return await bcrypt.compare(password, this.password);
// }

// userSchema.statics.hashPassword = async function(password){
//     return await bcrypt.hash(password, 10);
// }



// const userModel = mongoose.model('User', userSchema);

// module.exports = userModel;


const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to generate auth token
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, email: this.email }, 'your_jwt_secret_key', { expiresIn: '1h' });
  return token;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
