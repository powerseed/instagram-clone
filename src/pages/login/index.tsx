import { FormEvent } from 'react'
import { useRouter } from 'next/router'

export default function Login() {
    const router = useRouter()

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const username = formData.get('username')
        const password = formData.get('password')

        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        })

        if (response.ok) {
            router.push('/')
        } else {
            // Handle errors
        }
    }

    return (
        <div>
            <a href="/api/auth/login">Login</a>
        </div>
    )
}