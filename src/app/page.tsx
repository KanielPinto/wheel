"use client"

import HomeNav from "@/components/Navbar";
import Image from "next/image";
import '@/app/globals.css'
import { Hero } from "@/components/Hero";
import { MacbookScroll } from "@/components/macbook-scroll";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "@/components/hero-highliight";
import { ContainerScroll } from "@/components/container-scroll-animation";

export default function Home() {
  return (
    <>
      <HomeNav></HomeNav>
      <HeroHighlight>
        <motion.h1
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: [20, -5, 0],
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          className=" text-2xl px-4 md:text-4xl lg:text-9xl font-annapurna font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-none text-center mx-auto"
        >
          Wheel <br />{" "}
          <Highlight className="text-black lg:text-5xl p-2 dark:text-white">
            Your Financial Companion
          </Highlight>
        </motion.h1>
      </HeroHighlight>

      <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Your finances <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                All in One Place
              </span>
            </h1>
          </>
        }
      >
        <Image
          src={`/dashboard_ss.png`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
    </>

  );
}
