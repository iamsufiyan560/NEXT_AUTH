import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/dbConfig/dbConfig";
import Projects from "@/models/projectModel";

interface Params {
  id: string;
}

// Define the type for context containing params
interface Context {
  params: Params;
}

export async function GET(request: NextResponse, context: Context) {
  const { id } = context.params;

  // Connect to the database
  await connect();

  try {
    // Find the project by ID
    const project = await Projects.findById(id);

    if (!project) {
      // If project not found, return a 404 response
      return NextResponse.json(
        {
          msg: "Project not found",
          success: false,
        },
        { status: 404 }
      );
    }

    // If project found, return it
    return NextResponse.json({
      msg: "Project retrieved successfully",
      success: true,
      project,
    });
  } catch (error: any) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      {
        msg: "Failed to fetch project",
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest, context: Context) {
  const { id } = context.params;

  // Connect to the database
  await connect();

  try {
    // Extract new project data from the request body
    const newData = await request.json();

    // Find and update the project
    const project = await Projects.findByIdAndUpdate(
      id,
      { $set: newData },
      { new: true }
    );

    if (!project) {
      return NextResponse.json(
        {
          msg: "Project not found",
          success: false,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        msg: "Project updated successfully",
        success: true,
        project,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      {
        msg: "Failed to update project",
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
