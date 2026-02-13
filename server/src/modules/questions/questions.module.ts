import { Module } from "@nestjs/common";
import { QuestionsService } from "./questions.service";
import { QuestionsController } from "./questions.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Question, QuestionSchema } from "./question.schema";
import { QuestionRepository } from "./question.repository";

@Module({
  imports: [MongooseModule.forFeature([{ name: Question.name, schema: QuestionSchema }])],
  providers: [QuestionsService, QuestionRepository],
  controllers: [QuestionsController],
  exports: [QuestionsService],
})
export class QuestionsModule {}
