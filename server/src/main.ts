import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { errorhandler, HttpExceptionFilter } from "./config/error-handler";
import { docsConfig } from "./config/docs-config";
import helmet from "helmet";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  app.enableCors({
    origin: ["https://funnel-hub.up.railway.app"],
  });
  app.useGlobalFilters(new HttpExceptionFilter());
  errorhandler(app);
  docsConfig(app);

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
