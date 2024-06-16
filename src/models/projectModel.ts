import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
    githubLink: {
      type: String,
      required: false,
    },
    liveLink: {
      type: String,
      required: false,
    },
    lang: {
      type: String,
      required: false,
    },
    imageSrc: {
      type: String,
      required: [true, "Please provide an image"],
    },
    id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Projects =
  mongoose.models.projects || mongoose.model("projects", projectSchema);

export default Projects;
