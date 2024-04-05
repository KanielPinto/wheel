import React from "react";
import { BackgroundGradientAnimation } from "./background-gradient-animation";

export function Hero() {
  return (
    <BackgroundGradientAnimation>
      <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl w-full">
        <p className="text-white">
          Your Finance Companion
        </p>
      </div>
    </BackgroundGradientAnimation>
  );
}
