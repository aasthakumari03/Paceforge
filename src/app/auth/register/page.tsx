'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export default function RegisterPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const formData = new FormData(e.currentTarget);
        const name = formData.get('name');
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            router.push('/profile/setup'); // Redirect to profile setup first
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Create Account</CardTitle>
                    <p className="text-sm text-gray-500 mt-2">Join PaceForge to master your studies</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            name="name"
                            type="text"
                            label="Full Name"
                            placeholder="John Doe"
                            required
                        />
                        <Input
                            name="email"
                            type="email"
                            label="Email"
                            placeholder="you@college.edu"
                            required
                        />
                        <Input
                            name="password"
                            type="password"
                            label="Password"
                            required
                        />

                        {error && <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">{error}</div>}

                        <Button type="submit" className="w-full" isLoading={isLoading}>
                            Sign Up
                        </Button>

                        <div className="text-center text-sm text-gray-500">
                            Already have an account?{' '}
                            <Link href="/auth/login" className="text-blue-600 hover:underline">
                                Log in
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
