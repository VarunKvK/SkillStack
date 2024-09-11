import connectToDatabase from "@/lib/mongodb";
import { Skill } from "@/models/Skills";
import { User } from "@/models/User";
import { getServerSession } from "next-auth";

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMIN_API_KEY);

export async function GET(req, res) {
  try {
    const session = await getServerSession();
    await connectToDatabase();

    const userExist = await User.findOne({ email: session.user?.email });
    if (!userExist) {
      return Response.json({ message: "User not found" });
    }
    const userSkills = await Skill.findOne({ userId: userExist._id });
    if (!userSkills) {
      return Response.json({ message: "User skills not found" });
    }
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  //   const prompt = `
  //   You are an expert in understanding the JSON data or any plain text. You are also versed in extracting the data and categorizing them properly. So what I need you to do is that I want to segregate or categorize the skills from the JSON data I would give you. 
    
  //   The JSON data is 
  //   ${userSkills.skills}

  //   And in return I want the same JSON data back but in this it needs to be modified JSON with the category name too. Create a generalize category. For instance : Skills=> 'Web design', 'Ml learning','Python Developer'.These are commonly categorized as Development. So try doing it in this manner. Also create a specified category too in the same JSON data.

  //   skills: [
  //   {
  //   _id:'Integer',
  //     name: 'String',
  //     proficiency: Number,
  //     general_category:"String",
  //     specific_category:"String"
  //   }
  // ],

  //   Carefully extract the key information and return the result as a JSON array. Respond **only** with the JSON array and no other text or explanation.
  //   It should not contain the context of array and nothing else.Start with the array and end with array.
  //   `;

  //   const result = await model.generateContent(prompt);
  //   const response = await result.response;
  //   const text = response.text();

    const text = [
      {
        _id: "66d2bd9d4699e94cb482a0ef",
        name: "Website Development",
        proficiency: 10,
        general_category: "Soft Skills",
        specific_category: "Web Development",
      },
      {
        _id: "66d2bd9d4699e94cb482a0f0",
        name: "Web Design",
        proficiency: 10,
        general_category: "Development",
        specific_category: "Web Design",
      },
      {
        _id: "66d2bd9d4699e94cb482a0f1",
        name: "Theme Customization",
        proficiency: 10,
        general_category: "Development",
        specific_category: "Web Development",
      },
      {
        _id: "66d2bd9d4699e94cb482a0f2",
        name: "API Integration",
        proficiency: 10,
        general_category: "Development",
        specific_category: "Backend Development",
      },
    ];

    return Response.json({ message: "Success", text });
  } catch (e) {
    console.error("Error analyzing skills:", e);
    return Response.json({
      error: "An error occurred while analyzing skills",
    });
  }
}

export async function POST(req, res) {
  try {
    await connectToDatabase();
    const { values, user } = await req.json();
    const userExist = await User.findOne({ email: user.user.email });
    if (!userExist) {
      return Response.json({ message: "User not found" });
    }

    const userSkill=await Skill.findOne({userId:userExist._id})
    userSkill.skills.push({
      name:values.name,
      proficiency:values.proficiency
    })
    await userSkill.save()
    return Response.json({ message: "Success" });
  } catch (e) {
    console.error("Error updating skills:", e);
    return Response.json({
      error: "An error occurred while updating skills",
    });
  }
}


//Need to look into the issue of what information needs to be saved into the database to get the correct result.
