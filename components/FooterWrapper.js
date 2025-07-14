"use client";
import React from 'react'
import { usePathname } from 'next/navigation'
import Footer from './Footer';


const FooterWrapper = () => {

    const pathname = usePathname();
    const hideFooter = pathname.startsWith("/auth");
    
  return (
    <div>
      {!hideFooter && (
        <div className="h-16 ">
          <Footer/>
        </div>
        
        )}
    </div>
  )
}

export default FooterWrapper
