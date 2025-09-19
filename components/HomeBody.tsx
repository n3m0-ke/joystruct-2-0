"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { DemoForm } from "./DemoForm";

export default function HomeBody() {
  const [isOpen, setIsOpen] = useState(false);

  const openDemoModal = () => setIsOpen(true);
  const closeDemoModal = () => setIsOpen(false);

  return (
    <div className="container mx-auto px-6 py-24 text-white" data-aos="fade-up">
      <div className="max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
          We create Beautiful Structures
        </h1>
        <p className="text-xl mb-8 opacity-90">
          We combine engineering excellence with architectural vision to create
          structures that stand the test of time.
        </p>

        <div className="flex flex-wrap gap-4">

          {/* Secondary CTA (Teal outline) */}
          <a
            href="#projects"
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-md font-medium transition"
          >
            View Projects
          </a>

          {/* Demo button (Teal filled) */}
          <button
            onClick={openDemoModal}
            className="border-2 border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white px-8 py-3 rounded-md font-medium transition"
          >
            Book a Demo
          </button>
        </div>
      </div>

      {/* Demo Modal */}
      <Dialog open={isOpen} onClose={closeDemoModal} className="relative z-50">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />

        {/* Panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-2xl rounded-xl bg-neutral-900 border border-teal-600 p-6 shadow-xl text-white">
            <Dialog.Title className="text-2xl font-heading font-semibold text-teal-400 mb-4">
              Book a Demo
            </Dialog.Title>

            <DemoForm onSuccess={closeDemoModal} />

            <div className="flex justify-end mt-6">
              <button
                onClick={closeDemoModal}
                className="px-6 py-2 rounded-md border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition"
              >
                Cancel
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
