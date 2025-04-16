import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const DATA_DIR = path.join(process.cwd(), "data");
const FILE_PATH = path.join(
  DATA_DIR,
  "/app/dashboard/second-card/data/observations.json"
);

interface Observation {
  id: string;
  timestamp: string;
  [key: string]: any;
}

function initializeDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, JSON.stringify([], null, 2));
  }
}

export async function POST(req: Request) {
  initializeDataFile();

  try {
    const data = await req.json();
    const newObservation: Observation = {
      id: uuidv4(),
      ...data,
      timestamp: new Date().toISOString(),
    };

    let existingData: Observation[] = [];
    try {
      existingData = JSON.parse(fs.readFileSync(FILE_PATH, "utf-8"));
    } catch (error) {
      console.error("Error reading existing data:", error);
      existingData = [];
    }

    existingData.push(newObservation);
    fs.writeFileSync(FILE_PATH, JSON.stringify(existingData, null, 2));

    return NextResponse.json(
      { success: true, data: newObservation },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving observation:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save observation" },
      { status: 500 }
    );
  }
}
