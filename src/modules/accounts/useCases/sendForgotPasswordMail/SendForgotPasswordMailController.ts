import { Request, Response } from "express";
import { container } from "tsyringe";

import { SendForgotMailPasswordUseCase } from "./SendForgotPasswordMailUseCase";

class SendForgotMailPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotMailPasswordUseCase = container.resolve(
      SendForgotMailPasswordUseCase
    );

    await sendForgotMailPasswordUseCase.execute(email);

    return response.send();
  }
}

export { SendForgotMailPasswordController };
