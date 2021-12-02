import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUserCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let userRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUserCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepositoryInMemory
    );
    createUserUseCase = new CreateUserUserCase(userRepositoryInMemory);
  });

  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "00112233",
      email: "user@test.com",
      password: "1234",
      name: "User Test",
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate non existent user", async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: "false@email.com",
        password: "4321",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect!"));
  });

  // it("should not be able to authenticate with incorrect passowrd", () => {
  //   expect(async () => {
  //     const user: ICreateUserDTO = {
  //       driver_license: "9999",
  //       email: "user@user.com",
  //       password: "12345",
  //       name: "User Test Error",
  //     };

  //     await createUserUseCase.execute(user);

  //     await authenticateUserUseCase.execute({
  //       email: user.email,
  //       password: "4444",
  //     });
  //   }).rejects.toBeInstanceOf(AppError);
  // });
});
