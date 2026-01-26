import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITask extends Document {
    user: mongoose.Types.ObjectId;
    subject: mongoose.Types.ObjectId;
    topic: string;
    type: 'homework' | 'revision' | 'learning' | 'assignment';
    description?: string;
    status: 'pending' | 'in_progress' | 'completed' | 'overdue';
    priority: 'high' | 'medium' | 'low';
    urgencyScore: number; // Calculated field 0-100
    deadline: Date;
    estimatedTime: number; // in minutes
    completedAt?: Date;
    isRollover: boolean; // if true, it was moved from previous day
}

const TaskSchema: Schema<ITask> = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        subject: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
        topic: { type: String, required: true },
        type: {
            type: String,
            enum: ['homework', 'revision', 'learning', 'assignment'],
            required: true
        },
        description: { type: String },
        status: {
            type: String,
            enum: ['pending', 'in_progress', 'completed', 'overdue'],
            default: 'pending'
        },
        priority: {
            type: String,
            enum: ['high', 'medium', 'low'],
            default: 'medium'
        },
        urgencyScore: { type: Number, default: 0 },
        deadline: { type: Date, required: true },
        estimatedTime: { type: Number, default: 30 },
        completedAt: { type: Date },
        isRollover: { type: Boolean, default: false },
    },
    { timestamps: true }
);

// Indexes for faster queries on dashboards
TaskSchema.index({ user: 1, status: 1, deadline: 1 });

const Task: Model<ITask> = mongoose.models.Task || mongoose.model<ITask>('Task', TaskSchema);
export default Task;
