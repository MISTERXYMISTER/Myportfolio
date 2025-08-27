"use client";
import { Card } from "@/components/Card";
import { SectionHeader } from "@/components/SectionHeader";
import bookImage from "@/assets/images/book-cover.png";
import Image from "next/image";
import { TechIcon } from "@/components/TechIcon";
import { CardHeader } from "@/components/CardHeader";
import { motion } from "framer-motion";

// Import SVG components properly with type assertions
import JavaScriptIcon from "@/assets/icons/square-js.svg";
import HTMLIcon from "@/assets/icons/html5.svg";
import CSSIcon from "@/assets/icons/css3.svg";
import ReactIcon from "@/assets/icons/react.svg";
import ChromeIcon from "@/assets/icons/chrome.svg";
import GitHubIcon from "@/assets/icons/github.svg";
import ReduxIcon from "@/assets/icons/reduxx.svg";
import FigmaIcon from "@/assets/icons/figma.svg";
import NextIcon from "@/assets/icons/Next.svg";
import TypescriptIcon from "@/assets/icons/Typescript.svg";
import TailwindIcon from "@/assets/icons/Tailwind.svg";
import { ToolboxItems } from "@/components/ToolboxItems";
import { useRef } from "react";
import EarthCanvas from "@/components/canvas/Earth";

interface ToolboxItem {
    title: string;
    iconType: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const toolboxItems = [
    {
        title: "JavaScript",
        iconType: JavaScriptIcon,
    },
    {
        title: "HTML5",
        iconType: HTMLIcon,
    },
    {
        title: "CSS3",
        iconType: CSSIcon,
    },
    {
        title: "React",
        iconType: ReactIcon,
    },
    {
        title: "GitHub",
        iconType: GitHubIcon,
    },
    {
        title: "Chrome",
        iconType: ChromeIcon,
    },
    {
        title: "Redux",
        iconType: ReduxIcon,
    },
    {
        title: "Figma",
        iconType: FigmaIcon,
    },
    {
        title: "Next",
        iconType: NextIcon,
    },
    {
        title: "Typescript",
        iconType: TypescriptIcon,
    },
    {
        title: "Tailwind",
        iconType: TailwindIcon,
    },
];

const hobbies = [
    {
        title: "Gaming",
        emoji: "🎮",
        left: "5%",
        top: "5%",
    },
    {
        title: "Reading",
        emoji: "📚",
        left: "50%",
        top: "5%"
    },
    {
        title: "Traveling",
        emoji: "✈️",
        left: "10%",
        top: "45%"
    },
    {
        title: "Editing",
        emoji: "✂️",
        left: "40%",
        top: "28%"
    },
    {
        title: "Prompt Engineering",
        emoji: "💡",
        left: "60%",
        top: "48%"
    }
]
const StarIcon = () => (
    <svg className="size-9 text-emerald-300" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 1C12 1 12 8 10 10C8 12 1 12 1 12C1 12 8 12 10 14C12 16 12 23 12 23C12 23 12 16 14 14C16 12 23 12 23 12C23 12 16 12 14 10C12 8 12 1 12 1Z" fill="currentColor" />
    </svg>
);

export const AboutSection = () => {
    const constraintRef = useRef(null);
    return (
        <div id="about" className="py-20 lg:py-28">
            <div className="container">
                <SectionHeader
                    eyebrow="About Me"
                    title="Get to know me"
                    description="Learn more about my interests and tools"
                />

                <div className="mt-20 flex flex-col gap-8">
                    <div className="grid sm:grid-cols-1 gap-8 md:grid-cols-5 md:gap-8 lg:grid-cols-3">
                        {/* My Reads Card */}
                        <Card className="h-[320px] md:col-span-2 lg:col-span-1">
                            <CardHeader
                                title="My Reads"
                                description="Explore the books shaping my perspective."
                            />
                            <div className="w-40 mx-auto mt-2 md:mt-0">
                                <Image
                                    src={bookImage}
                                    alt="Book Cover"
                                    className="rounded-lg w-full h-auto max-w-[200px] mx-auto"
                                    width={200}
                                    height={300}
                                />
                            </div>
                        </Card>

                        {/* My ToolBox Card */}
                        <Card className="h-[320px] p-0 md:col-span-3 lg:col-span-2">
                            <CardHeader
                                title="My Toolbox"
                                description="Technologies and tools I use daily."
                                className="px-6 pt-6"
                            />
                            <ToolboxItems toolboxItems={toolboxItems} className="mt-6"
                                itemsWrapperClassName="animate-move-left [animation-duration:20s]"
                            />
                            <ToolboxItems toolboxItems={toolboxItems}
                                className="mt-6"
                                itemsWrapperClassName="animate-move-right [animation-duration:20s]"
                            />
                        </Card>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:grid-cols-3">

                        {/* Hobbies Card */}
                        <Card className="h-[320px] p-0 flex flex-col col-span-3 lg:col-span-2">
                            <CardHeader
                                title="Hobbies"
                                description="A glimpse into my personal interests."
                                className="px-6 py-6"
                            />
                            <div className="relative flex-1 h-full" ref={constraintRef}>
                                {hobbies.map((hobby) => (
                                    <motion.div key={hobby.title} className="inline-flex items-center gap-2 px-6 bg-gradient-to-r from-emerald-300 to-sky-400 rounded-full py-1.5 absolute"
                                        style={{
                                            left: hobby.left,
                                            top: hobby.top
                                        }}
                                        drag
                                        dragConstraints={constraintRef}
                                    >
                                        <span className="font-medium text-gray-950">{hobby.title}</span>
                                        <span>{hobby.emoji}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </Card>

                        {/* Earth Card */}
                        <Card className="h-[320px] p-0 relative col-span-2 lg:col-span-1">

                            <EarthCanvas />

                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};