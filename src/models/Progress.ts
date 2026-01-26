import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProgress extends Document {
    user: mongoose.Types.ObjectId;
    date: Date; // Normalized to midnight
    tasksCompleted: number;
    tasksAssigned: number;
    minutesStudied: number;
    mood?: 'productive' | 'tired' | 'stressed' | 'neutral';
    efficiency: number; // 0-100%
}

const ProgressSchema: Schema<IProgress> = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        date: { type: Date, required: true },
        tasksCompleted: { type: Number, default: 0 },
        tasksAssigned: { type: Number, default: 0 },
        minutesStudied: { type: Number, default: 0 },
        mood: { type: String, enum: ['productive', 'tired', 'stressed', 'neutral'] },
        efficiency: { type: Number, default: 0 },
    },
    { timestamps: true }
);

ProgressSchema.index({ user: 1, date: -1 });

const Progress: Model<IProgress> = mongoose.models.Progress || mongoose.model<IProgress>('Progress', ProgressSchema);
export default Progress;
