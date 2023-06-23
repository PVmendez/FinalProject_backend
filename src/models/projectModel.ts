import mongoose from "mongoose";

const Results = {
  type: String,
  count: Number,
};

// Define the project schema
const projectSchema = new mongoose.Schema({
  project_name: {
    type: String,
    required: true,
  },
  scan_date: {
    type: String,
    required: true,
  },
  risk_level: {
    type: String,
    required: true,
  },
  results_total: {
    type: [Results],
    required: true,
  },
  sast_results: {
    type: [Results],
    required: true,
  },
  sca_results: {
    type: [Results],
    required: true,
  },
  iac_results: {
    type: [Results],
    required: true,
  },
  vulnerability_list: {
    type: [
      {
        risk: String,
        name: String,
        total: Number,
      },
    ],
    required: true,
  },
});

// Create "Project" model
const Project = mongoose.model("Project", projectSchema, "ProjectDetails");

export default Project;
