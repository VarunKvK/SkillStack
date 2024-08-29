import connectToDatabase from "@/lib/mongodb";
import { Project } from "@/models/Projects";
import { User } from "@/models/User";

export async function POST(req, res) {
    const { skills, data } = await req.json();
  
    try {
      await connectToDatabase();
      const userExists = await User.findOne({ name: data.user.name });
  
      if (!userExists) {
        console.log("Error finding the user. Either the user does not exist or the user is not authenticated");
        return Response.json({ error: "User not found." });
      }
  
      const newProject = {
        projectType: skills[0].projectInsights.projectType,
        projectPurpose: skills[0].projectInsights.purpose,
        technology: skills[0].projectInsights.technologies,
        keyChallenges: skills[0].projectInsights.challenges,
        skillsIdentified: skills[0].projectInsights.skills,
        featuresImplemented: skills[0].projectInsights.features,
        outcomes: skills[0].projectInsights.outcomes,
        learnings: skills[0].projectInsights.learnings,
      };
  
      if (userExists) {
        await Project.create({ 
          userId: userExists.id,
          project: [newProject]
        });
      }
    } catch (err) {
      console.log(err);
      return Response.json({ error: `Error connecting to the database.${err}` });
    }
    return Response.json({ message: "Successfully received your data." });
  }
  