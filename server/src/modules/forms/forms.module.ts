import { Module } from "@nestjs/common";
import { FormsService } from "./forms.service";
import { FormsController } from "./forms.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Form, FormSchema } from "src/schemas/form.schema";
import { FormRepository } from "./form.repository";

@Module({
  imports: [MongooseModule.forFeature([{ name: Form.name, schema: FormSchema }])],
  providers: [FormsService, FormRepository],
  controllers: [FormsController],
})
export class FormsModule {}
