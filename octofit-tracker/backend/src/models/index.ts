import mongoose, { Schema } from 'mongoose';

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  team: string;
  streak: number;
}

export interface ITeam extends mongoose.Document {
  name: string;
  members: number;
  score: number;
  focus: string;
}

export interface IActivity extends mongoose.Document {
  userId: mongoose.Types.ObjectId | string;
  type: string;
  duration: number;
  calories: number;
  date: Date | string;
}

export interface ILeaderboardEntry extends mongoose.Document {
  rank: number;
  name: string;
  score: number;
}

export interface IWorkout extends mongoose.Document {
  title: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  focus: string;
  equipment: string[];
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    team: { type: String, required: true },
    streak: { type: Number, default: 0 },
  },
  { collection: 'users' }
);

const TeamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true, unique: true },
    members: { type: Number, required: true },
    score: { type: Number, required: true },
    focus: { type: String, default: 'performance' },
  },
  { collection: 'teams' }
);

const ActivitySchema = new Schema<IActivity>(
  {
    userId: { type: Schema.Types.Mixed, required: true },
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    calories: { type: Number, required: true },
    date: { type: Schema.Types.Mixed, required: true },
  },
  { collection: 'activities' }
);

const LeaderboardEntrySchema = new Schema<ILeaderboardEntry>(
  {
    rank: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    score: { type: Number, required: true },
  },
  { collection: 'leaderboard' }
);

const WorkoutSchema = new Schema<IWorkout>(
  {
    title: { type: String, required: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    duration: { type: Number, required: true },
    focus: { type: String, required: true },
    equipment: { type: [String], default: [] },
  },
  { collection: 'workouts' }
);

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export const Team = mongoose.models.Team || mongoose.model<ITeam>('Team', TeamSchema);
export const Activity = mongoose.models.Activity || mongoose.model<IActivity>('Activity', ActivitySchema);
export const LeaderboardEntry =
  mongoose.models.LeaderboardEntry || mongoose.model<ILeaderboardEntry>('LeaderboardEntry', LeaderboardEntrySchema);
export const Workout = mongoose.models.Workout || mongoose.model<IWorkout>('Workout', WorkoutSchema);
