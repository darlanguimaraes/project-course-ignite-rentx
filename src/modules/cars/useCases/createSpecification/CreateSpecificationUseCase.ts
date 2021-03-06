import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationRepository")
    private specificationsrepository: ISpecificationsRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const specificationAlreadyExists =
      await this.specificationsrepository.findByName(name);
    if (specificationAlreadyExists) {
      throw new AppError("Specification already exists");
    }

    await this.specificationsrepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
