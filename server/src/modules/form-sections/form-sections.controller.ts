import { Body, Controller, Get, Param, Patch, Post, Put, Query } from "@nestjs/common";
import { FormSectionsService } from "./form-sections.service";
import { FormSectionInputDto, FormSectionStatusInputDto, GetFormSectionsDto } from "./form-section.dto";

@Controller("form-sections")
export class FormSectionsController {
  constructor(private service: FormSectionsService) {}

  @Post()
  createFormSection(@Body() body: FormSectionInputDto) {
    return this.service.createNewFormSection(body);
  }

  @Get()
  getAllFormSections(@Query() query: GetFormSectionsDto) {
    return this.service.getAllFormSections(query);
  }

  @Put(":id")
  updateForm(@Param() param: { id: string }, @Body() body: FormSectionInputDto) {
    return this.service.updateFormSection(param.id, body);
  }

  @Patch(":id/status")
  updateFormStatus(@Param() param: { id: string }, @Body() body: FormSectionStatusInputDto) {
    return this.service.updateFormSectionStatus(param.id, body);
  }
}
