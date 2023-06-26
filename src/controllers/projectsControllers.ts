import Project from "../models/projectModel";

const projectsController = {
  getProjects: async (req: any, res: any) => {
    try {
      const projects = await Project.find();
      const projectsData = projects.map((project) => {
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

      res.json(projectsData);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error getting the projects" });
    }
  },

  getEngines: async (req: any, res: any) => {
    try {
      const projects = await Project.find();

      let sastCount = 0;
      let scaCount = 0;
      let iacCount = 0;

      function getEngineCount(results: any, counter: number, engine: string) {
        results.forEach((engine: any) => {
          if (
            (engine.risk === "High" || engine.risk === "Medium") &&
            engine.count
          ) {
            counter += engine.count;
          }
        });
        if (engine === "SAST") sastCount = counter;
        if (engine === "SCA") scaCount = counter;
        if (engine === "IaC") iacCount = counter;
      }
      projects.forEach((project) => {
        getEngineCount(project.sast_results, sastCount, "SAST");
        getEngineCount(project.sca_results, scaCount, "SCA");
        getEngineCount(project.iac_results, iacCount, "IaC");
      });

      const engineData = {
        SAST: sastCount,
        SCA: scaCount,
        IaC: iacCount,
      };

      res.json(engineData);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error getting the projects" });
    }
  },
};

export default projectsController;
