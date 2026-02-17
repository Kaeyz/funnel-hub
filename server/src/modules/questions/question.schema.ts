import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { QuestionStatus, QuestionType } from "./question.enums";

export type QuestionDoc = Question & Document;

@Schema({ timestamps: true })
export class Question {
  @Prop({ required: true })
  formSectionId: string;

  @Prop({ required: true })
  key: string;

  @Prop({ default: 0 })
  order: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  label: string;

  @Prop({ required: true, enum: QuestionType, default: QuestionType.TEXT })
  type: QuestionType;

  @Prop({ default: QuestionStatus.DRAFT, enum: QuestionStatus })
  status: QuestionStatus;

  @Prop({ type: Object, default: {} })
  validation: {
    required: boolean;
    min: number;
    max: number;
  };
}

const QuestionSchema = SchemaFactory.createForClass(Question);

QuestionSchema.index({
  label: "text",
  key: "text",
  description: "text",
});

QuestionSchema.index({ label: 1 });
QuestionSchema.index({ key: 1 });
QuestionSchema.index({ description: 1 });

export { QuestionSchema };
