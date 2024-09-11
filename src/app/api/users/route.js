import connectToDatabase from "@/lib/mongodb";
import { User } from "@/models/User";

export async function POST(req, res) {
  try {
    await connectToDatabase();
    const { name, email, image } = await req.json();

    //Need to check if user exists
    let user = await User.findOne({ email });

    if (user) {
      return Response.json({
        message: "User already exists in the database",
        user,
      });
    } else {
      user = await User.create({
        name,
        email,
        image,
        subscriptionLevel: "free",
      });
      return Response.json({
        message: "User created successfully",
        user,
      });
    }
  } catch (error) {
    return Response.json("You have an error:", error);
  }
}
