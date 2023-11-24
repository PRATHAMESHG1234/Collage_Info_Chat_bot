const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      select: false,
    },
    username: {
      type: String,
      require: true,
      unique: true,
      trim: true,
    },
    profilePicUrl: { type: String },
    newMessagePopUp: { type: Boolean, default: true },
    unreadMessage: { type: Boolean, default: false },
    unreadNotification: { type: Boolean, default: false },
    role: { type: String, default: 'user', enum: ['user', 'root'] },
    resetToken: { type: String },
    expireToken: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model('user', UserSchema);
