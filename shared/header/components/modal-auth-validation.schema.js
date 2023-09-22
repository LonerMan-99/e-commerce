import * as Yup from 'yup';
import { VALIDATION_MESSAGE } from 'shared/constant/validation-message.constant';
import {
  EMAIL_WITH_SPACE_REGEX,
  ALPHANUMERICAL_AND_SPACE_REGEX,
} from 'shared/constant/validation-regex.constant';

export const loginValidationSchema = () => {
  const loginSchema = Yup.object({
    email: Yup.string()
      .matches(EMAIL_WITH_SPACE_REGEX, VALIDATION_MESSAGE.emailWrongFormat)
      .required(VALIDATION_MESSAGE.emailEmpty),
    password: Yup.string()
      .min(5, VALIDATION_MESSAGE.passwordLengthFormat)
      .max(15, VALIDATION_MESSAGE.passwordLengthFormat)
      .required(VALIDATION_MESSAGE.passwordEmpty)
      .matches(
        ALPHANUMERICAL_AND_SPACE_REGEX,
        VALIDATION_MESSAGE.passwordWrongFormat,
      ),
  });

  return loginSchema;
};
