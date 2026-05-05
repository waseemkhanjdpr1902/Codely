import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  prompt: String,
  code: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Project ||
mongoose.model("Project", ProjectSchema);
