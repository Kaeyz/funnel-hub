import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { FormsService } from "./forms.service";
import { FormInputDto, GetFormsDto } from "./form.dto";

@Controller("forms")
export class FormsController {
  constructor(private service: FormsService) {}

  @Post()
  createForm(@Body() body: FormInputDto) {
    return this.service.createNewForm(body);
  }

  @Get()
  getAllForms(@Query() getFormQuery: GetFormsDto) {
    return this.service.getAllForms(getFormQuery);
  }
}
