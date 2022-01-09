import React, { useState } from 'react'
import Input from '../../components/form-element/Input'
import { useFormik } from 'formik'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import { getSession, signIn } from 'next-auth/react'
import { Session } from '../../types/next-auth'
import SubmitButton from '../../components/form-element/SubmitButton'

interface IProfile {
    name?: string
    email?: string
    image?: string
    global?: string
}

const Profile = ({ session }: Session) => {

    const [loading, setLoading] = useState(false)
    const user = session.user

    let initialValues: IProfile = {
        name: user.name,
        email: user.email,
        image: user.image
    }

    const { values, handleChange, handleSubmit, errors, setErrors, setValues } = useFormik<IProfile>({ initialValues, onSubmit })

    async function onSubmit(values: IProfile) {
        console.log('submit: ', values)
        try {
            setLoading(true)
            const { data } = await axios.patch('/users/profile', values)
            if (data.status === 'success') {
                const profileUpdated = data.data
                profileUpdated.token = session.user.token
                await signIn('credentials', { redirect: false, user: JSON.stringify(profileUpdated) })
                    .then((error: any) => {
                        if (error) {
                            const errors = JSON.parse(error?.error)
                            setErrors(errors)
                        }
                    })
            }
            setLoading(false)
        } catch (error) {
            setErrors(error?.response?.data?.errors)
            setLoading(false)
        }
    }

    return (
        <main className="container">
            {session && (
                <div className="max-w-xl p-4 mx-auto">
                    <h1 className="text-2xl font-bold tracking-wider text-center uppercase font-poppins ">My Profile</h1>
                    <div className="flex justify-center mt-6">
                        <img src={values.image || 'https://res.cloudinary.com/dzaxf70c4/image/upload/v1636489332/avatar_tcj5dx.png'} alt="avatar" className="w-[100px] h-[100px]" />
                    </div>
                    <form noValidate onSubmit={handleSubmit}>
                        <Input label="name" type="text" name="name" value={values.name} onChange={handleChange} error={errors?.name} />
                        <Input label="email" type="email" name="email" value={values.email} onChange={handleChange} error={errors?.email} />
                        <Input label="Image Url" type="search" name="image" value={values.image} onChange={handleChange} error={errors?.image} multi={true} className="h-[120px]" />
                        <div className="flex justify-end mt-6 space-x-4">
                            <SubmitButton title="Save" loading={loading} />
                        </div>
                    </form>
                </div>
            )}
        </main>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context)

    if (!session) return { redirect: { destination: '/login', permanent: false } };
    return {
        props: {
            session
        },
    };
}

export default Profile
