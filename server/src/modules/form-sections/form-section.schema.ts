import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { FormSectionStatus } from "src/modules/form-sections/form-section.enums";

export type FormSectionDoc = FormSection & Document;

@Schema({ timestamps: true })
export class FormSection {
  @Prop({ required: true })
  formId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  key: string;

  @Prop({ default: 0 })
  order: number;

  @Prop({ default: FormSectionStatus.DRAFT, enum: FormSectionStatus })
  status: FormSectionStatus;
}

const FormSectionSchema = SchemaFactory.createForClass(FormSection);

FormSectionSchema.index({
  name: "text",
  key: "text",
});

export { FormSectionSchema };
