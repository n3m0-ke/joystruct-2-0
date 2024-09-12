import Image from "next/image";
import { Container } from "./Container";
import { SectionTitle } from "./SectionTitle";
import ContactUsForm from "./ContactUsForm";

export default function AboutBody() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 backgroundPattern bg-opacity-20">
      <Container
        className={`flex w-full flex-col mt-4 items-center justify-center text-center `}>

        <div className="text-sm font-bold tracking-wider text-indigo-600 uppercase">
          Contact Us
        </div>

        <h2 className="max-w-2xl mt-3 text-xl leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-xl dark:text-white">
        Feel free to leave general inquiries, suggestions, and any feedback.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {/* Contact Form */}
          <div className="bg-transparent p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Send us a Message</h2>
            <ContactUsForm />
          </div>

          {/* Contact Details */}
          <div className="bg-transparent p-6 rounded-lg shadow-lg ">
            <h2 className="text-2xl font-bold mb-6">Contact Details</h2>
            <ul className="space-y-4 text-xl">
              <li>
                <span className="font-bold">Address:</span>
                <p>123 Street Name, City, State, ZIP Code</p>
              </li>
              <li>
                <span className="font-bold">Phone:</span>
                <p>(123) 456-7890</p>
              </li>
              <li>
                <span className="font-bold">Email:</span>
                <p>email@example.com</p>
              </li>
              <li>
                <span className="font-bold">Social Media:</span>
                <p>
                  <a href="#" className="text-purple-600 hover:underline">LinkedIn</a> |
                  <a href="#" className="text-purple-600 hover:underline">Twitter</a> |
                  <a href="#" className="text-purple-600 hover:underline">Facebook</a>
                </p>
              </li>
            </ul>
          </div>
        </div>

      </Container>

    </main>
  )
}