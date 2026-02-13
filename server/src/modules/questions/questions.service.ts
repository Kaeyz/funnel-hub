import { BadRequestException, Injectable } from "@nestjs/common";
import { QuestionRepository } from "./question.repository";
import { GetQuestionsDto, QuestionInputDto } from "./question.dto";
import { buildResponse } from "src/utils/response-builder";
import { QuestionEntity } from "./question.entity";

@Injectable()
export class QuestionsService {
  constructor(private readonly repo: QuestionRepository) {}

  async createNewQuestion(data: QuestionInputDto) {
    const questionExist = await this.repo.findByKey(data.key);
    if (questionExist) throw new BadRequestException(`Question with key:${data.key} exist`);

    const question = await this.repo.create(data);
    return buildResponse(question.toObject(), QuestionEntity, "Question created successfully");
  }

  async getAllQuestions(query: GetQuestionsDto) {
    const questions = await this.repo.getAll(query);
    return buildResponse(questions, QuestionEntity);
  }

  async updateQuestion(id: string, data: QuestionInputDto) {
    const questionExist = await this.repo.findById(id);
    if (!questionExist) throw new BadRequestException(`Question with id:${id} not found`);

    if (data.key !== questionExist.key) {
      const questionWthKeyExist = await this.repo.findByKey(data.key);
      if (questionWthKeyExist) throw new BadRequestException(`Question with key:${data.key} exist`);
    }

    const updatedQuestion = await this.repo.updateById(id, data);
    return buildResponse(updatedQuestion, QuestionEntity, "Question updated successfully");
  }
}
