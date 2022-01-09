import React from 'react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'

const LoginMenu = () => {
    const { data: session } = useSession()
    const user = session?.user

    // console.log('USER', user)
    const handleLogout = async () => {
        try {
            signOut()
            // router.push('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="absolute top-7 border-2 border-gray-800  p-6 mt-4 bg-white w-[320px] z-40" style={{ right: -2 }}>
            <div className="relative">
                {/* if not logged in */}
                {!session && (
                    <>
                        <Link href="/login"><a className="inline-block w-full btn">Login</a></Link>
                        <p className="mt-6 text-base"><Link href="/register"><a className="text-indigo-600">Register now</a></Link>.  It only takes a minute.</p>
                    </>
                )}

                {/* if logged in */}
                {session && (
                    <>
                        <div className="flex items-center pb-3 border-b">
                            <img src={user!.image || 'https://res.cloudinary.com/dzaxf70c4/image/upload/v1636489332/avatar_tcj5dx.png'} alt="avatar" className="w-[60px] h-[60px] rounded-full " />
                            <div className="ml-3 ">
                                <h2 className="text-base font-semibold">{user!.name}</h2>
                                <p className="text-gray-500">[{user?.role}]</p>
                            </div>
                        </div>
                        <div>
                            <Link href="/user/profile"><a className="menuLink">Edit Profile</a></Link>
                            <Link href="/user/change-password"><a className="menuLink">Change Password</a></Link>
                            {user!.role === "admin" ? (
                                <Link href="/user/dashboard"><a className="menuLink">Dashboard</a></Link>
                            ) : null}
                        </div>
                        <div className="h-[1px] w-full bg-gray-200 mt-4 mb-6" />
                        <button className="w-full btn" onClick={handleLogout}>Logout</button>
                    </>
                )}
            </div>
        </div>
    )
}

export default LoginMenu

