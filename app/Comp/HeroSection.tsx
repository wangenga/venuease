'use client';

import Image from "next/image"
import { useRouter } from "next/navigation";
import Container from "./Container";
import Search from "./Search";

const HeroSection = () => {
  const router = useRouter();

  return (
    <div className="relative h-[70vh] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/images/hero.jpg')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative text-center text-white px-6 md:px-5">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Venuease</h1>
        <p className="text-lg md:text-xl mb-6">Discover amazing experiences and endless possibilities.</p>
       <Search />
      </div> 
    </div>
  );
};

export default HeroSection;