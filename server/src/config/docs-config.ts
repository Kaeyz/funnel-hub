import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const docsConfig = (app: INestApplication<any>) => {
  const config = new DocumentBuilder()
    .setTitle("Funnel Hub Api")
    .setDescription("Api documentation for funnel hub")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("api", app, document);

  return app;
};
