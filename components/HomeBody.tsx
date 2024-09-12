import { Hero } from "./Hero";
import { SectionTitle } from "./SectionTitle";
import { Expertise } from "./Expertise";
import {SectionOne, SectionTwo} from "@/components/data";

export default function HomeBody() {
    return(
        <main className="flex min-h-screen flex-col items-center justify-between p-8 bg-opacity-20">
            <Hero />
        </main>
    )
}