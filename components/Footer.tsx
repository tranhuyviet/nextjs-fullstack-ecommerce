import React from 'react'
import Link from 'next/link'

const Footer = () => {
    const year = new Date().getFullYear()
    return (
        <footer className="h-16 flex justify-center items-center bg-gray-800">
            <p className="text-gray-50 font-poppins text-sm">{`Copyright © ${year} by `}<a href="https://www.viet.fi" className="font-bold">Viet Tran</a></p>
        </footer>
    )
}

export default Footer
