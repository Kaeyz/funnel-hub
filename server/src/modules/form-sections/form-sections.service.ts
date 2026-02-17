import { BadRequestException, Injectable } from "@nestjs/common";
import { FormSectionRepository } from "./form-section.repository";
import { FormSectionInputDto, FormSectionStatusInputDto, GetFormSectionsDto } from "./form-section.dto";
import { buildResponse } from "src/utils/response-builder";
import { FormSectionEntity } from "./form-section.entity";

@Injectable()
export class FormSectionsService {
  constructor(private readonly repo: FormSectionRepository) {}

  async createNewFormSection(data: FormSectionInputDto) {
    const formSectionExist = await this.repo.findByKey(data.formId, data.key);
    if (formSectionExist) throw new BadRequestException(`Form Section with key:${data.key} exist`);

    const formSection = await this.repo.create(data);
    return buildResponse(formSection.toObject(), FormSectionEntity, "Form section created successfully");
  }

  async getAllFormSections(query: GetFormSectionsDto) {
    const forms = await this.repo.getAll(query);
    return buildResponse(forms, FormSectionEntity);
  }

  async updateFormSection(id: string, data: FormSectionInputDto) {
    const formSectionExist = await this.repo.findById(id);
    if (!formSectionExist) throw new BadRequestException(`Form section with id:${id} not found`);

    if (data.key !== formSectionExist.key) {
      const formSectionWithKeyExist = await this.repo.findByKey(formSectionExist.formId, data.key);
      if (formSectionWithKeyExist) throw new BadRequestException(`Form section with key:${data.key} exist`);
    }

    const updatedFormSection = await this.repo.updateById(id, data);
    return buildResponse(updatedFormSection, FormSectionEntity, "Form section updated successfully");
  }

  async updateFormSectionStatus(id: string, data: FormSectionStatusInputDto) {
    const formExist = await this.repo.findById(id);
    if (!formExist) throw new BadRequestException(`Form section with id:${id} not found`);

    const updatedFormSection = await this.repo.updateById(id, data);
    return buildResponse(updatedFormSection, FormSectionEntity, "Status updated");
  }

  /*   async deleteFormSection(id: string) {
    const formSectionExist = await this.repo.findById(id);
    if (!formSectionExist) throw new BadRequestException(`Form with id:${id} not found`);

    // Check leads is not leads have been submitted

    await this.repo.deleteById(id);
    return buildResponse(null, FormSectionEntity, "Form deleted");
  } */
}
