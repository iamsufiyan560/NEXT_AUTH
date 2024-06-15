import { getDataFromToken } from "@/helpers/getDataFromToken";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const { username, email, password } = reqBody;
  const userId = await getDataFromToken(request);
  try {
    let user = await User.findById({ _id: userId });

    if (password) {
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);
      user.password = hashedPassword;
    }

    user.email = email || user.email;
    user.username = username || user.username;

    user = await user.save();
    user.password = null;

    return NextResponse.json({
      message: "Profile updated successfully",
      success: true,
      user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
