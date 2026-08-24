import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/hero/Hero";
import About from "@/components/sections/About";
import LiveStats from "@/components/sections/LiveStats";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-forest-900 text-text-primary overflow-hidden">
      <Navbar />
      <Hero />
      <About />
      <LiveStats />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </main>
  );
}
