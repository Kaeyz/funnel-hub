import { Body, Controller, Get, Param, Patch, Post, Put, Query } from "@nestjs/common";
import { FormsService } from "./forms.service";
import { FormInputDto, FormStatusInputDto, GetFormsDto } from "./form.dto";

@Controller("forms")
export class FormsController {
  constructor(private service: FormsService) {}

  @Post()
  createForm(@Body() body: FormInputDto) {
    return this.service.createNewForm(body);
  }

  @Get()
  getAllForms(@Query() query: GetFormsDto) {
    return this.service.getAllForms(query);
  }

  @Put(":id")
  updateForm(@Param() param: { id: string }, @Body() body: FormInputDto) {
    return this.service.updateForm(param.id, body);
  }

  @Patch(":id/status")
  updateFormStatus(@Param() param: { id: string }, @Body() body: FormStatusInputDto) {
    return this.service.updateFormStatus(param.id, body);
  }
}
