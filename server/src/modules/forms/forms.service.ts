import { BadRequestException, Injectable } from "@nestjs/common";
import { FormRepository } from "./form.repository";
import { CreateFormDto, GetFormsDto } from "./form.dto";
import { buildResponse } from "src/utils/response-builder";
import { FormEntity } from "./form.entity";

@Injectable()
export class FormsService {
  constructor(private readonly formRepository: FormRepository) {}

  async createNewForm(data: CreateFormDto) {
    const formExist = await this.formRepository.findByKey(data.key);
    if (formExist) throw new BadRequestException(`Form with key:${data.key} exist`);

    const form = await this.formRepository.create(data);
    return buildResponse(form.toObject(), FormEntity, "Form created successfully");
  }

  async getAllForms(query: GetFormsDto) {
    const forms = await this.formRepository.getAll(query);
    return buildResponse(forms, FormEntity);
  }
}
