import NextAuth from 'next-auth';

declare module 'next-auth' {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            _id: string;
            name: string;
            email: string;
            image: string;
            role: string;
            banned: boolean;
            token: string;
            provider: string;
        };
    }
}

export { Session };
