import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { QuestionStatus, QuestionType, ShowConditionOperator } from "./question.enums";

export type QuestionDoc = Question & Document;

@Schema({ timestamps: true })
export class Question {
  @Prop({ required: true })
  formSectionId: string;

  @Prop({ required: true })
  key: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  label: string;

  @Prop({ required: true, enum: QuestionType, default: QuestionType.TEXT })
  type: QuestionType;

  @Prop({ default: QuestionStatus.DRAFT, enum: QuestionStatus })
  status: QuestionStatus;

  @Prop({ type: Object, default: {} })
  validationRules: {
    required: boolean;
    min: number;
    max: number;
  };

  @Prop({ type: Object, default: null })
  showCondition: {
    questionId: string;
    operator: ShowConditionOperator;
    value: any;
  };
}

const QuestionSchema = SchemaFactory.createForClass(Question);

QuestionSchema.index({
  name: "text",
  key: "text",
  description: "text",
});

export { QuestionSchema };
