import { BadRequestException, Injectable } from "@nestjs/common";
import { FormRepository } from "./form.repository";
import { FormInputDto, FormStatusInputDto, GetFormsDto } from "./form.dto";
import { buildResponse } from "src/utils/response-builder";
import { FormEntity } from "./form.entity";

@Injectable()
export class FormsService {
  constructor(private readonly repo: FormRepository) {}

  async createNewForm(data: FormInputDto) {
    const formExist = await this.repo.findByKey(data.key);
    if (formExist) throw new BadRequestException({ message: `Form with key:${data.key} exist`, data });

    const form = await this.repo.create(data);
    return buildResponse(form.toObject(), FormEntity, "Form created successfully");
  }

  async getAllForms(query: GetFormsDto) {
    const forms = await this.repo.getAll(query);
    return buildResponse(forms, FormEntity);
  }

  async updateForm(id: string, data: FormInputDto) {
    const formExist = await this.repo.findById(id);
    if (!formExist) throw new BadRequestException(`Form with id:${id} not found`);

    if (data.key !== formExist.key) {
      const formWithKeyExist = await this.repo.findByKey(data.key);
      if (formWithKeyExist) throw new BadRequestException(`Form with key:${data.key} exist`);
    }

    const updatedForm = await this.repo.updateById(id, data);
    return buildResponse(updatedForm, FormEntity, "Form updated successfully");
  }

  async updateFormStatus(id: string, data: FormStatusInputDto) {
    const formExist = await this.repo.findById(id);
    if (!formExist) throw new BadRequestException(`Form with id:${id} not found`);

    const updatedForm = await this.repo.updateById(id, data);
    return buildResponse(updatedForm, FormEntity, "Status updated");
  }
}
