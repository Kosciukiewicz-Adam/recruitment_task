'use client'
import EmptyListLabel from "@/components/EmptyListLabel";
import React, { useState } from "react";

interface navLink {
  name: string;
  link: string;
}


export default function Home() {
  const [navLinks, setNavLinks] = useState<navLink[]>([])
  return (
    <div className="font-[family-name:var(--font-inter)] w-[100%] h-[100%] bg-[#f5f4f4] py-[30px] px-[24px]">
      {navLinks.length ? (
        <></>
      ) : (
        <EmptyListLabel
          title="Menu jest puste"
          subtitle="W tym menu nie ma jeszcze żadnych linków"
          buttonText="Dodaj pozycje menu"
        />
      )
      }
    </div >
  );
}
