import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { dbConn } from '@utils/database';
import User from '@models/users';

const handler = NextAuth({
    session: {
        strategy: 'jwt',
        maxAge: 60 * 60 * 12
    },
    pages: {
        signIn: '/user-login',
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials, req) {
                await dbConn()
                const user = await User.findOne({ email: credentials?.email }).exec();


                const passwordCorrect = user?.password === credentials.password

                console.log({ passwordCorrect });

                if (passwordCorrect) {
                    return {

                        id: user._id,
                        email: user.email,
                    };
                }

                return null;
            },
        }),
    ],
});

export { handler as GET, handler as POST };