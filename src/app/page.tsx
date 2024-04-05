import HomeNav from "@/components/Navbar";
import Image from "next/image";
import '@/app/globals.css'
import { Hero } from "@/components/Hero";
import { MacbookScroll } from "@/components/macbook-scroll";
import Link from "next/link";
import { Logo } from "@/components/Logo";

export default function Home() {
  return (
    <>
      <HomeNav></HomeNav>
      <Hero></Hero>
      <div className="overflow-hidden dark:bg-[#0B0B0F] bg-white w-full">
        <MacbookScroll
          title={
            <span>
              This Macbook is built with Tailwindcss. <br /> No kidding.
            </span>
          }
          badge={
            <Link href="https://github.com/KanielPinto/wheel">
              <Logo></Logo>
            </Link>
          }
          src={`/dashboard_ss.png`}
          showGradient={false}
        />
      </div>
    </>

  );
}
