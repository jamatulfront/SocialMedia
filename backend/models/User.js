const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "first_name is required"],
      trim: true,
      text: true,
    },
    last_name: {
      type: String,
      required: [true, "last_name is required"],
      trim: true,
      text: true,
    },
    username: {
      type: String,
      trim: true,
      text: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
      unique: true,
      text: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      trim: true,
    },
    cover: {
      type: String,
      trim: true,
    },
    picture: {
      type: String,
      trim: true,
      default:
        "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0=",
    },
    gender: {
      type: String,
      trim: true,
      require: [true, "gender is required"],
    },
    bYear: { type: Number, required: [true, "birthday is required"] },
    bMonth: { type: Number, required: [true, "birthday is required"] },
    bDay: { type: Number, required: [true, "birthday is required"] },
    verified: { type: Boolean, default: false },
    friends: {
      type: Array,
      default: [],
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    requests: {
      type: Array,
      default: [],
    },
    search: [
      {
        user: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
      },
    ],
    details: {
      bio: String,
      otherName: String,
      job: String,
      workplace: String,
      highSchool: String,
      college: String,
      currentCity: String,
      hometown: String,
      relationship: {
        type: String,
        enum: ["Single", "In a relationship", "Married", "Divorced"],
      },
      instagram: String,
    },
    savedPosts: [
      {
        post: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: "Post",
          saveAt: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = new mongoose.model("User", userSchema);
