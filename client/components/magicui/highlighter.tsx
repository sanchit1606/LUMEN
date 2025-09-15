import React from "react";
import { cn } from "@/lib/utils";

interface HighlighterProps {
  children: React.ReactNode;
  action?: "highlight" | "underline" | "strike";
  color?: string;
  className?: string;
}

export function Highlighter({ 
  children, 
  action = "highlight", 
  color = "#FFD700",
  className 
}: HighlighterProps) {
  const getStyles = () => {
    switch (action) {
      case "highlight":
        return {
          backgroundColor: color,
          padding: "0.1em 0.2em",
          borderRadius: "0.25em",
        };
      case "underline":
        return {
          textDecoration: "underline",
          textDecorationColor: color,
          textDecorationThickness: "0.2em",
          textUnderlineOffset: "0.1em",
        };
      case "strike":
        return {
          textDecoration: "line-through",
          textDecorationColor: color,
          textDecorationThickness: "0.2em",
        };
      default:
        return {};
    }
  };

  return (
    <span
      className={cn("inline-block", className)}
      style={getStyles()}
    >
      {children}
    </span>
  );
}
