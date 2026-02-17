import { Module } from "@nestjs/common";
import { LeadsService } from "./leads.service";
import { LeadsController } from "./leads.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Lead, LeadSchema } from "./leads.schema";
import { LeadsRepository } from "./leads.repository";

@Module({
  imports: [MongooseModule.forFeature([{ name: Lead.name, schema: LeadSchema }])],
  providers: [LeadsService, LeadsRepository],
  controllers: [LeadsController],
  exports: [LeadsService],
})
export class LeadsModule {}
