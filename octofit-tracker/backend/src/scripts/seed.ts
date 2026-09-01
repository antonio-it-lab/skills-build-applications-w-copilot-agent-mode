import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      { name: 'Alicia Chen', email: 'alicia@example.com', team: 'Trailblazers', streak: 12 },
      { name: 'Marcus Lee', email: 'marcus@example.com', team: 'Summit Squad', streak: 9 },
      { name: 'Priya Patel', email: 'priya@example.com', team: 'Peak Pioneers', streak: 15 },
      { name: 'Jordan Kim', email: 'jordan@example.com', team: 'Trailblazers', streak: 7 },
      { name: 'Sofia Ramos', email: 'sofia@example.com', team: 'Summit Squad', streak: 11 },
    ]);

    await Team.insertMany([
      { name: 'Trailblazers', members: 8, score: 1450, focus: 'endurance' },
      { name: 'Summit Squad', members: 6, score: 1320, focus: 'strength' },
      { name: 'Peak Pioneers', members: 7, score: 1495, focus: 'recovery' },
    ]);

    await Activity.insertMany([
      { userId: users[0]._id, type: 'run', duration: 35, calories: 420, date: new Date('2026-09-01') },
      { userId: users[1]._id, type: 'strength', duration: 45, calories: 310, date: new Date('2026-09-01') },
      { userId: users[2]._id, type: 'cycle', duration: 50, calories: 500, date: new Date('2026-09-01') },
      { userId: users[3]._id, type: 'yoga', duration: 20, calories: 180, date: new Date('2026-09-02') },
      { userId: users[4]._id, type: 'hike', duration: 60, calories: 610, date: new Date('2026-09-02') },
    ]);

    await LeaderboardEntry.insertMany([
      { rank: 1, name: 'Priya Patel', score: 2450 },
      { rank: 2, name: 'Alicia Chen', score: 2310 },
      { rank: 3, name: 'Sofia Ramos', score: 2205 },
      { rank: 4, name: 'Jordan Kim', score: 2140 },
      { rank: 5, name: 'Marcus Lee', score: 2065 },
    ]);

    await Workout.insertMany([
      { title: 'HIIT Burn', difficulty: 'advanced', duration: 30, focus: 'cardio', equipment: ['mat', 'timer'] },
      { title: 'Core Stability', difficulty: 'intermediate', duration: 20, focus: 'core', equipment: ['mat'] },
      { title: 'Mobility Flow', difficulty: 'beginner', duration: 15, focus: 'recovery', equipment: ['mat', 'foam roller'] },
      { title: 'Trail Interval Run', difficulty: 'advanced', duration: 40, focus: 'endurance', equipment: ['shoes'] },
      { title: 'Power Ladder', difficulty: 'intermediate', duration: 25, focus: 'strength', equipment: ['ladder', 'bands'] },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
