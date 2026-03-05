import { StaticImageData } from "next/image";
import { AVATAR } from "@/public/assets/images/image";

export interface Testimonial {
  username: string;
  designation: string;
  text: string;
  image: string | StaticImageData;
}

export const testimonials: Testimonial[] = [
  {
    username: "Ananya Roy",
    designation: "Frontend Developer",
    text:
      "StackLens AI helped me understand a massive open-source repo in minutes. The architecture breakdown is insanely helpful.",
    image: AVATAR.testiOne,
  },
  {
    username: "Rahul Mehta",
    designation: "Full-Stack Developer",
    text:
      "Instead of digging through hundreds of files, StackLens instantly explained the project structure and data flow.",
    image: AVATAR.testiEight,
  },
  {
    username: "Meera Chopra",
    designation: "Startup Founder",
    text:
      "When evaluating open-source tools for our startup, StackLens AI saved hours of manual repo exploration.",
    image: AVATAR.testiSeven,
  },
  {
    username: "Siddharth Jain",
    designation: "Software Engineer",
    text:
      "StackLens gives a clear overview of any GitHub repository. Perfect for quickly onboarding to new projects.",
    image: AVATAR.testiSix,
  },
  {
    username: "Riya Sen",
    designation: "UI Developer",
    text:
      "I used StackLens to understand a complex Next.js project. The architecture summary was incredibly clear.",
    image: AVATAR.testiFive,
  },
  {
    username: "Aditya Sharma",
    designation: "Open Source Contributor",
    text:
      "StackLens AI makes exploring unfamiliar codebases way less intimidating. It highlights key files and structure instantly.",
    image: AVATAR.testiFour,
  },
  {
    username: "Sneha Verma",
    designation: "Product Engineer",
    text:
      "Before StackLens, understanding a new repo meant hours of reading code. Now I get the full picture in minutes.",
    image: AVATAR.testiThree,
  },
  {
    username: "Karan Batra",
    designation: "Freelance Developer",
    text:
      "StackLens AI is a must-have tool when reviewing GitHub projects for clients or technical research.",
    image: AVATAR.testiTwo,
  },
  {
    username: "Tanya D’Souza",
    designation: "Tech Lead",
    text:
      "This tool makes onboarding to new repositories dramatically faster. The AI explanations are surprisingly accurate.",
    image: AVATAR.testiNine,
  },
];



export interface FAQ {
  question: string;
  answer: string;
}

export const faq: FAQ[] = [
  {
    question: "What is StackLens AI?",
    answer:
      "StackLens AI is an AI-powered tool that analyzes GitHub repositories and explains the codebase structure. It helps developers understand architecture, tech stack, key files, and project flow without manually reading thousands of lines of code.",
  },
  {
    question: "How does StackLens AI work?",
    answer:
      "Simply paste a GitHub repository URL. StackLens fetches the repository structure, analyzes the code using AI, and generates a structured explanation of the project architecture and components.",
  },
  {
    question: "Who is StackLens AI for?",
    answer:
      "StackLens AI is designed for developers, engineers, students, and open-source contributors who want to quickly understand unfamiliar codebases.",
  },
  {
    question: "Does StackLens AI modify my repository?",
    answer:
      "No. StackLens AI only reads public repository data to analyze and explain the project. It never modifies or pushes changes to your repository.",
  },
  {
    question: "Can StackLens AI analyze private repositories?",
    answer:
      "Private repository support may be available through GitHub authentication in future versions. Currently StackLens focuses on analyzing public repositories.",
  },
];