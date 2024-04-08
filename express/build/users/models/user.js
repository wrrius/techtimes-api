const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Role = require("../models/role");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Role,
      default: Role.Writer,
      required: true,
    },
    imageUrl: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      required: true,
    },
    // i just copied this from the old model, we should change it bc who tf is that guy
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

mongoose.deleteModel("User");
module.exports = mongoose.model("User", userSchema);
