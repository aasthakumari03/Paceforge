'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Plus, Trash2 } from 'lucide-react';

export default function ProfileSetupPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        collegeName: '',
        year: '1st',
        semester: 1,
        branch: '',
        targetCGPA: '',
        dailyStudyHours: '',
    });

    const [subjects, setSubjects] = useState([{ name: '', code: '', targetGrade: '' }]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubjectChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const newSubjects = [...subjects];
        // @ts-ignore
        newSubjects[index][e.target.name] = e.target.value;
        setSubjects(newSubjects);
    };

    const addSubject = () => {
        setSubjects([...subjects, { name: '', code: '', targetGrade: '' }]);
    };

    const removeSubject = (index: number) => {
        const newSubjects = subjects.filter((_, i) => i !== index);
        setSubjects(newSubjects);
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/user/setup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    ...formData,
                    semester: Number(formData.semester),
                    targetCGPA: Number(formData.targetCGPA),
                    dailyStudyHours: Number(formData.dailyStudyHours),
                    subjects
                }),
            });

            if (!res.ok) throw new Error('Failed to save profile');

            router.push('/dashboard');
        } catch (error) {
            alert('Error saving profile');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-2xl mx-auto space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900">Let's set up your profile</h1>
                    <p className="text-gray-500 mt-2">Help us tailor your study plan</p>
                </div>

                {step === 1 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Academic Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Input
                                name="collegeName"
                                label="College Name"
                                value={formData.collegeName}
                                onChange={handleInputChange}
                                placeholder="e.g. IIT Delhi"
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                                    <select
                                        name="year"
                                        value={formData.year}
                                        onChange={handleInputChange}
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="1st">1st Year</option>
                                        <option value="2nd">2nd Year</option>
                                        <option value="3rd">3rd Year</option>
                                        <option value="4th">4th Year</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
                                    <Input
                                        name="semester"
                                        type="number"
                                        min="1"
                                        max="8"
                                        value={formData.semester}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <Input
                                name="branch"
                                label="Branch / Major"
                                value={formData.branch}
                                onChange={handleInputChange}
                                placeholder="e.g. Computer Science"
                            />

                            <div className="pt-4 flex justify-end">
                                <Button onClick={() => setStep(2)}>Next: Goals</Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {step === 2 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Study Goals</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Input
                                name="targetCGPA"
                                label="Target CGPA"
                                type="number"
                                step="0.01"
                                value={formData.targetCGPA}
                                onChange={handleInputChange}
                                placeholder="e.g. 9.5"
                            />
                            <Input
                                name="dailyStudyHours"
                                label="Daily Study Hours Available"
                                type="number"
                                value={formData.dailyStudyHours}
                                onChange={handleInputChange}
                                placeholder="e.g. 4"
                            />

                            <div className="pt-4 flex justify-between">
                                <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                                <Button onClick={() => setStep(3)}>Next: Subjects</Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {step === 3 && (
                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle>Your Subjects</CardTitle>
                                <Button size="sm" onClick={addSubject} variant="outline" className="gap-2">
                                    <Plus size={16} /> Add Subject
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {subjects.map((sub, index) => (
                                <div key={index} className="flex gap-4 items-end bg-gray-50 p-4 rounded-lg">
                                    <div className="flex-1 space-y-2">
                                        <Input
                                            name="name"
                                            placeholder="Subject Name"
                                            value={sub.name}
                                            onChange={(e) => handleSubjectChange(index, e)}
                                        />
                                        <div className="flex gap-2">
                                            <Input
                                                name="code"
                                                placeholder="Code (opt)"
                                                value={sub.code}
                                                onChange={(e) => handleSubjectChange(index, e)}
                                                className="w-1/3"
                                            />
                                            <Input
                                                name="targetGrade"
                                                placeholder="Target Grade"
                                                value={sub.targetGrade}
                                                onChange={(e) => handleSubjectChange(index, e)}
                                                className="w-1/3"
                                            />
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeSubject(index)}
                                        className="text-red-500 hover:text-red-700 hover:bg-red-50 h-10 w-10 p-0"
                                        disabled={subjects.length === 1}
                                    >
                                        <Trash2 size={18} />
                                    </Button>
                                </div>
                            ))}

                            <div className="pt-4 flex justify-between">
                                <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
                                <Button onClick={handleSubmit} isLoading={isLoading}>Complete Setup</Button>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
