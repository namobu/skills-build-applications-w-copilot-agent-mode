import { Schema, model } from 'mongoose';

const activitySchema = new Schema(
  {
    userEmail: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    distanceKm: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    loggedAt: { type: Date, required: true },
  },
  { timestamps: true }
);

export const Activity = model('Activity', activitySchema);
