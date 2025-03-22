import About from "@/components/home/About";
import Contact from "@/components/home/Contact";
import Expertise from "@/components/home/Expertise";
import Hero from "@/components/home/Hero";
import Projects from "@/components/home/Projects";

export default function Home() {
  return (
    <>
      <Hero />
      <Expertise />
      <Projects />
      <About />
      <Contact />
    </>
  );
}
