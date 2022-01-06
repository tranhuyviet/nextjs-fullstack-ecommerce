import Link from 'next/link'
import Input from '../components/form-element/Input'
import { useFormik } from 'formik'
import axios from 'axios'
import React from 'react'
import GlobalMessage from '../components/form-element/GlobalMessage'

import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { login, setCheckout } from '../redux/slices/authSlice'
import { useRouter } from 'next/router'

import jwtDecode from 'jwt-decode'
import { IUser } from '../redux/slices/authSlice'
import mongoose from 'mongoose'
// import redirect from '../utils/redirect'
import cookie from 'js-cookie'

import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import jwt from 'jsonwebtoken'

interface ILogin {
    email: string
    password: string
    global?: string
}

const LoginPage = () => {
    const isCheckout = useAppSelector(state => state.auth.isCheckout)
    const initialValues: ILogin = {
        email: '',
        password: ''
    }
    const dispatch = useAppDispatch()
    const router = useRouter()

    const { values, handleChange, handleSubmit, errors, setErrors } = useFormik<ILogin>({ initialValues, onSubmit })

    async function onSubmit(values: ILogin) {
        try {
            const { data } = await axios.post('/users/login', values)
            const user = data.data
            // cookie.set('ecommerceJwt', user.token, { expires: 30 })
            dispatch(login(user))
            if (isCheckout) {
                router.push('/user/checkout')
                dispatch(setCheckout(false))
            } else {
                router.push('/')
            }
        } catch (error) {
            setErrors(error.response.data.errors)
        }
    }

    return (
        <main className="container">
            <div className="max-w-lg pt-10 pb-10 mx-auto ">
                <form className="flex flex-col" noValidate onSubmit={handleSubmit}>
                    <div className="flex justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="block w-16 h-16 p-4 text-white bg-gray-700 shadow-xl rounded-2xl" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h1 className="mt-4 text-2xl font-bold tracking-wider text-center uppercase font-poppins">Login</h1>
                    {errors.global &&
                        <GlobalMessage error={errors?.global} className="mt-4" />
                    }
                    <Input label="email" type="email" name="email" value={values.email} onChange={handleChange} error={errors?.email} />
                    <Input label="password" type="password" name="password" value={values.password} onChange={handleChange} error={errors?.password} />
                    <button className="mt-6 btn" type="submit">LOGIN</button>
                    <Link href="/user/forgot-password"><a className="mt-4 text-base text-gray-700 hover:font-semibold">Forgot your password?</a></Link>
                </form>
                <div className="h-[1px] w-[60%] bg-gray-300 mt-10 mx-auto" />
                <div className="mt-8">
                    <h2 className="text-base font-semibold text-center">{`Don't have account?`}</h2>
                    <Link href="/register"><a className="w-full mt-4 btn">Register new account</a></Link>
                </div>

            </div>
        </main>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const token = context.req.cookies.ecommerceJwt

        if (token && token !== 'loggedout') {
            const user = jwt.verify(token, process.env.JWT_SECRET as string) as IUser
            if (user && mongoose.Types.ObjectId.isValid(user._id) && !user.banned) return { redirect: { destination: '/', permanent: false } };
        }

    } catch (error) {
        console.log(error)
    }
    return {
        props: {
            user: {}
        },
    };

}

export default LoginPage
