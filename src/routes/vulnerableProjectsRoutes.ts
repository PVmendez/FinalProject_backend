import express from "express";
import VulnerableProjects from "../models/vulnerableProjectsModel";

const vulnerableProjectsRouter = express.Router();

vulnerableProjectsRouter.get("/vulnerableprojects", async (req, res) => {
  try {
    const vulnerableProjects = await VulnerableProjects.find();
    console.log(vulnerableProjects)
    res.json(vulnerableProjects);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error getting the most vulnerable projects" });
  }
});

export default vulnerableProjectsRouter;
