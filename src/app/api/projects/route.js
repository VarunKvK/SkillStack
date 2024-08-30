import connectToDatabase from "@/lib/mongodb";
import { Project } from "@/models/Projects";
import { Skill } from "@/models/Skills";
import { User } from "@/models/User";

export async function POST(req, res) {
  const { skills, data } = await req.json();

  try {
    await connectToDatabase();
    const userExists = await User.findOne({ name: data.user.name });

    if (!userExists) {
      console.log(
        "Error finding the user. Either the user does not exist or the user is not authenticated"
      );
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

    const userProject = await Project.findOne({ userId: userExists.id });
    if (!userProject) {
      await Project.create({
        userId: userExists.id,
        project: [newProject],
      });
    } else {
      userProject.project.push(newProject);
      await userProject.save();
    }

    // Handle skills
    const existingSkillsDoc = await Skill.findOne({ userId: userExists.id });

    if (existingSkillsDoc) {
      for (let skill of skills[0].projectInsights.skills) {
        const existingSkill = existingSkillsDoc.skills.find(
          (s) => s.name === skill.name
        );
        if (existingSkill) {
          existingSkill.proficiency += 5; // Increment proficiency
        } else {
          existingSkillsDoc.skills.push({
            name: skill.name,
            proficiency: 10,
          });
        }
      }
      await existingSkillsDoc.save();
    } else {
      await Skill.create({
        userId: userExists.id,
        skills: skills[0].projectInsights.skills.map((skill) => ({
          name: skill.name,
          proficiency: 10,
        })),
      });
    }

    return Response.json({ message: "Data received successfully." });
  } catch (err) {
    console.log(err);
    return Response.json({ error: `Error connecting to the database.${err}` });
  }
}
