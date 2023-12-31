import mongoose from "mongoose";

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
    type: [
      {
        risk: String,
        count: Number,
      }
    ],
    required: true,
  },
  sast_results: {
    type: [
      {
        risk: String,
        count: Number,
      }
    ],
    required: true,
  },
  sca_results: {
    type: [
      {
        risk: String,
        count: Number,
      }
    ],
    required: true,
  },
  iac_results: {
    type: [
      {
        risk: String,
        count: Number,
      }
    ],
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
  weekday: {
    type: String,
    required: true,
  }
});

// Create "Project" model
const Project = mongoose.model("Project", projectSchema, "ProjectDetails");

export default Project;
