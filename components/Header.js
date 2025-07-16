"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast, ToastContainer } from "react-toastify";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserStart,
  fetchUserSuccess,
  logoutUser,
  fetchUserFailure,
} from "@/redux/userSlice";
import { useRouter } from "next/navigation";

const Header = () => {
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const [blogOpen, setBlogOpen] = useState(false);
  const [isBlogMobileOpen, setIsBlogMobileOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);
  const [isPagesMobileOpen, setIsPagesMobileOpen] = useState(false);

  const user = useSelector((state) => state.user.user);
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        dispatch(fetchUserStart());
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_AUTH_END_POINT}/me`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (res.ok) {
          const data = await res.json();
          console.log(data.user);
          dispatch(fetchUserSuccess(data.user));
        }
      } catch (error) {
        console.error("Error fetching user: ", error);
        dispatch(fetchUserFailure(error.message));
      }
    };
    fetchUser();
  }, [dispatch]);

  const Logout = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_AUTH_END_POINT}/logout`,
        {
          method: "POST", // Usually logout should be POST
          credentials: "include", // Include cookies for logout
        }
      );

      if (res.ok) {
        const data = await res.json();
        toast.success(data.message);
        dispatch(logoutUser());

        // Refresh the page after successful logout
        setTimeout(() => {
          router.push('/')
          router.refresh();
        }, 1000); // Small delay to show the success message
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "Logout failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ToastContainer />
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
              <Link href="/allJob">Find a Job</Link>
            </div>
            <div className="group relative hover:underline-offset-4 transition hover:text-[#3c65f5] hover:underline">
              <Link href="#">Recruiters</Link>
            </div>
            <div className="group relative hover:underline-offset-4 transition hover:text-[#3c65f5] hover:underline">
              <Link href="#">Candidates</Link>
            </div>

            <Popover open={blogOpen} onOpenChange={setBlogOpen}>
              <PopoverTrigger
                onMouseEnter={() => setBlogOpen(true)}
                onMouseLeave={() => setBlogOpen(false)}
                className="flex items-center text-gray-700 font-medium hover:text-[#3c65f5] hover:underline hover:underline-offset-4 focus:outline-none cursor-pointer"
              >
                <span>Blog</span>
                <ChevronDown size={16} className="ml-1 text-gray-400" />
              </PopoverTrigger>

              <PopoverContent
                onMouseEnter={() => setBlogOpen(true)}
                onMouseLeave={() => setBlogOpen(false)}
                className="w-[180px] p-2"
              >
                <Link
                  href="/blogs"
                  className="block p-2 rounded hover:bg-gray-100 text-sm cursor-pointer"
                >
                  All Blogs
                </Link>

                {user?.userType === "recruiter" && (
                  <Link
                    href="/blogs/blogPost"
                    className="block p-2 rounded hover:bg-gray-100 text-sm cursor-pointer"
                  >
                    Blog Post
                  </Link>
                )}
              </PopoverContent>
            </Popover>

            <Popover open={pagesOpen} onOpenChange={setPagesOpen}>
              <PopoverTrigger
                onMouseEnter={() => setPagesOpen(true)}
                onMouseLeave={() => setPagesOpen(false)}
                className="group relative flex items-center text-gray-700 font-medium hover:text-[#3c65f5] hover:underline hover:underline-offset-4 transition cursor-pointer focus:outline-none"
              >
                <span>Pages</span>
                <ChevronDown size={16} className="ml-1 text-gray-400" />
              </PopoverTrigger>

              <PopoverContent
                onMouseEnter={() => setPagesOpen(true)}
                onMouseLeave={() => setPagesOpen(false)}
                className="w-[180px] p-2"
              >
                {user?.userType === "recruiter" && (
                  <Link
                    href={ `/myjobposts`}
                    className="block p-2 rounded hover:bg-gray-100 text-sm cursor-pointer"
                  >
                    My Job Posts
                  </Link>
                )}
              </PopoverContent>
            </Popover>
          </nav>

          {/* Buttons */}
          <div className="hidden md:flex items-center space-x-5">
            {!user ? (
              <>
                <Link href="/auth/register">
                  <button className="bg-[#3c65f5] text-white px-5 py-2 rounded-md hover:bg-[#05264e] transition">
                    Register
                  </button>
                </Link>

                <Link href="/auth/login">
                  <button className="bg-[#3c65f5] text-white px-5 py-2 rounded-md hover:bg-[#05264e] transition">
                    Sign in
                  </button>
                </Link>
              </>
            ) : (
              <div
                onClick={() => Logout()}
                className="text-[#05264e] cursor-pointer hover:text-[#3c65f5] font-semibold underline hover:underline-offset-4 transition"
              >
                Logout
              </div>
            )}

            {user && user.userType === "recruiter" && (
              <>
                <Link href="/jobpost">
                  <button className="bg-[#3c65f5] text-white px-5 py-2 rounded-md hover:bg-[#05264e] transition">
                    Post a Job
                  </button>
                </Link>
              </>
            )}

            {user && user.userType === "jobseeker" && (
              <Link href="#">
                <button className="bg-[#3c65f5] text-white px-5 py-2 rounded-md hover:bg-[#05264e] transition">
                  Dashboard
                </button>
              </Link>
            )}
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
            <Link href="/allJob" className="block">
              Find a Job
            </Link>
            <Link href="#" className="block">
              Recruiters
            </Link>
            <Link href="#" className="block">
              Candidates
            </Link>
            <div>
              <button
                className="flex justify-between items-center w-full text-left text-gray-700 py-2"
                onClick={() => setIsBlogMobileOpen((prev) => !prev)}
              >
                <span>Blog</span>
                {isBlogMobileOpen ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>

              {isBlogMobileOpen && (
                <div className="ml-4 space-y-2">
                  <Link href="/blogs" className="block text-sm text-gray-600">
                    All Blogs
                  </Link>

                  {user?.userType === "recruiter" && (
                    <Link
                      href="/blogs/blogPost"
                      className="block text-sm text-gray-600"
                    >
                      Blog Post
                    </Link>
                  )}
                </div>
              )}
            </div>

            <div>
              <button
                className="flex justify-between items-center w-full text-left text-gray-700 py-2"
                onClick={() => setIsPagesMobileOpen((prev) => !prev)}
              >
                <span>Pages</span>
                {isPagesMobileOpen ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>

              {isPagesMobileOpen && (
                <div className="ml-4 space-y-2">
                  {user?.userType === "recruiter" && (
                    <Link
                      href={ `/myjobposts`}
                      className="block text-sm text-gray-600"
                    >
                      My Job Posts
                    </Link>
                  )}
                </div>
              )}
            </div>

            <hr />

            {!user ? (
              <>
                <Link href="/auth/register">
                  <button className="w-full bg-[#3c65f5] text-white py-2 rounded-md">
                    Register
                  </button>
                </Link>

                <Link href="/auth/login">
                  <button className="w-full bg-[#3c65f5] text-white py-2 rounded-md">
                    Sign in
                  </button>
                </Link>
              </>
            ) : (
              <button
                onClick={() => Logout()}
                className="w-full bg-[#3c65f5] text-white py-2 rounded-md"
              >
                Logout
              </button>
            )}

            {user && user.userType === "recruiter" && (
              <Link href="/jobpost">
                <button className="bg-[#3c65f5] w-full text-white px-5 py-2 rounded-md hover:bg-[#05264e] transition">
                  Post a Job
                </button>
              </Link>
            )}

            {user && user.userType === "jobseeker" && (
              <Link href="/dashboard">
                <button className="bg-[#3c65f5] w-full text-white px-5 py-2 rounded-md hover:bg-[#05264e] transition">
                  Dashboard
                </button>
              </Link>
            )}
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
