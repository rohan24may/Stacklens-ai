"use client";

import { useParams } from "next/navigation";
import AnalyzePage from "../page";

export default function ProjectPage() {
  const params = useParams();
  const id = params.id as string;

  return <AnalyzePage projectIdFromUrl={id} />;
}