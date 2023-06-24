import Project from "../models/projectModel";

const projectsController = {
  getProjects: async (req: any, res: any) => {
    try {
      const projects = await Project.find();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: "Error getting the projects" });
    }
  },
};

export default projectsController;
