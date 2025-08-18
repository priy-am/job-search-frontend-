"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

export default function SessionMonitor() {
  const [authChecked, setAuthChecked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const lastActivityTimeRef = useRef<number>(Date.now());
  const hasLoggedOutRef = useRef(false);
  const router = useRouter();

  // 1. Check if user is logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/refresh`, {
          method: "GET",
          credentials: "include",
        });

        setIsLoggedIn(res.ok);
      } catch (error) {
        setIsLoggedIn(false);
      } finally {
        setAuthChecked(true);
      }
    };

    checkAuth();
  }, []);

  // 2. Monitor inactivity after confirming login
  useEffect(() => {
    if (!authChecked || !isLoggedIn) return;

    const handleUserActivity = () => {
      lastActivityTimeRef.current = Date.now();
      hasLoggedOutRef.current = false;
      localStorage.removeItem("isLoggedOut");
    };

    // Attach activity listeners
    const events = ["mousemove", "keydown", "scroll", "touchstart"];
    events.forEach(event => window.addEventListener(event, handleUserActivity));

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = now - lastActivityTimeRef.current;

      if (elapsed > 10 * 1000 && !hasLoggedOutRef.current) {
        hasLoggedOutRef.current = true;
        localStorage.setItem("isLoggedOut", "true");
        toast("You are inactive. Logging out...");

        // Cleanup
        events.forEach(event => window.removeEventListener(event, handleUserActivity));
        clearInterval(interval);

        setTimeout(() => {
          router.push("/auth/login");
        }, 1000);
      }
    }, 2000); // Check every 2 seconds

    return () => {
      clearInterval(interval);
      events.forEach(event => window.removeEventListener(event, handleUserActivity));
    };
  }, [authChecked, isLoggedIn]);

  return <ToastContainer />;
}
