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
import bannerImg2 from "@/public/img/benefit-two.png";

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
        title: "Educational Institutions",
        desc: "An explanation",
        icon: <FaceSmileIcon />,
        image: schoolImg
      },
      {
        title: "Warehouses",
        desc: "An explanation",
        icon: <ChartBarSquareIcon />,
        image: warehouseIconImg
      },
      {
        title: "Custom Solutions",
        desc: "An explanation.",
        icon: <CursorArrowRaysIcon />,
        image: sketchImg
      },
    ],
  }

  const SectionTwo = {
    imPos: "right",
    title: "Offer more benefits here",
    desc: "You can use this same layout with a flip image to highlight your rest of the benefits of your product. It can also contain an image or Illustration as above section along with some bullet points.",
    image: bannerImg2,
    bullets: [
      {
        title: "Mobile Responsive Template",
        desc: "Nextly is designed as a mobile first responsive template.",
        icon: <DevicePhoneMobileIcon />,
        image:schoolImg,
      },
      {
        title: "Powered by Next.js & TailwindCSS",
        desc: "This template is powered by latest technologies and tools.",
        icon: <AdjustmentsHorizontalIcon />,
        image: schoolImg,
      },
      {
        title: "Dark & Light Mode",
        desc: "Nextly comes with a zero-config light & dark mode. ",
        icon: <SunIcon />,
        image: schoolImg
      },
    ],
  }
    return(
        <main className="flex min-h-screen flex-col items-center justify-between p-8 backgroundPattern bg-opacity-20">

            <SectionTitle
                preTitle="About Us"
                title=""
            >
            </SectionTitle>

            <Expertise data={SectionTwo} />

            <Expertise data={SectionOne} />


    </main>
    )
}