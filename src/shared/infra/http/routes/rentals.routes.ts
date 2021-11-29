import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";

import { ensuredAuthenticated } from "../middlewares/ensureAuthenticate";

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();

rentalsRoutes.post("/", ensuredAuthenticated, createRentalController.handle);
rentalsRoutes.post(
  "/devolution/:id",
  ensuredAuthenticated,
  devolutionRentalController.handle
);

export { rentalsRoutes };
