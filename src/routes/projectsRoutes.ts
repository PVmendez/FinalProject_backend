import express from "express";
import Project from "../models/projectModel";

const projectsRouter = express.Router();

projectsRouter.get("/projects", async (req, res) => {

  try {
    const projects = await Project.find();

    const projectsData = projects.map((project) => {

      let highCount = 0;
      let mediumCount = 0;

      project.vulnerability_list.forEach((vulnerability) => {
        if (vulnerability.risk === "High") {
          if (vulnerability.total) {
            highCount += vulnerability.total;
          }
        } else if (vulnerability.risk === "Medium") {
          if (vulnerability.total) {
            mediumCount += vulnerability.total;
          }
        }
      });
    
      return {
        project_name: project.project_name,
        risk_level: project.risk_level,
        date: project.scan_date,
        levels: { high: highCount, medium: mediumCount },
      };
    });

    console.log(projectsData);

    res.json(projectsData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error getting the projects" });
  }
});

export default projectsRouter;
