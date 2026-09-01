import mongoose, { Schema } from 'mongoose';
const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    team: { type: String, required: true },
    streak: { type: Number, default: 0 },
}, { collection: 'users' });
const TeamSchema = new Schema({
    name: { type: String, required: true, unique: true },
    members: { type: Number, required: true },
    score: { type: Number, required: true },
    focus: { type: String, default: 'performance' },
}, { collection: 'teams' });
const ActivitySchema = new Schema({
    userId: { type: Schema.Types.Mixed, required: true },
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    calories: { type: Number, required: true },
    date: { type: Schema.Types.Mixed, required: true },
}, { collection: 'activities' });
const LeaderboardEntrySchema = new Schema({
    rank: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    score: { type: Number, required: true },
}, { collection: 'leaderboard' });
const WorkoutSchema = new Schema({
    title: { type: String, required: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    duration: { type: Number, required: true },
    focus: { type: String, required: true },
    equipment: { type: [String], default: [] },
}, { collection: 'workouts' });
export const User = mongoose.models.User || mongoose.model('User', UserSchema);
export const Team = mongoose.models.Team || mongoose.model('Team', TeamSchema);
export const Activity = mongoose.models.Activity || mongoose.model('Activity', ActivitySchema);
export const LeaderboardEntry = mongoose.models.LeaderboardEntry || mongoose.model('LeaderboardEntry', LeaderboardEntrySchema);
export const Workout = mongoose.models.Workout || mongoose.model('Workout', WorkoutSchema);
