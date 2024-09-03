const mongoose = require('mongoose')

const revokedTokenSchema = mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  expireAt: Date,
})

// we need this to be able to add TTL to every document of this collection
revokedTokenSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 })

module.exports = mongoose.model("RevokedToken", revokedTokenSchema)
