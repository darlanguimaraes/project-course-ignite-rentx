import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("Should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      brand: "BrandCar",
      category_id: "category_id",
      daily_rate: 150,
      description: "Car 1 description",
      fine_amount: 90,
      license_plate: "ACB-9909",
    });
    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car2",
      brand: "BrandCar2",
      category_id: "category_id",
      daily_rate: 150,
      description: "Car 1 description",
      fine_amount: 90,
      license_plate: "ACB-9909",
    });
    const cars = await listAvailableCarsUseCase.execute({
      brand: "BrandCar2",
    });

    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3",
      brand: "BrandCar3",
      category_id: "category_id",
      daily_rate: 150,
      description: "Car 1 description",
      fine_amount: 90,
      license_plate: "ACB-9909",
    });
    const cars = await listAvailableCarsUseCase.execute({
      name: "Car3",
    });

    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car4",
      brand: "BrandCar4",
      category_id: "category_id_5",
      daily_rate: 150,
      description: "Car 1 description",
      fine_amount: 90,
      license_plate: "ACB-9909",
    });
    const cars = await listAvailableCarsUseCase.execute({
      category_id: "category_id_5",
    });

    expect(cars).toEqual([car]);
  });
});
