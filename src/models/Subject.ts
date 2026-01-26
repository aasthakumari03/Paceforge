import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITopic {
    name: string;
    status: 'pending' | 'completed' | 'needs_revision';
    priority: 'high' | 'medium' | 'low';
    lastStudied?: Date;
}

export interface ISubject extends Document {
    user: mongoose.Types.ObjectId;
    name: string;
    code?: string;
    syllabus: ITopic[];
    targetGrade?: string;
    color?: string; // For UI distinction
}

const TopicSchema = new Schema({
    name: { type: String, required: true },
    status: {
        type: String,
        enum: ['pending', 'completed', 'needs_revision'],
        default: 'pending'
    },
    priority: {
        type: String,
        enum: ['high', 'medium', 'low'],
        default: 'medium'
    },
    lastStudied: { type: Date },
});

const SubjectSchema: Schema<ISubject> = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        name: { type: String, required: true },
        code: { type: String },
        syllabus: [TopicSchema],
        targetGrade: { type: String },
        color: { type: String, default: '#3b82f6' }, // Default blue-500
    },
    { timestamps: true }
);

const Subject: Model<ISubject> = mongoose.models.Subject || mongoose.model<ISubject>('Subject', SubjectSchema);
export default Subject;
