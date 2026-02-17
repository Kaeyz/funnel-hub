import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import keys from "./config/keys";
import { allModules } from "./modules";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [keys],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>("mongoUri"),
      }),
    }),
    ...allModules,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
