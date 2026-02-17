import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type LeadDoc = Lead & Document;

@Schema({ timestamps: true, versionKey: false })
export class Lead {
  @Prop({ required: true })
  userName: string;

  @Prop({ required: true })
  formId: string;

  @Prop({ type: Object, required: true })
  formData: Record<string, string>;

  @Prop({ type: Object, required: true })
  formStructure: Record<string, string[]>;
}

const LeadSchema = SchemaFactory.createForClass(Lead);

LeadSchema.index({ userName: "text" });

export { LeadSchema };
