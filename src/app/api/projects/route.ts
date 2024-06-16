import { connect } from "@/dbConfig/dbConfig";
import { UploadImage } from "@/lib/upload-image";
import Projects from "@/models/projectModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();

  const image = formData.get("image") as unknown as File;
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const githubLink = formData.get("githubLink") as string;
  const liveLink = formData.get("liveLink") as string;
  const lang = formData.get("lang") as string;

  const imageData: any = await UploadImage(image, "Portfolio projects");

  const newProjects = new Projects({
    name,
    description,
    githubLink,
    liveLink,
    lang,
    imageSrc: imageData?.secure_url,
    id: imageData?.public_id,
  });

  const savedProjects = await newProjects.save();

  return NextResponse.json({
    msg: "Project created successfully",
    success: true,
    savedProjects,
  });
};

export const GET = async () => {
  try {
    const projects = await Projects.find();
    return NextResponse.json({
      msg: "Projects retrieved successfully",
      success: true,
      projects,
    });
  } catch (error: any) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({
      msg: "Failed to fetch projects",
      success: false,
      error: error.message,
    });
  }
};
