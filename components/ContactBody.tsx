"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import ContactUsForm from "./ContactUsForm";

export default function ContactSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="container mx-auto px-6 text-center" data-aos="fade-up">
      {/* CTA */}
      <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
        Ready to Build Something Extraordinary?
      </h2>
      <p className="max-w-2xl mx-auto mb-8 text-teal-100">
        Our team is ready to bring your vision to life with innovative structural solutions.
      </p>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-block bg-red-500 hover:bg-red-600 text-white px-10 py-4 rounded-md font-medium text-lg transition duration-300"
      >
        Get in Touch
      </button>

      {/* Dialog */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        {/* Overlay */}
        <div className="fixed inset-0 bg-black/70" aria-hidden="true" />

        {/* Panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="max-w-4xl w-full bg-dark-950 text-white rounded-lg shadow-xl p-8">
            <div className="flex justify-between items-start mb-6">
              <Dialog.Title className="text-2xl font-heading font-bold">
                Get in Touch
              </Dialog.Title>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-red-500 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Form */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-teal-500">Send us a Message</h3>
                <ContactUsForm />
              </div>

              {/* Contact Details */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-teal-500">Contact Details</h3>
                <ul className="space-y-4 text-gray-300">
                  <li>
                    <span className="font-bold text-white">Address:</span>
                    <p>123 Street Name, City, State, ZIP Code</p>
                  </li>
                  <li>
                    <span className="font-bold text-white">Phone:</span>
                    <p>(123) 456-7890</p>
                  </li>
                  <li>
                    <span className="font-bold text-white">Email:</span>
                    <p>email@example.com</p>
                  </li>
                  <li>
                    <span className="font-bold text-white">Social Media:</span>
                    <p>
                      <a href="#" className="text-teal-500 hover:underline">
                        LinkedIn
                      </a>{" "}
                      |{" "}
                      <a href="#" className="text-teal-500 hover:underline">
                        Twitter
                      </a>{" "}
                      |{" "}
                      <a href="#" className="text-teal-500 hover:underline">
                        Facebook
                      </a>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}



// import Image from "next/image";
// import { Container } from "./Container";
// import { SectionTitle } from "./SectionTitle";
// import ContactUsForm from "./ContactUsForm";

// export default function AboutBody() {
//   return (
// <div className="container mx-auto px-6 text-center" data-aos="fade-up">
//             <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Ready to Build Something Extraordinary?</h2>
//             <p className="max-w-2xl mx-auto mb-8 text-teal-100">Our team is ready to bring your vision to life with innovative structural solutions.</p>
//             <a href="#" className="inline-block bg-red-500 hover:bg-red-600 text-white px-10 py-4 rounded-md font-medium text-lg transition duration-300">Get in Touch</a>
//         </div>


//     // <main className="flex min-h-screen flex-col items-center justify-between p-8 backgroundPattern bg-opacity-20">
//     //   <Container
//     //     className={`flex w-full flex-col mt-4 items-center justify-center text-center `}>

//     //     <div className="text-sm font-bold tracking-wider text-indigo-600 uppercase">
//     //       Contact Us
//     //     </div>

//     //     <h2 className="max-w-2xl mt-3 text-xl leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-xl dark:text-white">
//     //     Feel free to leave general inquiries, suggestions, and any feedback.
//     //     </h2>

//     //     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
//     //       {/* Contact Form */}
//     //       <div className="bg-transparent p-6 rounded-lg shadow-lg">
//     //         <h2 className="text-2xl font-bold mb-4">Send us a Message</h2>
//     //         <ContactUsForm />
//     //       </div>

//     //       {/* Contact Details */}
//     //       <div className="bg-transparent p-6 rounded-lg shadow-lg ">
//     //         <h2 className="text-2xl font-bold mb-6">Contact Details</h2>
//     //         <ul className="space-y-4 text-xl">
//     //           <li>
//     //             <span className="font-bold">Address:</span>
//     //             <p>123 Street Name, City, State, ZIP Code</p>
//     //           </li>
//     //           <li>
//     //             <span className="font-bold">Phone:</span>
//     //             <p>(123) 456-7890</p>
//     //           </li>
//     //           <li>
//     //             <span className="font-bold">Email:</span>
//     //             <p>email@example.com</p>
//     //           </li>
//     //           <li>
//     //             <span className="font-bold">Social Media:</span>
//     //             <p>
//     //               <a href="#" className="text-purple-600 hover:underline">LinkedIn</a> |
//     //               <a href="#" className="text-purple-600 hover:underline">Twitter</a> |
//     //               <a href="#" className="text-purple-600 hover:underline">Facebook</a>
//     //             </p>
//     //           </li>
//     //         </ul>
//     //       </div>
//     //     </div>

//     //   </Container>

//     // </main>
//   )
// }