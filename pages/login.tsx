import Link from 'next/link'
import Input from '../components/form-element/Input'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import GlobalMessage from '../components/form-element/GlobalMessage'

import { useRouter } from 'next/router'

import { GetServerSideProps } from 'next'
import { getSession, signIn, getProviders, getCsrfToken } from 'next-auth/react'
import SubmitButton from '../components/form-element/SubmitButton'

interface ILogin {
    email: string
    password: string
    global?: string
}

const LoginPage = () => {
    const [loading, setLoading] = useState(false)
    const initialValues: ILogin = {
        email: '',
        password: ''
    }

    const router = useRouter()

    const { values, handleChange, handleSubmit, errors, setErrors } = useFormik<ILogin>({ initialValues, onSubmit })

    async function onSubmit(values: ILogin) {
        try {
            setLoading(true)
            await signIn('credentials', { redirect: false, email: values.email, password: values.password })
                .then((error: any) => {
                    if (error) {
                        const errors = JSON.parse(error?.error)
                        setErrors(errors)
                    }

                    if (!error.error) router.push('/')
                })
            setLoading(false)
        } catch (error) {
            setErrors(error?.response?.data?.errors)
            setLoading(false)
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
                    {errors && errors.global &&
                        <GlobalMessage error={errors?.global} className="mt-4" />
                    }
                    <Input label="email" type="email" name="email" value={values.email} onChange={handleChange} error={errors?.email} />
                    <Input label="password" type="password" name="password" value={values.password} onChange={handleChange} error={errors?.password} />
                    <SubmitButton title='login' loading={loading} />
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
    const providers = await getProviders()
    const csrfToken = await getCsrfToken(context)
    const session = await getSession(context)

    if (session) return { redirect: { destination: '/', permanent: false } };
    return {
        props: {
            providers,
            csrfToken
        },
    };
}

export default LoginPage
