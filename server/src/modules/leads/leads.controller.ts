import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { LeadsService } from "./leads.service";
import { GetLeadsDto, LeadsInputDto } from "./leads.dto";

@Controller("leads")
export class LeadsController {
  constructor(private service: LeadsService) {}

  @Post()
  createLead(@Body() body: LeadsInputDto) {
    return this.service.createNewLead(body);
  }

  @Get()
  getAllLeads(@Query() query: GetLeadsDto) {
    return this.service.getAllLeads(query);
  }

  @Get(":id")
  getAllLead(@Param() param: { id: string }) {
    return this.service.getLead(param.id);
  }
}
