import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Question } from "./question.schema";

export type FormSectionDocument = FormSection & Document;

@Schema({ timestamps: true })
export class FormSection {
  @Prop({ required: true })
  title: string;

  @Prop({ default: 0 })
  order: number;

  @Prop({ type: [Types.ObjectId], ref: "Question", default: [] })
  questions: Question[];

  @Prop({ type: Object, default: null })
  condition: {
    dependsOn: string;
    operator: "equals" | "notEquals";
    value: any;
  } | null;
}

export const FormSectionSchema = SchemaFactory.createForClass(FormSection);
