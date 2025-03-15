'use client';

import { imageConfigDefault } from "next/dist/shared/lib/image-config";
import Container from "./Container";
import CategoryBox from "./CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import HeroSection from "./HeroSection";

export const eventTypes =  [
  {
    label: "Personal Events",
    image: "/images/wedding.jpg",
    description: "These are events centered around individuals and their milestones, often involving family and close friends. They range from small, intimate gatherings to large, elaborate celebrations."
  },
  {
    label: "Corporate & Business Events",
    image: "/images/wedding.jpg",
    description: "Professional gatherings that serve business, networking, or educational purposes. These events are structured and require venues equipped for presentations, discussions, and formal dining."
  },
  {
    label: "Entertainment & Social Events",
    image: "/images/wedding.jpg",
    description: "These events focus on leisure, performance, and social interaction. They attract both small and large audiences, depending on the nature of the event."
  },
  {
    label: "Cultural & Community Events",
    image: "/images/wedding.jpg",
    description: "Events that celebrate heritage, community engagement, or charitable causes. These can be public or private and often involve large gatherings."
  },
  {
    label: "Outdoor & Adventure Events",
    image: "/images/wedding.jpg",
    description: "Events designed for exploration, adventure, and physical activity, usually held in natural settings. These often involve group participation and require minimal formal setups."
  },
  {
    label: "Educational & Professional Events",
    image: "/images/wedding.jpg",
    description: "Learning-focused events that involve knowledge sharing, skill development, and industry discussions. These can be formal or casual, depending on the event type."
  },
]

const EventTypes = () => {
  const params = useSearchParams();
  const eventType = params?.get('eventTypes');
  const pathname = usePathname();

  const isMainPage = pathname === '/';

  if(!isMainPage){
    return null;
  }

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {eventTypes.map((item) => (
          <CategoryBox
          key={item.label} 
          label={item.label}
          selected={eventType === item.label}
          image={item.image} />  
        ))}
      </div>
    </Container>
  )
}

export default EventTypes