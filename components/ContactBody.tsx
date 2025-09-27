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
          <Dialog.Panel className="w-full max-w-2xl max-h-screen overflow-y-auto rounded-xl bg-neutral-900 border border-teal-600 p-6 shadow-xl text-white">
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