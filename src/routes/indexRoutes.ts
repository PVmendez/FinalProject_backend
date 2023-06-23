import projectsRouter from "./projectsRoutes";
import userRouter from "./userRoutes";
import vulnerableProjectsRouter from "./vulnerableProjectsRoutes";

const Routes = (app: any) => {
  app.use(projectsRouter);
  app.use(userRouter);
  app.use(vulnerableProjectsRouter)
};

export default Routes;