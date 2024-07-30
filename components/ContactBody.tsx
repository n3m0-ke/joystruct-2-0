import Image from "next/image";
import { Container } from "./Container";
import { SectionTitle } from "./SectionTitle";

export default function AboutBody() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 backgroundPattern bg-opacity-20">
      <Container
        className={`flex w-full flex-col mt-4 items-center justify-center text-center `}>

        <div className="text-sm font-bold tracking-wider text-indigo-600 uppercase">
          Contact Us
        </div>

        <h2 className="max-w-2xl mt-3 text-xl leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-xl dark:text-white">
        Feel free to leave general inquiries, customer support questions, partnership opportunity suggestions, and any feedback.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {/* Contact Form */}
          <div className="bg-transparent p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Send us a Message</h2>
            <form>
              {/* Customer Name */}
              <div className="flex w-full flex-col gap-6 mb-4">
                <div className="relative">
                  <input type="text" id="client_name" className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm bg-transparent border-0 border-b-2 border-purple-400 appearance-no text-white focus:outline-none focus:ring-0 focus:border-purple-600 focus:ring-purple-600 peer" placeholder=" " />
                  <label htmlFor="client_name" className="absolute text-sm text-purple-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Name</label>
                </div>
              </div>

              {/* Customer Email */}
              <div className="flex w-full flex-col gap-6 mb-4">
                <div className="relative">
                  <input type="text" id="email" className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm bg-transparent border-0 border-b-2 border-purple-400 appearance-no text-white focus:outline-none focus:ring-0 focus:border-purple-600 focus:ring-purple-600 peer" placeholder=" " />
                  <label htmlFor="email" className="absolute text-sm text-purple-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Email</label>
                </div>
              </div>

              {/* subject */}
              <select id="countries" className="bg-transparent cursor-pointer border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4">
                <option selected value="general">General Inquiry</option>
                <option value="support">Support</option>
                <option value="feedback">Feedback</option>
                <option value="partnership">Partnership</option>
              </select>

              {/* description */}
              <div className="flex flex-row w-full mb-4">
                <div className="flex w-full flex-col gap-6">
                  <div className="relative">
                    <textarea id="details" rows={4} className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm bg-transparent border-0 border-b-2 border-purple-400 appearance-no text-white focus:outline-none focus:ring-0 focus:border-purple-600 focus:ring-purple-600 peer" placeholder=" " />
                    <label htmlFor="details" className="absolute text-sm text-purple-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Message</label>
                  </div>
                </div>
              </div>


              
              <button
                type="submit"
                className="w-full px-4 py-2 bg-purple-600 text-white font-bold rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
              >
                Send Message
              </button>
            </form>
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