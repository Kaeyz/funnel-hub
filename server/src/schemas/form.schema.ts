import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { FormSection } from "./form-section.schema";
import { FormStatus } from "src/modules/forms/form.enums";

export type FormDoc = Form & Document;

@Schema({ timestamps: true, versionKey: false })
export class Form {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  key: string;

  @Prop({ default: FormStatus.DRAFT, enum: FormStatus })
  status: FormStatus;

  @Prop({ type: [Types.ObjectId], ref: "FormSection", default: [] })
  sections: FormSection[];
}

const FormSchema = SchemaFactory.createForClass(Form);

FormSchema.index({
  name: "text",
  key: "text",
});

export { FormSchema };
