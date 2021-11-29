import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/Implementations/DaysDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsProvider: DayjsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsProvider,
      carsRepositoryInMemory
    );
  });

  it("Shold be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "54321",
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("Should not be able to create a new rental if there ais another open to the same user", async () => {
    expect(async () => {
      const rental1 = await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "54321",
        expected_return_date: dayAdd24Hours,
      });
      const rental2 = await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "22222",
        expected_return_date: dayAdd24Hours,
      });

      expect(rental1).toHaveProperty("id");
      expect(rental2).toHaveProperty("start_date");
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new rental if there ais another open to the same car", async () => {
    expect(async () => {
      const rental1 = await createRentalUseCase.execute({
        user_id: "223344",
        car_id: "54321",
        expected_return_date: dayAdd24Hours,
      });
      const rental2 = await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "54321",
        expected_return_date: dayAdd24Hours,
      });

      expect(rental1).toHaveProperty("id");
      expect(rental2).toHaveProperty("start_date");
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new rental with invalid return time", async () => {
    expect(async () => {
      const rental1 = await createRentalUseCase.execute({
        user_id: "22333344",
        car_id: "54321333",
        expected_return_date: dayjs().toDate(),
      });

      expect(rental1).toHaveProperty("id");
    }).rejects.toBeInstanceOf(AppError);
  });
});
