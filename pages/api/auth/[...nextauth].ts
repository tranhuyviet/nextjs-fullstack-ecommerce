import NextAuth from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import axios from 'axios';

const url =
    process.env.NODE_ENV === 'production'
        ? 'https://nextjs-fullstack-ecommerce.vercel.app/api'
        : 'http://localhost:3000/api';

export default NextAuth({
    providers: [
        CredentialProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
                user: {},
            },
            authorize: async (credentials, req) => {
                const values = {
                    email: credentials?.email,
                    password: credentials?.password,
                };
                // console.log('credentials', credentials);
                try {
                    // update profile
                    if (
                        credentials?.user &&
                        !credentials?.email &&
                        !credentials?.password
                    ) {
                        return JSON.parse(credentials.user);
                    } else {
                        // register or login
                        const { data } = await axios.post(
                            url + '/users/login',
                            values
                        );
                        const user = data.data;
                        // console.log(user);
                        if (user && data.status === 'success') return user;
                    }
                    return null;
                } catch (error) {
                    // console.log(error);
                    console.log('ERROR LOGIN', error?.response?.data?.errors);
                    throw new Error(
                        JSON.stringify(error?.response?.data?.errors)
                    );
                }
            },
        }),
    ],
    callbacks: {
        signIn: async ({ user, account }) => {
            // {
            //     console.log('SIGNIN: ', {
            //         user,
            //         account,
            //     });
            // }
            user.provider = account.provider;

            // console.log('USER:', user);

            return true;
        },
        jwt: ({ token, user, account }) => {
            // first time jwt callback is run, user object is available
            // console.log('JWT: ', { token, user });
            if (user && (token.user = user)) {
                token._id = user._id;
                token.role = user.role;
                token.banned = user.banned;
                token.token = user.token;
                token.provider = user.provider;
            }

            return token;
        },
        session: ({ session, token }) => {
            // console.log('SESSION: ', { session, token });
            if (token) {
                session.user._id = token._id as string;
                session.user.role = token.role as string;
                session.user.banned = token.banned as boolean;
                session.user.token = token.token as string;
                session.user.provider = token.provider as string;
            }
            // console.log('session:', session);
            return session;
        },
    },
    secret: process.env.JWT_SECRET,
    jwt: {
        secret: process.env.JWT_SECRET,
    },
    pages: {
        signIn: '/login',
    },
});
