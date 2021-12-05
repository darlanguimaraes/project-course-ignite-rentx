import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { UserTokens } from "../infra/typeorm/entities/UserToken";

interface IUsersTokenRepository {
  create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokens>;

  findByUserIdAndRefreshToken(
    user_id: string,
    token: string
  ): Promise<UserTokens>;

  deleteById(id: string): Promise<void>;
  findByRefreshToken(token: string): Promise<UserTokens>;
}

export { IUsersTokenRepository };
