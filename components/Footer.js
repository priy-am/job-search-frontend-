import Link from "next/link";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { Button } from "./ui/button";

export default function Footer() {
  return (
    <footer className="bg-white border-t  text-gray-700  overflow-hidden">
      <div className="max-w-7xl  mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {/* Brand Info */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-2">
          <h2 className="text-xl font-bold text-blue-700 flex items-center gap-2 mb-2">
            {/* <span className="text-2xl">🔷</span> */}
            <span>JobBox</span>
          </h2>
          <p className="text-sm mb-4">
            JobBox is the heart of the design community and the best resource to
            discover and connect with designers and jobs worldwide.
          </p>
          <div className="flex gap-4 text-[#3c65f5]">
            <FaFacebookF className="hover:text-[#3c65f5] text-[#05264e] cursor-pointer" />
            <FaTwitter className="hover:text-[#3c65f5] text-[#05264e] cursor-pointer" />
            <FaLinkedinIn className="hover:text-[#3c65f5] text-[#05264e] cursor-pointer" />
          </div>
        </div>

        {/* Footer Links */}
        <div className="min-w-0">
          <h4 className="font-semibold mb-3 text-[#05264e]">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#" className="hover:text-[#3c65f5] transition-colors">About Us</Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#3c65f5] transition-colors">Candidates</Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#3c65f5] transition-colors">Contact Us</Link>
            </li>
          </ul>
        </div>

        <div className="min-w-0">
          <h4 className="font-semibold mb-3 text-[#05264e]">Community</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#" className="hover:text-[#3c65f5] transition-colors">Feature</Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#3c65f5] transition-colors">Pricing</Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#3c65f5] transition-colors">Credit</Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#3c65f5] transition-colors">FAQ</Link>
            </li>
          </ul>
        </div>

        <div className="min-w-0">
          <h4 className="font-semibold mb-3 text-[#05264e]">Quick links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#" className="hover:text-[#3c65f5] transition-colors">iOS</Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#3c65f5] transition-colors">Android</Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#3c65f5] transition-colors">Microsoft</Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#3c65f5] transition-colors">Desktop</Link>
            </li>
          </ul>
        </div>

        <div className="min-w-0">
          <h4 className="font-semibold mb-3 text-[#05264e]">More</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#" className="hover:text-[#3c65f5] transition-colors">Privacy</Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#3c65f5] transition-colors">Helps</Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#3c65f5] transition-colors">Terms</Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#3c65f5] transition-colors">FAQ</Link>
            </li>
          </ul>
        </div>

        {/* App Download */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-2 min-w-0">
          <h4 className="font-semibold mb-3 text-[#05264e]">Download App</h4>
          <p className="text-sm mb-3">
            Download our Apps and get extra 15% discount on your first order...!
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button className="bg-[#3c65f5] text-white px-4 py-2 rounded-md hover:bg-[#05264e] transition whitespace-nowrap">
              <Link href="#">Google Play</Link>
            </Button>
            <Button className="bg-[#3c65f5] text-white px-4 py-2 rounded-md hover:bg-[#05264e] transition whitespace-nowrap">
              <Link href="#">App Store</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="border-t  px-4 sm:px-6 py-4 text-sm flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto text-gray-600">
        <p className="text-center md:text-left">Copyright © 2025. Job Search all right reserved</p>
        <div className="flex flex-wrap justify-center md:justify-end gap-4 mt-2 md:mt-0">
          <Link href="#" className="hover:text-[#3c65f5] transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-[#3c65f5] transition-colors">Terms & Conditions</Link>
          <Link href="#" className="hover:text-[#3c65f5] transition-colors">Security</Link>
        </div>
      </div>
    </footer>
  );
}