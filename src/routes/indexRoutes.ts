import projectsRouter from "./projectsRoutes";
import userRouter from "./userRoutes";
import engineRouter from "./engineRoutes";

const Routes = (app: any) => {
  app.use(projectsRouter);
  app.use(userRouter);
  app.use(engineRouter)
};

export default Routes;