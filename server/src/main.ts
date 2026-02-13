import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { errorhandler } from "./config/error-handler";
import { docsConfig } from "./config/docs-config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  errorhandler(app);
  docsConfig(app);

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
