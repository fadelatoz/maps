'use client'
import Image from "next/image";
import Map from "@/components/maps";
import { GoogleMaps } from "@/components/GoogleMaps";
import dynamic from "next/dynamic";


export default function Home() {
  return (
    <div className="grid bg-white  items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <Map/>
    </div>
  );
}
