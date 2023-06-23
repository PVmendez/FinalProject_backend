import express from "express";
import Project from "../models/projectModel";

const projectsRouter = express.Router();

projectsRouter.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find();
    console.log(projects)
    res.json(projects);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error getting the projects" });
  }
});

export default projectsRouter;
