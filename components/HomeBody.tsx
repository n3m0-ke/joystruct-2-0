import { Hero } from "./Hero";

export default function HomeBody() {
    return(
        <div className="container mx-auto px-6 py-24 text-white" data-aos="fade-up">
            <div className="max-w-2xl">
                <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">Innovative Structural Design, Built to Last</h1>
                <p className="text-xl mb-8 opacity-90">We combine engineering excellence with architectural vision to create structures that stand the test of time.</p>
                <div className="flex space-x-4">
                    <a href="#" className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-md font-medium transition duration-300">Get a Quote</a>
                    <a href="#" className="border-2 border-white hover:bg-white hover:text-teal-600 text-white px-8 py-3 rounded-md font-medium transition duration-300">View Projects</a>
                </div>
            </div>
        </div>
        // <main className="flex min-h-screen flex-col items-center justify-between px-8 pt-8 pb-0 bg-opacity-20">
        //     <Hero />
        // </main>
    )
}