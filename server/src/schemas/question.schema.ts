import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type QuestionDocument = Question & Document;

export type QuestionType = "text" | "number" | "select" | "radio" | "checkbox" | "file";

@Schema({ timestamps: true })
export class Question {
  @Prop({ required: true, unique: true })
  key: string;

  @Prop({ required: true })
  label: string;

  @Prop({
    required: true,
    enum: ["text", "number", "select", "radio", "checkbox", "file"],
  })
  type: QuestionType;

  @Prop({ default: false })
  required: boolean;

  @Prop({ type: [String], default: [] })
  options: string[];

  @Prop({ type: Object, default: {} })
  validationRules: Record<string, any>; // e.g., { minLength: 3 }

  @Prop({ type: Object, default: null })
  condition: {
    dependsOn: string;
    operator: "equals" | "notEquals" | "greaterThan" | "lessThan";
    value: any;
  } | null;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
