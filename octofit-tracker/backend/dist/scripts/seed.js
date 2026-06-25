"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Activity_1 = require("../models/Activity");
const LeaderboardEntry_1 = require("../models/LeaderboardEntry");
const Team_1 = require("../models/Team");
const User_1 = require("../models/User");
const Workout_1 = require("../models/Workout");
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
async function seedDatabase() {
    console.log('Seed the octofit_db database with test data');
    await mongoose_1.default.connect(mongoUri);
    await Promise.all([
        Activity_1.Activity.deleteMany({}),
        LeaderboardEntry_1.LeaderboardEntry.deleteMany({}),
        Team_1.Team.deleteMany({}),
        User_1.User.deleteMany({}),
        Workout_1.Workout.deleteMany({}),
    ]);
    await Team_1.Team.insertMany([
        {
            name: 'Octo Sprinters',
            city: 'San Francisco',
            memberCount: 8,
            weeklyGoalMinutes: 2400,
            motto: 'Ship fast, run faster',
        },
        {
            name: 'Core Contributors',
            city: 'Seattle',
            memberCount: 6,
            weeklyGoalMinutes: 1800,
            motto: 'Small reps, steady gains',
        },
        {
            name: 'Merge Mavericks',
            city: 'Austin',
            memberCount: 7,
            weeklyGoalMinutes: 2100,
            motto: 'Every streak starts today',
        },
    ]);
    await User_1.User.insertMany([
        {
            name: 'Maya Chen',
            email: 'maya.chen@example.com',
            role: 'Team Captain',
            team: 'Octo Sprinters',
            fitnessGoal: 'Improve 10K pace',
        },
        {
            name: 'Jordan Patel',
            email: 'jordan.patel@example.com',
            role: 'Member',
            team: 'Core Contributors',
            fitnessGoal: 'Build strength consistency',
        },
        {
            name: 'Sam Rivera',
            email: 'sam.rivera@example.com',
            role: 'Member',
            team: 'Merge Mavericks',
            fitnessGoal: 'Train for first triathlon',
        },
        {
            name: 'Avery Brooks',
            email: 'avery.brooks@example.com',
            role: 'Coach',
            team: 'Octo Sprinters',
            fitnessGoal: 'Maintain mobility and endurance',
        },
    ]);
    await Activity_1.Activity.insertMany([
        {
            userEmail: 'maya.chen@example.com',
            type: 'Run',
            durationMinutes: 42,
            distanceKm: 8.2,
            caloriesBurned: 520,
            loggedAt: new Date('2026-06-20T13:00:00.000Z'),
        },
        {
            userEmail: 'jordan.patel@example.com',
            type: 'Strength Training',
            durationMinutes: 55,
            distanceKm: 0,
            caloriesBurned: 410,
            loggedAt: new Date('2026-06-21T00:30:00.000Z'),
        },
        {
            userEmail: 'sam.rivera@example.com',
            type: 'Cycling',
            durationMinutes: 75,
            distanceKm: 28.4,
            caloriesBurned: 740,
            loggedAt: new Date('2026-06-22T12:15:00.000Z'),
        },
        {
            userEmail: 'avery.brooks@example.com',
            type: 'Yoga',
            durationMinutes: 35,
            distanceKm: 0,
            caloriesBurned: 160,
            loggedAt: new Date('2026-06-23T14:45:00.000Z'),
        },
    ]);
    await LeaderboardEntry_1.LeaderboardEntry.insertMany([
        {
            rank: 1,
            userName: 'Maya Chen',
            teamName: 'Octo Sprinters',
            points: 1840,
            workoutsCompleted: 18,
            activeMinutes: 640,
        },
        {
            rank: 2,
            userName: 'Sam Rivera',
            teamName: 'Merge Mavericks',
            points: 1725,
            workoutsCompleted: 16,
            activeMinutes: 710,
        },
        {
            rank: 3,
            userName: 'Jordan Patel',
            teamName: 'Core Contributors',
            points: 1510,
            workoutsCompleted: 14,
            activeMinutes: 520,
        },
    ]);
    await Workout_1.Workout.insertMany([
        {
            title: 'Tempo Builder Run',
            category: 'Cardio',
            difficulty: 'Intermediate',
            durationMinutes: 45,
            equipment: ['Running shoes', 'GPS watch'],
            focusAreas: ['Endurance', 'Pacing'],
            coachNotes: 'Start conversational, hold tempo for 18 minutes, then cool down easy.',
        },
        {
            title: 'Desk Reset Mobility',
            category: 'Mobility',
            difficulty: 'Beginner',
            durationMinutes: 20,
            equipment: ['Yoga mat'],
            focusAreas: ['Hips', 'Thoracic spine', 'Hamstrings'],
            coachNotes: 'Move slowly and keep each breath controlled through the full range.',
        },
        {
            title: 'Full Stack Strength Circuit',
            category: 'Strength',
            difficulty: 'Advanced',
            durationMinutes: 50,
            equipment: ['Dumbbells', 'Kettlebell', 'Resistance band'],
            focusAreas: ['Legs', 'Core', 'Shoulders'],
            coachNotes: 'Complete four rounds with 90 seconds recovery between rounds.',
        },
    ]);
    console.log('Seed complete');
}
seedDatabase()
    .catch((error) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
})
    .finally(async () => {
    await mongoose_1.default.disconnect();
});
