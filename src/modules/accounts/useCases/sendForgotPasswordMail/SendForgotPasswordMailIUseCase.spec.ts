import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokenRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokenRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/Implementations/DaysDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotMailPasswordUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotMailPasswordUseCase: SendForgotMailPasswordUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokenRepositoryInMemory: UsersTokenRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;

describe("Send forgot mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokenRepositoryInMemory = new UsersTokenRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();
    sendForgotMailPasswordUseCase = new SendForgotMailPasswordUseCase(
      usersRepositoryInMemory,
      usersTokenRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("Should be able to send a forgot password mail to user", async () => {
    const sendMail = spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: "900083",
      email: "hejupsu@gaw.jo",
      name: "Susan Henderson",
      password: "1234",
    });

    await sendForgotMailPasswordUseCase.execute("hejupsu@gaw.jo");

    expect(sendMail).toHaveBeenCalled();
  });

  it("Should nor be able to send an email if user does not exists", async () => {
    await expect(
      sendForgotMailPasswordUseCase.execute("few@giajez.gl")
    ).rejects.toEqual(new AppError("User does not exists!"));
  });

  it("Should be able to create an users token", async () => {
    const generateTokenMail = spyOn(usersTokenRepositoryInMemory, "create");

    await usersRepositoryInMemory.create({
      driver_license: "998888",
      email: "hejupsu@gaw.jom",
      name: "Susan Henderson",
      password: "1234",
    });

    await sendForgotMailPasswordUseCase.execute("hejupsu@gaw.jom");

    expect(generateTokenMail).toHaveBeenCalled();
  });
});
