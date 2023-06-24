import Project from "../models/projectModel";

const projectsController = {
  getProjects: async (req: any, res: any) => {
    try {
      const projects = await Project.find();
      let projectsData = projects.map((project) => {
        let highCount = 0;
        let mediumCount = 0;

        project.vulnerability_list.forEach((vulnerability) => {
          if (vulnerability.risk === "High") {
            if (vulnerability.total) highCount += vulnerability.total;
          } else if (vulnerability.risk === "Medium") {
            if (vulnerability.total) mediumCount += vulnerability.total;
          }
        });

        return {
          project_name: project.project_name,
          risk_level: project.risk_level,
          date: project.scan_date,
          levels: { high: highCount, medium: mediumCount },
        };
      });

      const order: { [key: string]: number } = {
        High: 0,
        Medium: 1,
        Low: 2
      };
      
      projectsData = projectsData.sort((a: any, b: any) => {
        return order[a.risk_level] - order[b.risk_level];
      });

      console.log(projectsData);

      res.json(projectsData);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error getting the projects" });
    }
  },
};

export default projectsController;
