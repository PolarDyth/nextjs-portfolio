import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <section id="about" className="px-4 sm:px-6 py-12 sm:py-16 md:py-20 animate-fade-in">
      <div className="flex flex-col gap-10 sm:gap-12 md:gap-16 justify-between text-center md:text-left items-center md:flex-row">
        {/* Image Container */}
        <div className="md:w-1/2 relative w-full max-w-md">
          <Image 
            src="https://kzmqem5a2thfoqjtshg0.lite.vusercontent.net/placeholder.svg" 
            alt="William Alexander" 
            width={500} 
            height={500} 
            className="rounded-2xl w-full object-cover shadow-md"
            priority
          />
          {/* Stats Card */}
          <div className="absolute -bottom-6 -right-4 sm:right-0 bg-card/30 p-4 sm:p-6 rounded-xl shadow-lg backdrop-blur-sm">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="flex flex-col items-center">
                <span className="text-2xl sm:text-3xl text-primary font-bold">2+</span>
                <span className="text-muted-foreground text-xs sm:text-sm">Years Coding</span>
              </div>
              <div className="h-10 sm:h-12 w-px bg-border"/>
              <div className="flex flex-col items-center">
                <span className="text-2xl sm:text-3xl text-primary font-bold">15+</span>
                <span className="text-muted-foreground text-xs sm:text-sm">Projects</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Text Content */}
        <div className="md:w-1/2 flex flex-col gap-4 sm:gap-6 mt-10 md:mt-0">
          <span className="bg-muted text-primary px-3 py-1 rounded-lg text-sm w-fit mx-auto md:mx-0">About Me</span>
          <h2 className="text-3xl sm:text-4xl font-bold">Software Engineer & Problem Solver</h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            I&#39;m a Master&#39;s student in Software Engineering at Heriot Watt University, passionate about creating elegant solutions to complex problems. With a strong foundation in Java, React, and Python, I enjoy building applications that are both functional and user-friendly.
          </p>
          <p className="text-sm sm:text-base text-muted-foreground">
            My academic journey has equipped me with theoretical knowledge, while my personal projects have given me practical experience in software development. I&#39;m constantly learning and exploring new technologies to expand my skill set.
          </p>
          <Button asChild className="w-fit group mt-2 mx-auto md:mx-0">
            <Link href="/resume">
              Download Resume <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}