"use client";
import HeroSection from "./Comp/HeroSection";
import EventTypes from "./Comp/EventTypes";


export default function Home() {
  return (
    <div>
      <div className="h-20"></div>
      <div>
        <HeroSection />
        <EventTypes />
      </div>
    </div>
  );
}
