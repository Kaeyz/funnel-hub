import { BadRequestException, Injectable } from "@nestjs/common";
import { LeadsRepository } from "./leads.repository";
import { GetLeadsDto, LeadsInputDto } from "./leads.dto";
import { buildResponse } from "src/utils/response-builder";
import { LeadEntity } from "./leads.entity";

@Injectable()
export class LeadsService {
  constructor(private readonly repo: LeadsRepository) {}

  async createNewLead(data: LeadsInputDto) {
    const lead = await this.repo.create(data);
    return buildResponse(lead.toObject(), LeadEntity, "Lead created successfully");
  }

  async getAllLeads(query: GetLeadsDto) {
    const leads = await this.repo.getAll(query);
    return buildResponse(leads, LeadEntity);
  }
  async getLead(id: string) {
    const lead = await this.repo.findById(id);
    return buildResponse(lead?.toObject(), LeadEntity);
  }

  async updateLeadData(id: string, data: Record<string, string>) {
    const leadExist = await this.repo.findById(id);
    if (!leadExist) throw new BadRequestException(`Lead with id:${id} not found`);

    const updatedLead = await this.repo.updateById(id, {
      formId: leadExist.formId,
      userName: leadExist.userName,
      formData: { ...leadExist.formData, ...data },
      formStructure: leadExist.formStructure,
    });
    return buildResponse(updatedLead, LeadEntity, "Lead updated successfully");
  }
}
