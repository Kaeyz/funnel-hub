import { Test, TestingModule } from "@nestjs/testing";
import { FormSectionsController } from "../form-sections.controller";

describe("FormSectionsController", () => {
  let controller: FormSectionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormSectionsController],
    }).compile();

    controller = module.get<FormSectionsController>(FormSectionsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
