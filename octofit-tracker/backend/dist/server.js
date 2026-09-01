import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models/index.js';
const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
app.use(cors());
app.use(express.json());
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
async function connectDatabase() {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to octofit_db');
    }
    catch (error) {
        console.error('Error connecting to octofit_db:', error);
        process.exit(1);
    }
}
app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        service: 'octofit-tracker-backend',
        database: connectionString,
        apiBaseUrl: baseUrl,
        codespaceName: codespaceName ?? null,
    });
});
app.get(['/api/users', '/api/users/'], async (_req, res) => {
    const users = await User.find({}).lean();
    res.json(users);
});
app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
    const teams = await Team.find({}).lean();
    res.json(teams);
});
app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
    const activities = await Activity.find({}).lean();
    res.json(activities);
});
app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
    const leaderboard = await LeaderboardEntry.find({}).sort({ rank: 1 }).lean();
    res.json(leaderboard);
});
app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
    const workouts = await Workout.find({}).lean();
    res.json(workouts);
});
connectDatabase();
app.listen(port, () => {
    console.log(`OctoFit Tracker API listening on ${baseUrl}`);
});
