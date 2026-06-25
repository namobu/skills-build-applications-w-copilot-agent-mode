import { Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    difficulty: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    equipment: { type: [String], required: true },
    focusAreas: { type: [String], required: true },
    coachNotes: { type: String, required: true },
  },
  { timestamps: true }
);

export const Workout = model('Workout', workoutSchema);
