"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardEntry = void 0;
const mongoose_1 = require("mongoose");
const leaderboardEntrySchema = new mongoose_1.Schema({
    rank: { type: Number, required: true },
    userName: { type: String, required: true },
    teamName: { type: String, required: true },
    points: { type: Number, required: true },
    workoutsCompleted: { type: Number, required: true },
    activeMinutes: { type: Number, required: true },
}, { timestamps: true });
exports.LeaderboardEntry = (0, mongoose_1.model)('LeaderboardEntry', leaderboardEntrySchema);
