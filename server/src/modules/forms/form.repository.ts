import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Form, FormDoc } from "src/schemas/form.schema";
import { CreateFormDto, GetFormsDto } from "./form.dto";
import { buildPagination, buildSortObject, parseSelectString } from "src/utils/db-query";
import { queryFormFields } from "./form.constants";

@Injectable()
export class FormRepository {
  constructor(@InjectModel("Form") private readonly Form: Model<Form>) {}

  async create(data: CreateFormDto): Promise<FormDoc> {
    return new this.Form(data).save();
  }

  async findAll() {
    return this.Form.find().exec();
  }

  async getAll(query: GetFormsDto) {
    const { search, sortKey, sortDir, status } = query;

    const { skip, page, limit } = buildPagination(query.page, query.limit);
    const sort = buildSortObject(sortKey, sortDir);

    const queryObject: Record<string, unknown> = {};

    if (search) {
      queryObject.$or = [{ $text: { $search: search } }, { name: new RegExp(search, "i") }, { key: new RegExp(search, "i") }];
    }

    if (status) queryObject["status"] = status;

    const countQuery = this.Form.countDocuments(queryObject);
    const formsQuery = this.Form.find(queryObject).select(parseSelectString(queryFormFields)).skip(skip).limit(limit).sort(sort);

    const [forms, count] = await Promise.all([formsQuery, countQuery]);

    return {
      data: forms,
      count,
      page,
      limit,
    };
  }

  async findById(id: string): Promise<FormDoc | null> {
    return this.Form.findById(id);
  }

  async findByKey(key: string): Promise<FormDoc | null> {
    return this.Form.findOne({ key });
  }
}
