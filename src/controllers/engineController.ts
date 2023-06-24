import Project from "../models/projectModel";

const engineController = {
  getEngines: async (req: any, res: any) => {
    try {
      const projects = await Project.find();
      const engineData = projects.map((project) => {
        let sastCount = 0;
        let scaCount = 0;
        let iacCount = 0;
        
        projects.forEach((project) => {
          project.sast_results.forEach((engine) => {
            if (engine.risk === "High" || engine.risk === "Medium") {
              if (engine.count) sastCount += engine.count
            }
          })
          project.sca_results.forEach((engine) => {
            if (engine.risk === "High" || engine.risk === "Medium") {
              if (engine.count) scaCount += engine.count
            }
          })
          project.iac_results.forEach((engine) => {
            if (engine.risk === "High" || engine.risk === "Medium") {
              if (engine.count) iacCount += engine.count
            }
          })
        });
        return {
          SAST: sastCount,
          SCA: scaCount,
          IaC: iacCount,
        };
      });

      res.json(engineData);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error getting the projects" });
    }
  },
};

export default engineController;
