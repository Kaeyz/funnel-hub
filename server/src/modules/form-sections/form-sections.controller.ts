import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { FormSectionsService } from "./form-sections.service";
import { FormSectionInputDto, GetFormSectionsDto } from "./form-section.dto";

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
}
