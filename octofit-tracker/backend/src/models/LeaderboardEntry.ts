import { Schema, model } from 'mongoose';

const leaderboardEntrySchema = new Schema(
  {
    rank: { type: Number, required: true },
    userName: { type: String, required: true },
    teamName: { type: String, required: true },
    points: { type: Number, required: true },
    workoutsCompleted: { type: Number, required: true },
    activeMinutes: { type: Number, required: true },
  },
  { timestamps: true }
);

export const LeaderboardEntry = model('LeaderboardEntry', leaderboardEntrySchema);
