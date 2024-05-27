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
}