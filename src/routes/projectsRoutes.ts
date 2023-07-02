import express from "express";
import projectsController from "../controllers/projectsControllers";
import verifyToken from "../middlewares/verifyToken";

const projectsRouter = express.Router();

projectsRouter.get("/projects", verifyToken, projectsController.getProjects);
projectsRouter.get("/engines", verifyToken, projectsController.getEngines);
projectsRouter.get("/vulnerabilities",verifyToken, projectsController.getVulnerabilities);

export default projectsRouter;