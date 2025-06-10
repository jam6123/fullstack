const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true     // We added index for faster lookups
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  }
}, { timestamps: true })

module.exports = mongoose.model("User", userSchema)

// It is advisable that you use .lean() when querying from mongodb if you route is "GET" (app.get), it makes your database query faster.