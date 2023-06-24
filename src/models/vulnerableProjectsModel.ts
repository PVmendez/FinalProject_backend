import mongoose from "mongoose";

const Results = {
  type: String,
  count: Number,
};

// Define the project schema
const vulnerableProjectsSchema = new mongoose.Schema({
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
});

// Create "VulnerableProjects" model
const VulnerableProjects = mongoose.model("VulnearbleProjects", vulnerableProjectsSchema, "ProjectDetails");

export default VulnerableProjects;
