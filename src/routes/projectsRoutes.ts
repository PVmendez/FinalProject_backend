import express from "express";
import projectsController from "../controllers/projectsControllers";
import verifyToken from "../middlewares/verifyToken";

const projectsRouter = express.Router();


projectsRouter.get("/projects", projectsController.getProjects);
projectsRouter.get("/engines", projectsController.getEngines);
projectsRouter.get("/vulnerabilities", projectsController.getVulnerabilities);
projectsRouter.get("/thisweek", projectsController.getThisWeek);

export default projectsRouter;