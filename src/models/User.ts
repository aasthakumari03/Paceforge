import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    passwordHash: string;
    collegeName: string;
    year: '1st' | '2nd' | '3rd' | '4th';
    semester: number;
    branch: string;
    targetCGPA: number;
    dailyStudyHours: number;
    streaks: {
        current: number;
        highest: number;
        lastActiveDate: Date;
    };
    gamification: {
        points: number;
        badges: string[];
    };
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        passwordHash: { type: String, required: true },
        collegeName: { type: String, default: '' },
        year: { type: String, enum: ['1st', '2nd', '3rd', '4th'], default: '1st' },
        semester: { type: Number, default: 1 },
        branch: { type: String, default: '' },
        targetCGPA: { type: Number, default: 0 },
        dailyStudyHours: { type: Number, default: 2 },
        streaks: {
            current: { type: Number, default: 0 },
            highest: { type: Number, default: 0 },
            lastActiveDate: { type: Date, default: Date.now },
        },
        gamification: {
            points: { type: Number, default: 0 },
            badges: { type: [String], default: [] },
        },
    },
    { timestamps: true }
);

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default User;
