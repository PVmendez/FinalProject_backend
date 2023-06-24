import User from "../models/userModel";

const userController = {
  getUsers: async (req: any, res: any) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Error getting the projects" });
    }
  },
};

export default userController;
