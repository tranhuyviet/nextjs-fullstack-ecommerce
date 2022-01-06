import NextAuth from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import axios from 'axios';

export default NextAuth({
    providers: [
        CredentialProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            authorize: async (credentials, req) => {
                const values = {
                    email: credentials?.email,
                    password: credentials?.password,
                };
                console.log('values', values);
                try {
                    const { data } = await axios.post('/users/login', values);
                    const user = data.data;
                    console.log('USER', user);
                    if (user && data.status === 'success') return user;
                    return null;
                } catch (error) {
                    console.log('ERROR LOGIN', error?.response?.data?.errors);
                    throw new Error(
                        JSON.stringify(error?.response?.data?.errors)
                    );
                }
            },
        }),
    ],
    secret: process.env.JWT_SECRET,
    jwt: {
        secret: process.env.JWT_SECRET,
    },
    pages: {
        signIn: '/login',
    },
});
