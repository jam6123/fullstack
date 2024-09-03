const mongoose = require('mongoose')

async function connectDb() {
  try {
    console.log('Connecting to mongodb...')
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Successfully connected to mongodb')
  } catch (error) {
    console.log(error.message)
    process.exit(1)
  }
}

module.exports = connectDb