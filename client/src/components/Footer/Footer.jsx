import { FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className=" bg-neutral-200 sticky">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="sm:flex sm:items-center sm:justify-between select-none">
          <div>
            <div className="text-sm text-zinc-900 sm:text-center dark:text-gray-400 mt-4 select-none">
              Sweet Home is your destination for exceptional furniture and home
              decor that will transform your living spaces into stunning
              showcases of style and comfort. We offer an extensive collection
              of high-design pieces, ranging from contemporary marvels to
              rediscovered vintage icons. Each item is meticulously crafted with
              premium materials, ensuring exceptional quality that will stand
              the test of time.
            </div>
            <hr className="my-3 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-black to-transparent opacity-35 dark:opacity-100" />
            <span className="text-sm text-zinc-900 sm:text-center dark:text-gray-400 select-none">
              © 2023 Sweet Home. All Rights Reserved. No part of this website,
              including texts, images, or any other element, may be reproduced
              or transmitted in any form or by any means without our permission.
            </span>
            <div className="flex flex-wrap justify-center mt-2 space-x-6 sm:justify-center sm:mt-0 mb-2">
              <p className="text-zinc-900 text-sm font-bold ml-1 mt-4">
                Follow us
              </p>
            </div>
            <div className="flex flex-wrap justify-center mt-2 space-x-6 sm:justify-center">
              <a href="#" className="text-zinc-900 dark:hover:text-white">
                <FaInstagram
                  className="w-5 h-5"
                  fill="currentColor"
                  aria-hidden="true"
                />
              </a>
              <a href="#" className="text-zinc-900 dark:hover:text-white">
                <FaFacebook
                  className="w-5 h-5"
                  fill="currentColor"
                  aria-hidden="true"
                />
              </a>
              <a href="#" className="text-zinc-900 dark:hover:text-white">
                <FaWhatsapp
                  className="w-5 h-5"
                  fill="currentColor"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
