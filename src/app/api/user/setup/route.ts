import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Subject from '@/models/Subject';
import { getUserIdFromRequest } from '@/lib/auth';

export async function POST(request: Request) {
    try {
        const userId = getUserIdFromRequest(request);
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const {
            collegeName,
            year,
            semester,
            branch,
            targetCGPA,
            dailyStudyHours,
            subjects
        } = await request.json();

        if (!subjects || !Array.isArray(subjects) || subjects.length === 0) {
            return NextResponse.json({ error: 'At least one subject is required' }, { status: 400 });
        }

        await dbConnect();

        // 1. Update User Profile
        await User.findByIdAndUpdate(userId, {
            collegeName,
            year,
            semester,
            branch,
            targetCGPA,
            dailyStudyHours,
        });

        // 2. Create Subjects
        // First, delete existing subjects to allow clean setup/reset (optional choice, but good for setup flow)
        await Subject.deleteMany({ user: userId });

        const subjectDocs = subjects.map((sub: any) => ({
            user: userId,
            name: sub.name,
            code: sub.code,
            targetGrade: sub.targetGrade,
            syllabus: [] // Initialize empty syllabus topics
        }));

        await Subject.insertMany(subjectDocs);

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error) {
        console.error('Setup Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
