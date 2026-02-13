import { Module } from "@nestjs/common";
import { FormSectionsService } from "./form-sections.service";
import { FormSectionsController } from "./form-sections.controller";
import { FormSection, FormSectionSchema } from "src/modules/form-sections/form-section.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { FormSectionRepository } from "./form-section.repository";

@Module({
  imports: [MongooseModule.forFeature([{ name: FormSection.name, schema: FormSectionSchema }])],
  providers: [FormSectionsService, FormSectionRepository],
  controllers: [FormSectionsController],
  exports: [FormSectionsService],
})
export class FormSectionsModule {}
