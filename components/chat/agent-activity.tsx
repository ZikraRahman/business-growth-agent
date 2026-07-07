"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  Megaphone,
  Palette,
  Search,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

const activitySteps = [
  {
    name: "Main Business Agent",
    detail: "Understanding the request",
    icon: BrainCircuit,
  },
  {
    name: "Market Research Agent",
    detail: "Collecting business insights",
    icon: Search,
  },
  {
    name: "Strategy Agent",
    detail: "Structuring recommendations",
    icon: BarChart3,
  },
  {
    name: "Marketing Agent",
    detail: "Designing the growth angle",
    icon: Megaphone,
  },
  {
    name: "Creative Agent",
    detail: "Preparing polished concepts",
    icon: Palette,
  },
  {
    name: "Response Ready",
    detail: "Final answer is being assembled",
    icon: CheckCircle2,
  },
];

interface AgentActivityProps {
  isLoading: boolean;
}

export function AgentActivity({ isLoading }: AgentActivityProps) {
  const [activeStep, setActiveStep] = useState(0);
  const visibleSteps = useMemo(() => activitySteps, []);

  useEffect(() => {
    if (!isLoading) {
      setActiveStep(0);
      return;
    }

    const interval = window.setInterval(() => {
      setActiveStep((current) => Math.min(current + 1, visibleSteps.length - 2));
    }, 1150);

    return () => window.clearInterval(interval);
  }, [isLoading, visibleSteps.length]);

  if (!isLoading) {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border bg-card/85 p-4 shadow-soft backdrop-blur"
      aria-label="Agent activity"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">Specialist agents working</p>
          <p className="text-xs text-muted-foreground">Coordinating research, strategy, and creative thinking.</p>
        </div>
        <div className="flex h-8 items-center gap-1 rounded-full border bg-background px-3">
          {[0, 1, 2].map((dot) => (
            <motion.span
              key={dot}
              className="h-1.5 w-1.5 rounded-full bg-primary"
              animate={{ opacity: [0.35, 1, 0.35], scale: [0.9, 1.15, 0.9] }}
              transition={{ duration: 0.9, repeat: Infinity, delay: dot * 0.16 }}
            />
          ))}
        </div>
      </div>
      <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
        {visibleSteps.map((step, index) => {
          const Icon = step.icon;
          const isComplete = index < activeStep;
          const isActive = index === activeStep;

          return (
            <motion.div
              key={step.name}
              layout
              className={cn(
                "relative overflow-hidden rounded-lg border bg-background/70 p-3 transition",
                isActive && "border-primary/50 shadow-sm",
                isComplete && "border-primary/20 bg-primary/5",
              )}
            >
              {isActive && (
                <motion.div
                  className="absolute inset-x-0 top-0 h-0.5 bg-primary"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.1, repeat: Infinity }}
                  style={{ transformOrigin: "left" }}
                />
              )}
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-md border bg-card text-muted-foreground",
                    (isActive || isComplete) && "border-primary/30 text-primary",
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{step.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {isComplete ? "Complete" : step.detail}
                    {isActive ? "..." : ""}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
