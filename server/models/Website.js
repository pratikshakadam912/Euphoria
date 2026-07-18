import mongoose from "mongoose";

const websiteSchema = new mongoose.Schema(
  {
    section: {
      type: String,
      required: true,
      unique: true,
    },

    title: {
      type: String,
      default: "",
    },

    subtitle: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    banner: {
      type: String,
      default: "",
    },

    buttonOne: {
      text: {
        type: String,
        default: "",
      },
      link: {
        type: String,
        default: "",
      },
    },

    buttonTwo: {
      text: {
        type: String,
        default: "",
      },
      link: {
        type: String,
        default: "",
      },
    },

    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],

    images: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Website", websiteSchema);
