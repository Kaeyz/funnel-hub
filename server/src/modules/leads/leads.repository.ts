import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Lead, LeadDoc } from "./leads.schema";
import { GetLeadsDto, LeadsInputDto } from "./leads.dto";
import { buildPagination, buildSortObject, parseSelectString } from "src/utils/db-query";
import { queryLeadFields } from "./leads.constants";

@Injectable()
export class LeadsRepository {
  constructor(@InjectModel("Lead") private readonly model: Model<Lead>) {}

  async create(data: LeadsInputDto): Promise<LeadDoc> {
    return new this.model(data).save();
  }

  async findAll() {
    return this.model.find().exec();
  }

  async getAll(query: GetLeadsDto) {
    const { search, sortKey, sortDir } = query;

    const { skip, page, limit } = buildPagination(query.page, query.limit);
    const sort = buildSortObject(sortKey, sortDir);

    const queryObject: Record<string, unknown> = {};

    if (search) {
      queryObject.$or = [{ $text: { $search: search } }, { userName: new RegExp(search, "i") }];
    }

    const countQuery = this.model.countDocuments(queryObject);
    const formsQuery = this.model.find(queryObject).select(parseSelectString(queryLeadFields)).skip(skip).limit(limit).sort(sort);

    const [forms, count] = await Promise.all([formsQuery, countQuery]);

    return {
      data: forms,
      count,
      page,
      limit,
    };
  }

  async findById(id: string): Promise<LeadDoc | null> {
    return this.model.findById(id);
  }

  async findByKey(key: string): Promise<LeadDoc | null> {
    return this.model.findOne({ key });
  }

  async updateById(id: string, data: LeadsInputDto): Promise<LeadDoc | null> {
    return this.model.findByIdAndUpdate(id, data, { returnDocument: "after" });
  }

  async deleteById(id: string): Promise<LeadDoc | null> {
    return this.model.findByIdAndDelete(id);
  }
}
