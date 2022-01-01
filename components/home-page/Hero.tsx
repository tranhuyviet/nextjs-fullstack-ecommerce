import React from 'react'
import Image from 'next/image'

const Hero = () => {
    return (
        <section className="shadow-md">
            <div className="relative md:bg-hero-home h-[calc(100vh-64px)] object-cover object-center bg-center bg-cover bg-fixed bg-no-repeat flex justify-center items-center">
                <img src="/images/merry.webp" alt="hero" className="md:hidden absolute inset-0 w-screen h-[calc(100vh-64px)] object-cover object-top" />
                <div className="text-center md:-mt-44">
                    <h1 className=" font-satisfy text-8xl text-red-100 md:text-heroTitle drop-shadhow-2xl animate-pulse">Happy New Year</h1>
                    <p className="font-satisfy text-8xl mt-8 md:text-heroSubtitle text-red-100 drop-shadow-2xl animate-pulse">2022</p>
                </div>
            </div>
        </section>
    )
}

export default Hero
