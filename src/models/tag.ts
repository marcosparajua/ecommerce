import mongoose, { Document, Model } from 'mongoose';

interface ITag extends Document {
  name: string;
  count: number;
}

const tagSchema = new mongoose.Schema<ITag>({
  name: { type: String, required: true },
  count: { type: Number, default: 0 },
});

export const Tag: Model<ITag> = mongoose.model<ITag>('Tag', tagSchema);
