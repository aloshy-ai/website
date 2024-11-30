"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const BeatLoader = () => {
  return (
    <div className="flex space-x-1">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="w-2 h-2 rounded-full bg-primary"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: index * 0.25,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export const ExpertiseTypewriter = () => {
  const [currentNiche, setCurrentNiche] = useState("frontend");
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const technologies = useMemo(
    () => [
      "React.js",
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "Node.js",
      "Framer Motion",
      "ShadcnUI",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "GraphQL",
      "REST APIs",
      "AWS",
      "Vercel",
      "Docker",
      "Jest",
      "Playwright",
      "Git",
      "CI/CD",
      "Agile",
    ],
    [],
  );

  const techColors = useMemo(() => {
    return technologies.reduce<Record<string, string>>((acc, tech) => {
      const hue = Math.floor(Math.random() * 360);
      const saturation = 60 + Math.random() * 20;
      const lightness = 45 + Math.random() * 10;
      const alpha = 0.3;
      acc[tech.toLowerCase()] =
        `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
      return acc;
    }, {});
  }, [technologies]);

  const expertiseContent = {
    frontend:
      "Specialized in building modern web applications using React.js and Next.js, with a focus on performance and user experience. Proficient in creating responsive designs using TailwindCSS and adding smooth animations with Framer Motion.",
    backend:
      "Experienced in developing robust backend systems using Node.js and various databases like PostgreSQL and MongoDB. Skilled in implementing RESTful APIs and GraphQL endpoints with proper security measures.",
    development:
      "Committed to writing clean, maintainable code following best practices. Experienced with test-driven development using Jest and Playwright, and implementing CI/CD pipelines for automated deployments.",
  };

  const highlightText = (text: string) => {
    let highlightedText = text;
    const matches: Array<{
      text: string;
      index: number;
      length: number;
      color: string;
    }> = [];

    technologies.forEach((tech) => {
      const regex = new RegExp(`(${tech})`, "gi");
      let match;
      while ((match = regex.exec(text)) !== null) {
        matches.push({
          text: match[0],
          index: match.index,
          length: match[0].length,
          color: techColors[tech.toLowerCase()],
        });
      }
    });

    matches.sort((a, b) => b.index - a.index);

    matches.forEach((match) => {
      const before = highlightedText.slice(0, match.index);
      const after = highlightedText.slice(match.index + match.length);
      highlightedText =
        before +
        `<span style="background-color: ${match.color}; border-radius: 0.2em; padding: 0.1em 0.3em; font-weight: 500; text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);">${match.text}</span>` +
        after;
    });

    return highlightedText;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const text =
      expertiseContent[currentNiche as keyof typeof expertiseContent];
    let timeoutId: NodeJS.Timeout;

    if (isTyping && currentIndex < text.length) {
      const randomDelay = Math.random() * 40 + 60;
      const currentChar = text[currentIndex];
      const extraDelay = [".", ",", "!", "?"].includes(currentChar)
        ? 400
        : [" "].includes(currentChar)
          ? 200
          : 0;

      timeoutId = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, randomDelay + extraDelay);
    } else if (isTyping && currentIndex >= text.length) {
      timeoutId = setTimeout(() => {
        const niches = Object.keys(expertiseContent);
        const currentNicheIndex = niches.indexOf(currentNiche);
        const nextNiche = niches[(currentNicheIndex + 1) % niches.length];

        setDisplayText("");
        setCurrentNiche(nextNiche);
        setCurrentIndex(0);
      }, 6000);
    } else if (displayText === "") {
      setIsTyping(true);
    }

    return () => clearTimeout(timeoutId);
  }, [currentNiche, displayText, isTyping, currentIndex, expertiseContent]);

  return (
    <div className="w-full p-4 md:p-8 flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <Card className="w-full max-w-4xl bg-card/50 backdrop-blur-sm shadow-lg border-muted">
        <CardContent className="p-6 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentNiche}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-start space-y-6"
            >
              <div className="w-full flex items-center justify-between">
                <Badge
                  variant="secondary"
                  className="text-lg px-4 py-2 capitalize"
                >
                  {currentNiche.replace(/-/g, " ")}
                </Badge>

                <AnimatePresence>
                  {isTyping &&
                    currentIndex <
                      expertiseContent[
                        currentNiche as keyof typeof expertiseContent
                      ].length && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                      >
                        <BeatLoader />
                      </motion.div>
                    )}
                </AnimatePresence>
              </div>

              <p
                className="text-xl leading-relaxed text-foreground/90"
                dangerouslySetInnerHTML={{
                  __html:
                    highlightText(displayText) +
                    (showCursor
                      ? '<span class="inline-block w-0.5 h-6 bg-primary ml-1 align-middle"></span>'
                      : ""),
                }}
              />
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
};
