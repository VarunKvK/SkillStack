import connectToDatabase from "@/lib/mongodb";
import { Project } from "@/models/Projects";
import { Skill } from "@/models/Skills";
import { User } from "@/models/User";
import { getServerSession } from "next-auth";

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
      projectTitle: skills[0].projectInsights.projectTitle,
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
    const maxProficiency = 15;

    if (existingSkillsDoc) {
      for (let skill of skills[0].projectInsights.skills) {
        const existingSkill = existingSkillsDoc.skills.find(
          (s) => s.name === skill.name
        );
        if (existingSkill) {
          existingSkill.proficiency = Math.min(
            existingSkill.proficiency + 5,
            maxProficiency
          );
          existingSkill.proficiencyPercentage =
            (existingSkill.proficiency / maxProficiency) * 100;
        } else {
          const initialProficiency = 10;
          existingSkillsDoc.skills.push({
            name: skill.name,
            proficiency: initialProficiency,
            proficiencyPercentage: (initialProficiency / maxProficiency) * 100,
          });
        }
      }
      await existingSkillsDoc.save();
    } else {
      await Skill.create({
        userId: userExists.id,
        skills: skills[0].projectInsights.skills.map((skill) => {
          const initialProficiency = 10;
          return {
            name: skill.name,
            proficiency: initialProficiency,
            proficiencyPercentage: (initialProficiency / maxProficiency) * 100,
          };
        }),
      });
    }

    return Response.json({ message: "Data received successfully." });
  } catch (err) {
    console.log(err);
    return Response.json({ error: `Error connecting to the database.${err}` });
  }
}

export async function GET(req, res) {
  try {
    const session = await getServerSession();
    await connectToDatabase();

    const userExist = await User.findOne({ email: session.user?.email });
    if (!userExist) {
      return Response.json({ message: "User not found" });
    }
    const userProjects = await Project.findOne({ userId: userExist._id });
    if (!userProjects) {
      return Response.json({ message: "User projects not found" });
    }
    return Response.json({ message: "Success", userProjects });
  } catch (err) {
    return Response.json({ message: `The error you are facing is: ${err}` });
  }
}
