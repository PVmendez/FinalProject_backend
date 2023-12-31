import { RiskLevelOrder } from "../interfaces/riskLevel";
import { FilteredList } from "../interfaces/vulnerabilitites";
import Project from "../models/projectModel";

const projectsController = {
  getProjects: async (req: any, res: any) => {
    try {
      const filterByDateParam = req.query.filterByDate;
      let filter = {};

      if (filterByDateParam) { filter = { scan_date: filterByDateParam } }

      const projects = await Project.find(filter);

      // Get the correct format and count risk levels
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

      // Order by risk levels
      const order: { [key: string]: number } = {
        High: 0,
        Medium: 1,
        Low: 2,
      };

      projectsData = projectsData.sort((a: any, b: any) => {
        return order[a.risk_level] - order[b.risk_level];
      });

      res.json(projectsData);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error getting the projects" });
    }
  },
  getEngines: async (req: any, res: any) => {
    try {
      const filterByDateParam = req.query.filterByDate;
      let filter = {};

      if (filterByDateParam) { filter = { scan_date: filterByDateParam } }

      const projects = await Project.find(filter);

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
  getVulnerabilities: async (req: any, res: any) => {
    try {
      // Get all projects
      const filterByDateParam = req.query.filterByDate;
      let filter = {};

      if (filterByDateParam) { filter = { scan_date: filterByDateParam } }

      const projects = await Project.find(filter);

      // Get projects vulnerabilities
      let vulnerabilityList = projects.flatMap(
        (project) => project.vulnerability_list
      );

      // Filter by same name
      const filteredList: FilteredList[] = [];

      vulnerabilityList.forEach((obj: any) => {
        const existingObjIndex = filteredList.findIndex(
          (item) => item.name === obj.name
        );
        if (existingObjIndex !== -1) {
          const total = obj.total ?? 0;
          filteredList[existingObjIndex].total += total;
        } else {
          filteredList.push({
            risk: obj.risk,
            name: obj.name,
            total: obj.total ?? 0,
          });
        }
      });

      // Order by risk levels
      const riskLevelOrder: RiskLevelOrder = {
        High: 0,
        Medium: 1,
        Low: 2,
      };

      filteredList.sort((a: any, b: any) => {
        if (
          riskLevelOrder.hasOwnProperty(a.risk) &&
          riskLevelOrder.hasOwnProperty(b.risk)
        )
          return riskLevelOrder[a.risk] - riskLevelOrder[b.risk];

        return 0;
      });

      res.json(filteredList);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error getting the vulnerabilities" });
    }
  },
  getThisWeek: async (req: any, res: any) => {
    try {
      const projects = await Project.find()
      
      const weeklyMap: Map<string, number>  = new Map([
        ["Monday",0],
        ["Tuesday",0],
        ["Wednesday",0],
        ["Thursday",0],
        ["Friday",0],
        ["Saturday",0],
        ["Sunday",0],

      ]);
    
      function getEachDayCount(results: any, weekday: string) {
        let counter = 0;
        results.forEach((results: any) => {
          if(
            (results.risk === 'High' || results.risk === 'Medium') && results.count
          ){
            counter += results.count;
          }
        });

        if (weeklyMap.has(weekday)) {
          counter += weeklyMap.get(weekday)!;
        }

        weeklyMap.set(weekday, counter);
      }

      projects.forEach((project) => {
          getEachDayCount(project.results_total, project.weekday);
        });
      
      const thisWeekData = {
        Monday: weeklyMap.get("Monday"),
        Tuesday: weeklyMap.get("Tuesday"),
        Wednesday: weeklyMap.get("Wednesday"),
        Thursday: weeklyMap.get("Thursday"),
        Friday: weeklyMap.get("Friday"),
        Saturday: weeklyMap.get("Saturday"),
        Sunday: weeklyMap.get("Sunday"),
      };

      res.status(200).json(thisWeekData);
    } catch (error) {
      console.log(error);
      res.status(500).json( { error: "Error getting the projects" });
    }
  }
};

export default projectsController;
