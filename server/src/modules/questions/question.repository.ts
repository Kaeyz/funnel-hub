import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { GetQuestionsDto, QuestionInputDto } from "./question.dto";
import { buildPagination, buildSortObject, parseSelectString } from "src/utils/db-query";
import { questionQueryFields } from "./question.constants";
import { Question, QuestionDoc } from "./question.schema";

@Injectable()
export class QuestionRepository {
  constructor(@InjectModel("Question") private readonly model: Model<Question>) {}

  async create(data: QuestionInputDto): Promise<QuestionDoc> {
    return new this.model(data).save();
  }

  async findAll() {
    return this.model.find().exec();
  }

  async getAll(query: GetQuestionsDto) {
    const { search, sortKey, sortDir, status, formSectionId } = query;

    const { skip, page, limit } = buildPagination(query.page, query.limit);
    const sort = buildSortObject(sortKey, sortDir);

    const queryObject: Record<string, unknown> = {};

    if (search) {
      queryObject.$or = [{ $text: { $search: search } }, { name: new RegExp(search, "i") }, { key: new RegExp(search, "i") }];
    }
    if (formSectionId) queryObject["formSectionId"] = formSectionId;
    if (status) queryObject["status"] = status;

    const countQuery = this.model.countDocuments(queryObject);
    const dataQuery = this.model
      .find(queryObject)
      .select(parseSelectString(questionQueryFields))
      .skip(skip)
      .limit(limit)
      .sort(sort);

    const [data, count] = await Promise.all([dataQuery, countQuery]);

    return { data, count, page, limit };
  }

  async findById(id: string): Promise<QuestionDoc | null> {
    return this.model.findById(id);
  }

  async findByKey(key: string): Promise<QuestionDoc | null> {
    return this.model.findOne({ key });
  }

  async updateById(id: string, data: QuestionInputDto): Promise<QuestionDoc | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteById(id: string): Promise<QuestionDoc | null> {
    return this.model.findByIdAndDelete(id);
  }
}
