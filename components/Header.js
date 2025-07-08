"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
const [user, setUser] = useState(null)

useEffect(() => {
  const fetchUser = async ()=>{
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_END_POINT}/me`,{
        method:"GET",
        credentials:"include",
      });
      if(res.ok){
        const data = await res.json();
        console.log(data.user)
        setUser(data.user)
      }
    } catch (error) {
      console.error("Error fetching user: ", error)
    }
  }
  fetchUser()
}, [])



  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-[#05264e] flex items-center gap-2"
        >
          {/* <span className="text-2xl">🔷</span> */}
          <span>JobBox</span>
        </Link>

        <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <div className="group relative hover:underline-offset-4 transition hover:text-[#3c65f5] hover:underline">
            <Link href="/">Home</Link>
          </div>
          <div className="group relative hover:underline-offset-4 transition hover:text-[#3c65f5] hover:underline">
            <Link href="#">Find a Job</Link>
          </div>
          <div className="group relative hover:underline-offset-4 transition hover:text-[#3c65f5] hover:underline">
            <Link href="#">Recruiters</Link>
          </div>
          <div className="group relative hover:underline-offset-4 transition hover:text-[#3c65f5] hover:underline">
            <Link href="#">Candidates</Link>
          </div>
          <div className="group relative hover:underline-offset-4 transition hover:text-[#3c65f5] hover:underline">
            <Link href="#">Blog</Link>
          </div>
          <div className="group relative hover:underline-offset-4 transition hover:text-[#3c65f5] hover:underline">
            <Link href="#">Pages</Link>
          </div>
        </nav>

        {/* Buttons */}
        <div className="hidden md:flex items-center space-x-5">
          {!user && (
            <>
          <Link
            href="/auth/register"
            className="text-[#05264e] hover:text-[#3c65f5] font-semibold underline hover:underline-offset-4 transition"
          >
            Register
          </Link>

          <Link
          href="/auth/login">
          <button className="bg-[#3c65f5] text-white px-5 py-2 rounded-md hover:bg-[#05264e] transition">
            Sign in
          </button>
          </Link>
          </>
           )}

           {user && user.userType === "recruiter" && (
            <Link href="/jobpost">
              <button className="bg-[#3c65f5] text-white px-5 py-2 rounded-md hover:bg-[#05264e] transition">
                Post a Job
              </button>
            </Link>
          )}

          {user && user.userType === "jobseeker" && (
            <Link href="#">
              <button className="bg-[#3c65f5] text-white px-5 py-2 rounded-md hover:bg-[#05264e] transition">
                Dashboard
              </button>
            </Link>
          )}

          <button className="flex gap-1.5 items-center justify-center bg-[#3c65f5] text-white px-5 py-2 rounded-md hover:bg-[#05264e] transition">
            <span>
              <Search className="text-white w-4 h-4" />
            </span>
            <span> Search </span>
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden block text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white px-6 pb-4 space-y-2 shadow">
          <Link href="/" className="block">
            Home
          </Link>
          <Link href="#" className="block">
            Find a Job
          </Link>
          <Link href="#" className="block">
            Recruiters
          </Link>
          <Link href="#" className="block">
            Candidates
          </Link>
          <Link href="#" className="block">
            Blog
          </Link>
          <Link href="#" className="block">
            Pages
          </Link>
          <hr />

          {!user && (
            <>

          <Link href="/auth/register" className="block text-[#3c65f5]">
            Register
          </Link>

          <Link href="/auth/login">
          <button className="w-full bg-[#3c65f5] text-white py-2 rounded-md">
            Sign in
          </button>
          </Link>

          </>
          )}

          {user && user.userType === "recruiter" && (
            <Link href="/jobpost">
              <button className="bg-[#3c65f5] text-white px-5 py-2 rounded-md hover:bg-[#05264e] transition">
                Post a Job
              </button>
            </Link>
          )}

          {user && user.userType === "jobseeker" && (
            <Link href="/dashboard">
              <button className="bg-[#3c65f5] text-white px-5 py-2 rounded-md hover:bg-[#05264e] transition">
                Dashboard
              </button>
            </Link>
          )}

          <button className="flex w-full gap-2 items-center justify-center bg-[#3c65f5] text-white px-5 py-2 rounded-md ">
            <span>
              <Search className="text-white w-4 h-4" />
            </span>
            <span> Search </span>
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
