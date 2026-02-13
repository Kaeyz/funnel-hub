import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { QuestionsService } from "./questions.service";
import { GetQuestionsDto, QuestionInputDto } from "./question.dto";

@Controller("questions")
export class QuestionsController {
  constructor(private service: QuestionsService) {}

  @Post()
  createFormSection(@Body() body: QuestionInputDto) {
    return this.service.createNewQuestion(body);
  }

  @Get()
  getAllFormSections(@Query() query: GetQuestionsDto) {
    return this.service.getAllQuestions(query);
  }
}
