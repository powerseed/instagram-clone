import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import TwitterProvider from "next-auth/providers/twitter"

export const authOptions = {
    providers: [
        GithubProvider(
            {
                clientId: String(process.env.GITHUB_ID),
                clientSecret: String(process.env.GITHUB_SECRET),
            }
        ),
        GoogleProvider(
            {
                clientId: String(process.env.GOOGLE_CLIENT_ID),
                clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
            }
        ),
        TwitterProvider(
            {
                clientId: String(process.env.TWITTER_CLIENT_ID),
                clientSecret: String(process.env.TWITTER_CLIENT_SECRET),
                version: "2.0",
            }
        ),
    ],
    pages: {
        signIn: "/signin",
        error: '/error',
    },
    callbacks: {
        async signIn({ user, account }: { user: any, account: any }) {
            const userId = account.provider + '_' + user.id;

            const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/user/upsert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    avatarUrl: user.image,
                    username: user.name
                }),
            });

            if (!response.ok) {
                return false;
            }

            user.id = userId;

            return true;
        },
        async session({ session, token }: { session: any, token: any }) {
            session.user.id = token.sub;
            return session;
        }
    },
}