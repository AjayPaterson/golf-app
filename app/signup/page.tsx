"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })

            const data = await response.json()

            if (!response.ok) {
                setError(data.error || 'Something went wrong')
                return
            }

            router.push('/login')
        } catch (err) {
            setError('Something went wrong, please try again')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <h1>Sign Up</h1>
            {error && <p style={{ color: 'red'}}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Signing up...' : 'Sign Up'}
                </button>
            </form>
        </div>
    ) 
}