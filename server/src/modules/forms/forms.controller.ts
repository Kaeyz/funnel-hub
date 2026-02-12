import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { FormsService } from "./forms.service";
import { CreateFormDto, GetFormsDto } from "./form.dto";

@Controller("forms")
export class FormsController {
  constructor(private formService: FormsService) {}

  @Post()
  createForm(@Body() createFormDto: CreateFormDto) {
    return this.formService.createNewForm(createFormDto);
  }

  @Get()
  getAllForms(@Query() getFormQuery: GetFormsDto) {
    return this.formService.getAllForms(getFormQuery);
  }
}
