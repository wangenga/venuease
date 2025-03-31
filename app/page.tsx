"use client";
import HeroSection from "./Comp/HeroSection";
import EventTypes from "./Comp/EventTypes";
import SearchModal from "./Comp/Modals/SearchModal";


export default function Home() {
  return (
    <div>
      <div className="h-20"></div>
      <div>
        <HeroSection />
        <SearchModal />
        <EventTypes />
      </div>
    </div>
  );
}
