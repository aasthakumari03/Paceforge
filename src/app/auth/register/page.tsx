'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Home } from 'lucide-react';
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
        const collegeName = formData.get('collegeName');
        const year = formData.get('year');
        const semester = formData.get('semester');
        const branch = formData.get('branch');

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    collegeName,
                    year,
                    semester,
                    branch
                }),
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
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Background with Golden Hour Theme */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-900/40 via-stone-900/60 to-black/80 z-10" />
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 blur-sm"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1627916607164-7b52244ea38e?q=80&w=2574&auto=format&fit=crop")' }}
                />
            </div>

            <Card className="w-full max-w-2xl relative z-20 bg-black/20 backdrop-blur-xl border-white/10 shadow-2xl">
                <CardHeader className="text-center space-y-2">
                    <CardTitle className="text-4xl font-serif font-bold text-amber-100">Join Paceforge</CardTitle>
                    <p className="text-amber-200/60 text-lg font-serif italic">"Craft your academic journey."</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Personal Details */}
                            <div className="space-y-4">
                                <h3 className="text-amber-200/80 text-sm uppercase tracking-widest font-bold border-b border-white/10 pb-2">Personal Info</h3>
                                <Input
                                    name="name"
                                    type="text"
                                    label="Full Name"
                                    labelClassName="text-amber-100/80"
                                    placeholder="John Doe"
                                    required
                                    className="bg-white/5 border-white/10 text-amber-100 placeholder:text-white/20 focus:border-amber-400/50"
                                />
                                <Input
                                    name="email"
                                    type="email"
                                    label="Email Address"
                                    labelClassName="text-amber-100/80"
                                    placeholder="you@college.edu"
                                    required
                                    className="bg-white/5 border-white/10 text-amber-100 placeholder:text-white/20 focus:border-amber-400/50"
                                />
                                <Input
                                    name="password"
                                    type="password"
                                    label="Password"
                                    labelClassName="text-amber-100/80"
                                    placeholder="••••••••"
                                    required
                                    className="bg-white/5 border-white/10 text-amber-100 placeholder:text-white/20 focus:border-amber-400/50"
                                />
                            </div>

                            {/* Academic Details */}
                            <div className="space-y-4">
                                <h3 className="text-amber-200/80 text-sm uppercase tracking-widest font-bold border-b border-white/10 pb-2">Academic Info</h3>
                                <Input
                                    name="collegeName"
                                    type="text"
                                    label="College / University"
                                    labelClassName="text-amber-100/80"
                                    placeholder="e.g. IIT Bobmay"
                                    className="bg-white/5 border-white/10 text-amber-100 placeholder:text-white/20 focus:border-amber-400/50"
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="block text-sm font-medium text-amber-100/80">Year</label>
                                        <div className="relative">
                                            <select
                                                name="year"
                                                className="w-full h-10 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent appearance-none"
                                            >
                                                <option value="1st" className="bg-stone-900">1st Year</option>
                                                <option value="2nd" className="bg-stone-900">2nd Year</option>
                                                <option value="3rd" className="bg-stone-900">3rd Year</option>
                                                <option value="4th" className="bg-stone-900">4th Year</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="block text-sm font-medium text-amber-100/80">Semester</label>
                                        <div className="relative">
                                            <select
                                                name="semester"
                                                className="w-full h-10 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent appearance-none"
                                            >
                                                {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                                                    <option key={sem} value={sem} className="bg-stone-900">Sem {sem}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <Input
                                    name="branch"
                                    type="text"
                                    label="Branch / Major"
                                    labelClassName="text-amber-100/80"
                                    placeholder="e.g. CSE, Mechanical..."
                                    className="bg-white/5 border-white/10 text-amber-100 placeholder:text-white/20 focus:border-amber-400/50"
                                />
                            </div>
                        </div>

                        {error && <div className="p-3 text-sm text-red-200 bg-red-900/30 border border-red-500/30 rounded-md backdrop-blur-sm">{error}</div>}

                        <Button
                            type="submit"
                            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-serif font-bold tracking-wide text-lg py-6 shadow-lg shadow-amber-900/20"
                            isLoading={isLoading}
                        >
                            Start My Journey
                        </Button>

                        <div className="text-center text-sm text-amber-200/50">
                            Already a member?{' '}
                            <Link href="/auth/login" className="text-amber-400 hover:text-amber-300 font-medium transition-colors hover:underline">
                                Log in
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <Link
                href="/"
                className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-amber-600/80 hover:bg-amber-500 backdrop-blur-md text-white shadow-lg shadow-amber-900/40 hover:scale-110 hover:rotate-12 transition-all duration-300 group"
                aria-label="Back to Home"
            >
                <Home size={28} strokeWidth={2.5} />
            </Link>
        </div>
    );
}
