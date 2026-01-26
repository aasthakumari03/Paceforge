import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Task {
    _id: string;
    topic: string;
    subject: { name: string; color: string } | string; // backend populates subject or just ID
    type: string;
    priority: 'high' | 'medium' | 'low';
    urgencyScore: number;
    deadline: string;
    maxScore?: number; // for calculating urgency visual
}

interface TaskCardProps {
    task: Task;
    onComplete: (id: string) => void;
}

export function TaskCard({ task, onComplete }: TaskCardProps) {
    // Determine urgency color
    let borderColor = 'border-l-4 border-l-green-500';
    if (task.urgencyScore > 80) borderColor = 'border-l-4 border-l-red-600';
    else if (task.urgencyScore > 50) borderColor = 'border-l-4 border-l-yellow-500';

    return (
        <Card className={`mb-3 hover:shadow-md transition-shadow ${borderColor}`}>
            <CardContent className="p-4 flex justify-between items-center">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 uppercase">
                            {typeof task.subject === 'object' ? task.subject.name : 'General'}
                        </span>
                        {task.priority === 'high' && (
                            <span className="text-xs font-bold text-red-600 flex items-center gap-1">
                                <AlertCircle size={12} /> High Priority
                            </span>
                        )}
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">{task.topic}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                        <span className="flex items-center gap-1">
                            <Clock size={14} /> Due: {new Date(task.deadline).toLocaleDateString()}
                        </span>
                        <span>Type: {task.type}</span>
                    </div>
                </div>

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onComplete(task._id)}
                    className="text-green-600 hover:bg-green-50"
                >
                    <CheckCircle size={24} />
                </Button>
            </CardContent>
        </Card>
    );
}
