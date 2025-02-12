import { SectionTitle } from "./SectionTitle";
import { Expertise } from "./Expertise";

import {
  FaceSmileIcon,
  ChartBarSquareIcon,
  CursorArrowRaysIcon,
  DevicePhoneMobileIcon,
  AdjustmentsHorizontalIcon,
  SunIcon,
} from "@heroicons/react/24/solid";

import bannerImg1 from "@/public/img/hero.png";
import CEOImage from "@/public/img/CEOImage.jpeg";

import productionImg from "@/public/img/production.png";
import schoolImg from "@/public/img/school.png";
import sketchImg from "@/public/img/sketch.png";
import warehouseIconImg from "@/public/img/warehouseIcon.png";



export default function AboutBody() {

  const SectionOne = {
    title: "Why should you let us work with you",
    desc: "Our professionals deliver durable, yet aesthetically pleasing projects. We focus on quality, safety, and efficiency, marrying craftsmanship and innovation to transform your vision into reality.",
    image: bannerImg1,
    bullets: [
      {
        title: "Project Vision",
        desc: "we are specialists in innovative structural design and high-quality construction solutions, with a team of experienced engineers, architects, and builders, that bring visionary projects to life.",
        icon: <FaceSmileIcon />,
        image: schoolImg
      },
      {
        title: "All In One",
        desc: "From concept to completion, we integrate cutting-edge technology, sustainable practices, and industry expertise to build safe, functional, and aesthetically striking structures.",
        icon: <ChartBarSquareIcon />,
        image: warehouseIconImg
      },
      {
        title: "Custom Solutions",
        desc: "Driven by integrity and innovation, we collaborate closely with clients, ensuring their ideas are transformed into reality with meticulous attention to detail, whether designing complex infrastructures or executing seamless construction projects.",
        icon: <CursorArrowRaysIcon />,
        image: sketchImg
      },
    ],
  }

  const SectionTwo = {
    imgPos: "right",
    title: "Meet Ranjith Jebasingh",
    desc: "With nearly two decades of experience in structural design and construction, Ranjith Jebasingh has played a pivotal role in shaping industrial, commercial, and residential projects across India.",
    image: CEOImage,
    bullets: [
      {
        title: "Knowledge Prowess",
        desc: "Holding a Master’s degree in Structural Engineering from Karunya Deemed University, he has worked with leading firms such as Hitech Structural, Royal Structure, and Kingsway Consultant as a Design Engineer.",
        icon: <DevicePhoneMobileIcon />,
        image: schoolImg,
      },
      {
        title: "Project Completion",
        desc: "Notable projects include a 49m span PEB structure for L.S. Mills, a 60m span rigid frame for Daeseung India Seat Ltd., and the Saveetha Medical College dining block.",
        icon: <AdjustmentsHorizontalIcon />,
        image: schoolImg,
      },
      {
        title: "Committment for sustainability",
        desc: "With a commitment to precision and innovation, Ranjith Jebasingh continues to deliver structural solutions that combine strength, efficiency, and sustainability.",
        icon: <SunIcon />,
        image: schoolImg
      },
    ],
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-8 pt-8 pb-0 backgroundPattern bg-opacity-20">

      <SectionTitle
        preTitle="About Us"
        title=""
      >
      </SectionTitle>

      <Expertise data={SectionOne} />

      <Expertise data={SectionTwo} />
    </main>
  )
}