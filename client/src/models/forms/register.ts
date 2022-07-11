import { Schema } from "rsuite";

const { StringType, ArrayType } = Schema.Types;
export const userLoginFormModel = Schema.Model({
  name: StringType(),
  username: StringType(),
  password: StringType().isRequired(),
});
export interface userLoginModel {
  name?: string,
  username?: string,
  password: string,
}

export const userRegisterFormModel = Schema.Model({
  location: StringType(),
  name: StringType(),
  first_name: StringType(),
  last_name: StringType(),
  username: StringType(),
  password: StringType().isRequired(),
});
export interface userRegisterModel {
  name?: string,
  username?: string,
  location?: string,
  first_name?: string,
  last_name?: string,
  password: string,
}
