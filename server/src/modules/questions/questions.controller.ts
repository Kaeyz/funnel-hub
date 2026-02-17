import { Body, Controller, Get, Param, Patch, Post, Put, Query } from "@nestjs/common";
import { QuestionsService } from "./questions.service";
import { GetQuestionsDto, QuestionInputDto, QuestionStatusInputDto } from "./question.dto";

@Controller("questions")
export class QuestionsController {
  constructor(private service: QuestionsService) {}

  @Post()
  createFormSection(@Body() body: QuestionInputDto) {
    return this.service.createNewQuestion(body);
  }

  @Get()
  getAllQuestions(@Query() query: GetQuestionsDto) {
    return this.service.getAllQuestions(query);
  }

  @Put(":id")
  updateForm(@Param() param: { id: string }, @Body() body: QuestionInputDto) {
    return this.service.updateQuestion(param.id, body);
  }

  @Patch(":id/status")
  updateQuestionStatus(@Param() param: { id: string }, @Body() body: QuestionStatusInputDto) {
    return this.service.updateQuestionStatus(param.id, body);
  }
}
