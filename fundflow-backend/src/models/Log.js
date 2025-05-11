import { Schema, model } from 'mongoose';

const logSchema = new Schema({
  timestamp: { type: Date, default: Date.now },
  userId: Number,
  input: Object,
  score: Number,
  status: String
});

const Log = model('Log', logSchema);

export default Log; 
