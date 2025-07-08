"use client";
import React from 'react'
import { usePathname } from 'next/navigation'
import Header from './Header';

const HeaderWrapper = () => {

    const pathname = usePathname();
    const hideHeader = pathname.startsWith("/auth");
    
  return (
    <div>
      {!hideHeader && (
        <div className="h-16 ">
          <Header/>
        </div>
        
        )}
    </div>
  )
}

export default HeaderWrapper
