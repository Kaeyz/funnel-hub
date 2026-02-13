import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { FormSectionInputDto, GetFormSectionsDto } from "./form-section.dto";
import { buildPagination, buildSortObject, parseSelectString } from "src/utils/db-query";
import { queryFormSectionFields } from "./form-section.constants";
import { FormSection, FormSectionDoc } from "src/modules/form-sections/form-section.schema";

@Injectable()
export class FormSectionRepository {
  constructor(@InjectModel("FormSection") private readonly model: Model<FormSection>) {}

  async create(data: FormSectionInputDto): Promise<FormSectionDoc> {
    return new this.model(data).save();
  }

  async findAll() {
    return this.model.find().exec();
  }

  async getAll(query: GetFormSectionsDto) {
    const { search, sortKey, sortDir, status, formId } = query;

    const { skip, page, limit } = buildPagination(query.page, query.limit);
    const sort = buildSortObject(sortKey, sortDir);

    const queryObject: Record<string, unknown> = {};

    if (formId) queryObject["formId"] = formId;

    if (search) {
      queryObject.$or = [{ $text: { $search: search } }, { name: new RegExp(search, "i") }, { key: new RegExp(search, "i") }];
    }

    if (status) queryObject["status"] = status;

    const countQuery = this.model.countDocuments(queryObject);
    const formSectionQuery = this.model
      .find(queryObject)
      .select(parseSelectString(queryFormSectionFields))
      .skip(skip)
      .limit(limit)
      .sort(sort);

    const [data, count] = await Promise.all([formSectionQuery, countQuery]);
    return { data, count, page, limit };
  }

  async findById(id: string): Promise<FormSectionDoc | null> {
    return this.model.findById(id);
  }

  async findByKey(formId: string, key: string): Promise<FormSectionDoc | null> {
    return this.model.findOne({ formId, key });
  }

  async updateById(id: string, data: FormSectionInputDto): Promise<FormSectionDoc | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteById(id: string): Promise<FormSectionDoc | null> {
    return this.model.findByIdAndDelete(id);
  }
}
