import { SectionTitle } from "./SectionTitle";
import { Expertise } from "./Expertise";
import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import { db } from "@/firebaseConfigFile";
import { collection, getDocs } from "firebase/firestore";

import {
  FaceSmileIcon,
  ChartBarSquareIcon,
  CursorArrowRaysIcon,
  DevicePhoneMobileIcon,
  AdjustmentsHorizontalIcon,
  SunIcon,
  Square3Stack3DIcon,
  HomeModernIcon,
  ClipboardDocumentCheckIcon
} from "@heroicons/react/24/solid";

import bannerImg1 from "@/public/img/hero.png";
import CEOImage from "@/public/img/CEOImage.jpeg";

import productionImg from "@/public/img/production.png";
import schoolImg from "@/public/img/school.png";
import sketchImg from "@/public/img/sketch.png";
import warehouseIconImg from "@/public/img/warehouseIcon.png";

interface Employee {
  id: string;
  name: string;
  role: string;
  experience: string;
  imageUrl: string;
}

export default function AboutBody() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "employees"));
        const list = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Employee[];
        setEmployees(list);
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
    };

    fetchEmployees();
  }, []);

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
    <div className="container mx-auto px-6">

      <div className="text-center mb-16 mt-8" data-aos="fade-up">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">About Joy Structurals</h2>
        <div className="w-20 h-1 bg-teal-500 mx-auto"></div>
      </div>

      <div className="container mx-auto px-6 mt-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12" data-aos="fade-right">
            <h2 className="text-3xl md:text-2xl font-heading font-normal mb-0 ">A bit of info</h2>
            <div className="w-20 h-1 bg-teal-500 mb-6"></div>
            <p className="text-gray-300 mb-6">At Joy Structurals, we specialise in innovative structural design and high-quality construction solutions that bring visionary projects to life. With a team of experienced engineers, architects, and builders, we deliver precision, durability, and efficiency in every structure we create.</p>
            <p className="text-gray-300 mb-8">Our professionals deliver durable, yet aesthetically pleasing projects. We focus on quality, safety, and efficiency, marrying craftsmanship and innovation to transform your vision into reality.</p>
            <div className="flex space-x-4">
              <div className="text-center">
                <div className="text-4xl font-heading font-bold text-teal-600">10+</div>
                <div className="text-gray-400">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-heading font-bold text-teal-600">20</div>
                <div className="text-gray-400">Clients</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-heading font-bold text-teal-600">18</div>
                <div className="text-gray-400">Years</div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2" data-aos="fade-left">
            <img src="http://static.photos/office/1024x576/1" alt="Our Office" className="rounded-lg shadow-xl" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-24">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2" data-aos="fade-right">
            <img src="/img/CEOImage.jpeg" alt="Our Office" className="shadow-xl rounded-full aspect-square mx-auto" width={360} />
          </div>
          <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pl-12" data-aos="fade-left">
            <h2 className="text-3xl md:text-2xl font-heading font-normal mb-0 ">Meet Ranjith Jebasingh</h2>
            <div className="w-20 h-1 bg-teal-500 mb-6"></div>
            <p className="text-gray-300 mb-6">With nearly two decades of experience in structural design and construction,
              Ranjith Jebasingh has played a pivotal role in shaping industrial, commercial,
              and residential projects across India.</p>
            <ul className="space-y-4">
              <li className="flex gap-3 items-start">
                <DevicePhoneMobileIcon className="text-teal-500 w-6 h-6 flex-shrink-0" />
                <span className="text-gray-300">Holding a Master’s degree in Structural Engineering, worked with Hitech Structural, Royal Structure, and Kingsway Consultant.</span>
              </li>
              <li className="flex gap-3 items-start">
                <AdjustmentsHorizontalIcon className="text-teal-500 w-6 h-6 flex-shrink-0" />
                <span className="text-gray-300">Notable projects include a 49m span PEB for L.S. Mills and Saveetha Medical College dining block.</span>
              </li>
              <li className="flex gap-3 items-start">
                <SunIcon className="text-teal-500 w-6 h-6 flex-shrink-0" />
                <span className="text-gray-300">Committed to sustainable, precise, and innovative structural solutions.</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {employees.length > 0 && (
        <div className="container mx-auto px-6 mt-24">
          <div className="text-center mt-16 mb-16" data-aos="fade-up">
            <h2 className="text-2xl md:text-3xl font-heading font-normal mb-0">
              Meet The Rest of The Team
            </h2>
            <div className="w-20 h-1 bg-teal-500 mx-auto"></div>
            <p className="max-w-2xl mx-auto mt-4 text-gray-400">
              The brilliant minds behind our structural innovations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {employees.map((emp, index) => (
              <div
                key={emp.id}
                className="team-member text-center"
                data-aos="fade-up"
                data-aos-delay={(index + 1) * 100}
              >
                <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4 shadow-md">
                  <img
                    src={emp.imageUrl || "/img/user.jpg"}
                    alt={emp.name}
                    className="w-full cursor-pointer h-full object-cover transition duration-500"
                  />
                </div>
                <h3 className="text-xl font-heading font-semibold">{emp.name}</h3>
                <p className="text-teal-600 mb-2">{emp.role}</p>
                <p className="text-gray-400 text-sm">{emp.experience}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* <div className="container mx-auto px-6 mt-24">
        <div className="text-center mt-16 mb-16" data-aos="fade-up">
          <h2 className="text-2xl md:text-3xl font-heading font-normal mb-0">Meet The Rest of The Team</h2>
          <div className="w-20 h-1 bg-teal-500 mx-auto"></div>
          <p className="max-w-2xl mx-auto mt-4 text-gray-400">The brilliant minds behind our structural innovations.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="team-member text-center" data-aos="fade-up" data-aos-delay="100">
            <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4 shadow-md">
              <img src="/img/user.jpg" alt="Team Member" className="w-full cursor-pointer h-full object-cover transition duration-500" />
            </div>
            <h3 className="text-xl font-heading font-semibold">Fname Lname</h3>
            <p className="text-teal-600 mb-2">Chief Engineer</p>
            <p className="text-gray-400 text-sm">15 years experience in seismic design</p>
          </div>
          <div className="team-member text-center" data-aos="fade-up" data-aos-delay="200">
            <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4 shadow-md">
              <img src="/img/user.jpg" alt="Team Member" className="w-full cursor-pointer h-full object-cover transition duration-500" />
            </div>
            <h3 className="text-xl font-heading font-semibold">Fname Lname</h3>
            <p className="text-teal-600 mb-2">Lead Architect</p>
            <p className="text-gray-400 text-sm">Sustainable design specialist</p>
          </div>
          <div className="team-member text-center" data-aos="fade-up" data-aos-delay="300">
            <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4 shadow-md">
              <img src="/img/user.jpg" alt="Team Member" className="w-full cursor-pointer h-full object-cover transition duration-500" />
            </div>
            <h3 className="text-xl font-heading font-semibold">Fname Lname</h3>
            <p className="text-teal-600 mb-2">Project Manager</p>
            <p className="text-gray-400 text-sm">Commercial construction expert</p>
          </div>
          <div className="team-member text-center" data-aos="fade-up" data-aos-delay="400">
            <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4 shadow-md">
              <img src="/img/user.jpg" alt="Team Member" className="w-full cursor-pointer h-full object-cover transition duration-500" />
            </div>
            <h3 className="text-xl font-heading font-semibold">Fname Lname</h3>
            <p className="text-teal-600 mb-2">Structural Analyst</p>
            <p className="text-gray-400 text-sm">Computational design specialist</p>
          </div>
        </div>
      </div> */}

      <div className="text-center mb-16 mt-16" data-aos="fade-up">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Our Services</h2>
        <div className="w-20 h-1 bg-teal-500 mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="service-card p-8 rounded-lg shadow-md transition duration-500" data-aos="fade-up" data-aos-delay="100">
          <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-6">
            <HomeModernIcon className="text-teal-600 w-8 h-8" />
            {/* <i data-feather="layers" className="text-teal-600 w-8 h-8"></i> */}
          </div>
          <h3 className="text-xl font-heading font-semibold mb-3" >Structural Engineering</h3>
          <p className="text-gray-400">Precision engineering solutions for residential, commercial, and industrial structures.</p>
        </div>
        <div className="service-card p-8 rounded-lg shadow-md transition duration-500" data-aos="fade-up" data-aos-delay="200">
          <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-6">
            <Square3Stack3DIcon className="text-teal-600 w-8 h-8" />
            {/* <i data-feather="home" className="text-teal-600 w-8 h-8"></i> */}
          </div>
          <h3 className="text-xl font-heading font-semibold mb-3">Architectural Design</h3>
          <p className="text-gray-400">Innovative architectural concepts that blend functionality with aesthetic appeal.</p>
        </div>
        <div className="service-card p-8 rounded-lg shadow-md transition duration-500" data-aos="fade-up" data-aos-delay="300">
          <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-6">
            <ClipboardDocumentCheckIcon className="text-teal-600 w-8 h-8" />
            {/* <i data-feather="tool" className="text-teal-600 w-8 h-8"></i> */}
          </div>
          <h3 className="text-xl font-heading font-semibold mb-3">Construction Management</h3>
          <p className="text-gray-400">End-to-end project management ensuring quality, safety, and timely delivery.</p>
        </div>
      </div>
    </div>
  )
}