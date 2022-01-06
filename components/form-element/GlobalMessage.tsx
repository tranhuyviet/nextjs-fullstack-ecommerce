import React from 'react'
import classNames from 'classnames'
import Link from 'next/link'

interface IGlobal {
    success?: string
    error?: string
    className?: string
    link?: string
    to?: string
}

const GlobalMessage = ({ success, error, className, link, to }: IGlobal) => {
    return (
        <div className={classNames(`bg-gray-100 shadow border p-4 flex items-center ${className}`, { 'border-red-500': error, 'border-green-500': success })}>
            {error && (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="flex-none w-8 h-8 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <p className="ml-4 text-base">{error}</p>
                </>
            )}
            {success && (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="flex-none w-8 h-8 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div className="ml-4">
                        <p className="text-base">{success}</p>
                        {link && <Link href={to as string}><a className="text-base mt-1 font-semibold block">{link}</a></Link>}
                    </div>
                </>
            )
            }

        </div >
    )
}

export default GlobalMessage
