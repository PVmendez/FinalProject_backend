import projectsRouter from "./projectsRoutes";
import userRouter from "./userRoutes";

const Routes = (app: any) => {
  app.use(projectsRouter);
  app.use(userRouter);
};

export default Routes;