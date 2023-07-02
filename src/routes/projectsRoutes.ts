import express from "express";
import projectsController from "../controllers/projectsControllers";

const projectsRouter = express.Router();

projectsRouter.get("/projects", projectsController.getProjects);
projectsRouter.get("/engines", projectsController.getEngines);
projectsRouter.get("/vulnerabilities", projectsController.getVulnerabilities);
projectsRouter.get("/thisweek", projectsController.getThisWeek);

export default projectsRouter;