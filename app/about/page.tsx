import React, { Suspense } from "react";
import AboutBody from "@/components/AboutBody";
import { Footer } from "@/components/Footer";
import StickyNavbar from "@/components/Navbar";

// Fallback component to show while loading
function LoadingFallback() {
  return <div>Loading...</div>;
}

export default function About() {
  return (
    <>
      <StickyNavbar />
      <Suspense fallback={<LoadingFallback />}>
        <AboutBody />
      </Suspense>
      <Footer />
    </>
  );
}
