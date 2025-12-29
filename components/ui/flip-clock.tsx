"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Size = "sm" | "md" | "lg" | "xl";
type Variant = "primary" | "secondary";

interface FlipUnitProps {
  digit: number;
  size?: Size;
  variant?: Variant;
}

function FlipUnit({ digit, size = "md", variant = "primary" }: FlipUnitProps) {
  const [prevDigit, setPrevDigit] = useState(digit);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (digit !== prevDigit) {
      setFlipping(true);
      const timer = setTimeout(() => {
        setFlipping(false);
        setPrevDigit(digit);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [digit, prevDigit]);

  const sizeClasses: Record<Size, string> = {
    sm: "w-8 h-12 text-2xl",
    md: "w-12 h-16 text-4xl",
    lg: "w-16 h-24 text-5xl",
    xl: "w-20 h-28 text-6xl",
  };

  const variantClasses: Record<Variant, string> = {
    primary: "bg-teal-600 text-white",
    secondary: "bg-neutral-800 text-neutral-200",
  };

  return (
    <div className={cn("relative perspective-[1000px]", sizeClasses[size], variantClasses[variant])}>
      {/* Top static */}
      <div className="absolute inset-x-0 top-0 h-1/2 overflow-hidden rounded-t-md">
        <span className="block h-full flex items-center justify-center">{digit}</span>
      </div>

      {/* Bottom static */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden rounded-b-md">
        <span className="block h-full flex items-center justify-center">{prevDigit}</span>
      </div>

      {/* Top flap */}
      <div className={cn(
        "absolute inset-x-0 top-0 h-1/2 origin-bottom backface-hidden rounded-t-md bg-inherit flex items-center justify-center",
        flipping && "animate-flip-top"
      )}>
        {prevDigit}
      </div>

      {/* Bottom flap */}
      <div className={cn(
        "absolute inset-x-0 bottom-0 h-1/2 origin-top backface-hidden rounded-b-md bg-inherit flex items-center justify-center",
        flipping && "animate-flip-bottom"
      )}>
        {digit}
      </div>

      <style jsx>{`
        @keyframes flip-top {
          0% { transform: rotateX(0deg); }
          100% { transform: rotateX(-90deg); }
        }
        @keyframes flip-bottom {
          0% { transform: rotateX(90deg); }
          100% { transform: rotateX(0deg); }
        }
        .animate-flip-top { animation: flip-top 0.6s ease-in forwards; }
        .animate-flip-bottom { animation: flip-bottom 0.6s ease-out forwards; }
      `}</style>
    </div>
  );
}

interface ClientFlipClockProps {
  size?: Size;
  variant?: Variant;
  countdown?: boolean;
  targetDate?: Date;
}

export function ClientFlipClock({
  size = "md",
  variant = "primary",
  countdown = false,
  targetDate,
}: ClientFlipClockProps) {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      if (countdown && targetDate) {
        const diff = Math.max(0, targetDate.getTime() - now.getTime());
        setTime({
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      } else {
        setTime({
          hours: now.getHours(),
          minutes: now.getMinutes(),
          seconds: now.getSeconds(),
        });
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [countdown, targetDate]);

  const pad = (num: number) => String(num).padStart(2, "0");

  return (
    <div className="inline-flex gap-2 font-mono">
      {[...pad(time.hours)].map((d, i) => <FlipUnit key={`h${i}`} digit={+d} size={size} variant={variant} />)}
      <span className="flex items-center justify-center">:</span>
      {[...pad(time.minutes)].map((d, i) => <FlipUnit key={`m${i}`} digit={+d} size={size} variant={variant} />)}
      <span className="flex items-center justify-center">:</span>
      {[...pad(time.seconds)].map((d, i) => <FlipUnit key={`s${i}`} digit={+d} size={size} variant={variant} />)}
    </div>
  );
}
export const FlipClock = ClientFlipClock;