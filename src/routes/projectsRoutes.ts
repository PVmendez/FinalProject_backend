import express from "express";
import Project from "../models/projectModel";

const projectsRouter = express.Router();

projectsRouter.get("/projects", async (req, res) => {
  let highCount = 0;
  let mediumCount = 0;

  try {
    const projects = await Project.find();
    const projectsData = projects.map((project) => {
      return {
        project_name: project.project_name,
        risk_level: project.risk_level,
        date: project.scan_date,
      }
    })

    projects.forEach((obj) => {
      obj.vulnerability_list.forEach((vulnerability) => {
        if (vulnerability.risk === "High" && vulnerability.total !== undefined) {
          highCount += vulnerability.total;
        } else if (vulnerability.risk === "Medium" && vulnerability.total !== undefined) {
          mediumCount += vulnerability.total;
        }
      });
    });
    
    const levels = {
      high: highCount,
      medium: mediumCount
    };

    const results = {
      project: projectsData,
      levels: levels,
    }

    console.log(results)

    res.json(results);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error getting the projects" });
  }
});

export default projectsRouter;
