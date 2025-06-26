export const updateRoleToEducator = async (req, res) => {
    try {
      const userId = req.auth?.userId; // or req.params.id / req.query.id
  
      if (!userId) {
        return res.status(400).json({ message: "A valid resource ID is required." });
      }
  
      // Clerk logic (or DB update here)
      // await clerkClient.users.updateUser(userId, { publicMetadata: { role: 'educator' } });
  
      res.status(200).json({ message: "Role updated to educator" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
    }
  };
  