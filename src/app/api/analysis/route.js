const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMIN_API_KEY);

export async function POST(req, res) {
  try {
    const { projectDescription } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    You are an expert in extracting structured data. I am building a web app that visualizes professional skills. I need you to carefully analyze the project description provided by the user and extract key details as a JSON array.
    
    The example for analyzing the description. You should take care of :
    "Last summer, I worked on a mobile app for a local coffee shop. They wanted a way for customers to order ahead and skip the line. I used React Native to build the app because it works on both iPhone and Android. The trickiest part was setting up the real-time order system – I used Firebase for that. It was pretty cool to see people actually using the app to order their morning coffee! The shop owner said it increased their sales by about 15% in the first month. I also added a feature where users could earn points for free drinks, which was a hit. Learned a lot about state management and how to keep the app running smoothly even when there's a weak internet connection."

    This description is casual yet informative, and includes several elements that Gemini could potentially extract skills from:
      -Technologies used (React Native, Firebase)
      -Type of application (mobile app)
      -Purpose of the project (order-ahead system for a coffee shop)
      -Challenges faced (real-time order system)
      -Outcomes (increased sales, user adoption)
      -Additional features implemented (loyalty program)
      -Learnings (state management, offline functionality)

    In the above example the description had these informations that could be extracted so make sure the JSON has the relatable variable name for the information captured.
    It needs to be well structured.

    The JSON Structure should be like this:
      {
    "projectInsights": {
      "projectTitle":"String" or if does not exist then "None" 
      "projectType": "String",
      "purpose": "String",
      "technologies": [
        {
          "name": "String",
          "confidence": "Number"
        }
      ],
      "skills": [
        {
          "name": "String",
          "confidence": "Number"
        }
      ],
      "challenges": [
        {
          "description": "String",
          "confidence": "Number"
        }
      ],
      "features": [
        {
          "name": "String",
          "confidence": "Number"
        }
      ],
      "outcomes": [
        {
          "description": "String",
          "confidence": "Number"
        }
      ],
      "learnings": [
        {
          "description": "String",
          "confidence": "Number"
        }
      ],
      "overallConfidence": "Number"
    }
  }

  The input for the API is a string that contains the project description. The output should be a JSON object containing the extracted skills, challenges, features, outcomes, and learnings. The confidence score should be a number between 0 and 1, indicating the likelihood that the extracted information is accurate.

    The project description is as follows:
  
    ${projectDescription}
  
    Carefully extract the key information and return the result as a JSON array. Respond **only** with the JSON array and no other text or explanation.
    It should not contain the context of array and nothing else.Start with the array and end with array.
  `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    // const text = [
    //   {
    //     projectInsights: {
    //       projectTitle:"Coinup",
    //       projectType: "Website",
    //       purpose: "Rebuild website for an animal shelter",
    //       technologies: [
    //         {
    //           name: "WordPress",
    //           confidence: 1,
    //         },
    //       ],
    //       skills: [
    //         {
    //           name: "Website Development",
    //           confidence: 1,
    //         },
    //         {
    //           name: "Web Design",
    //           confidence: 1,
    //         },
    //         {
    //           name: "Theme Customization",
    //           confidence: 1,
    //         },
    //         {
    //           name: "API Integration",
    //           confidence: 1,
    //         },
    //       ],
    //       challenges: [
    //         {
    //           description: "Integrating Instagram feed",
    //           confidence: 1,
    //         },
    //       ],
    //       features: [
    //         {
    //           name: "Donation Button",
    //           confidence: 1,
    //         },
    //         {
    //           name: "Adoption Application Form",
    //           confidence: 1,
    //         },
    //         {
    //           name: "Instagram Feed Integration",
    //           confidence: 1,
    //         },
    //       ],
    //       outcomes: [
    //         {
    //           description: "30% increase in adoption inquiries",
    //           confidence: 1,
    //         },
    //         {
    //           description: "Increased donations",
    //           confidence: 1,
    //         },
    //       ],
    //       learnings: [
    //         {
    //           description: "API Integration",
    //           confidence: 1,
    //         },
    //       ],
    //       overallConfidence: 1,
    //     },
    //   },
    // ];

    return Response.json({ message: "Success", text });
  } catch (e) {
    console.error("Error analyzing skills:", e);
    return Response.json({
      error: "An error occurred while analyzing skills",
    });
  }
}

