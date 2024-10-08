"use client"

import HomeNav from "@/components/Navbar";
import Image from "next/image";
import '@/app/globals.css'
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "@/components/hero-highliight";
import { ContainerScroll } from "@/components/container-scroll-animation";
import { Button } from "@nextui-org/react";
import FeatureGrid from "@/components/FeatureGrid";
import Footer from "@/components/Footer";
import { FaGithub } from "react-icons/fa";

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
          className="flex flex-col gap-4 text-8xl px-4 md:text-4xl lg:text-9xl font-sans font-bold text-neutral-700 dark:text-white max-w-4xl leading-none text-center mx-auto my-0"
        >
          Wheel
          <Highlight className="text-black text-2xl lg:text-5xl p-4 my-0  dark:text-white leading-none">
            Your Financial Companion
          </Highlight>

          <div className="flex flex-col md:flex-row gap-8 font-sans my-8 w-full align-middle justify-between font-bold text-xl">
            <Button size="lg" color="secondary" className="font-bold" variant="shadow" onClick={() => {
              // Redirect to another page
              window.location.href = '/dashboards/my-wheel';
            }}>
              Generate Your Wheel
            </Button>
            <Button color="primary" className="font-bold" variant="ghost" size="lg" startContent={<FaGithub></FaGithub>} onClick={() => {
              // Redirect to another page
              window.location.href = 'https://github.com/KanielPinto/wheel';
            }}>
              Github
            </Button>
          </div>
        </motion.h1>
      </HeroHighlight>

      <div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="flex flex-col overflow-hidden">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: [20, -5, 0],
            }}
            transition={{
              duration: 1.5,
              ease: [0.4, 0.0, 0.2, 1],
            }}
          >
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
                width={1200}
                className="mx-auto rounded-2xl object-cover h-full object-left-top"
                draggable={false}
              />
            </ContainerScroll>
          </motion.div>
        </div>

      </div>

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
          duration: 1.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
      >

        <FeatureGrid></FeatureGrid>

      </motion.h1>


      <Footer></Footer>
    </>

  );
}
