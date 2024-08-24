const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMIN_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req, res) {
  try {
    const { projectDescription } =await req.json();
    console.log(projectDescription);
    return Response.json({"message":"Success"})
  } catch (e) {
    console.error("Error analyzing skills:", error);
    return Response.json({
      "error":"An error occurred while analyzing skills",
    });
  }
}
