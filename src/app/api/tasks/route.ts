import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Task from '@/models/Task';
import { getUserIdFromRequest } from '@/lib/auth';
import { calculateUrgency } from '@/utils/urgency';

export async function GET(request: Request) {
    try {
        const userId = getUserIdFromRequest(request);
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();

        // Fetch pending tasks sorted by urgency (desc) and deadline (asc)
        const tasks = await Task.find({
            user: userId,
            status: { $in: ['pending', 'in_progress', 'overdue'] }
        }).sort({ urgencyScore: -1, deadline: 1 });

        // Recalculate urgency on read to keep it fresh
        // Ideally this should be a background job, but for MVP this is okay
        const updatedTasks = await Promise.all(tasks.map(async (task) => {
            const newScore = calculateUrgency({
                deadline: task.deadline,
                priority: task.priority,
                isRollover: task.isRollover
            });

            if (task.urgencyScore !== newScore) {
                task.urgencyScore = newScore;
                await task.save();
            }
            return task;
        }));

        return NextResponse.json({ tasks: updatedTasks });
    } catch (error) {
        console.error('Fetch Tasks Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const userId = getUserIdFromRequest(request);
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { subject, topic, type, priority, deadline, estimatedTime } = body;

        if (!subject || !topic || !deadline) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        await dbConnect();

        const urgencyScore = calculateUrgency({
            deadline: new Date(deadline),
            priority: priority || 'medium',
            isRollover: false
        });

        const task = await Task.create({
            user: userId,
            subject,
            topic,
            type: type || 'learning',
            priority: priority || 'medium',
            deadline: new Date(deadline),
            estimatedTime: estimatedTime || 60,
            urgencyScore,
            status: 'pending'
        });

        return NextResponse.json({ task }, { status: 201 });

    } catch (error) {
        console.error('Create Task Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
