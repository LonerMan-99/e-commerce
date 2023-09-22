import * as Yup from 'yup';
import { VALIDATION_MESSAGE } from 'shared/constant/validation-message.constant';
import {
  EMAIL_WITH_SPACE_REGEX,
  ALPHANUMERICAL_AND_SPACE_REGEX,
} from 'shared/constant/validation-regex.constant';

export const registrationValidationSchema = () => {
  const registSchema = Yup.object({
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
    confirmPassword: Yup.string()
      .min(5, VALIDATION_MESSAGE.passwordLengthFormat)
      .max(15, VALIDATION_MESSAGE.passwordLengthFormat)
      .oneOf(
        [Yup.ref('password'), null],
        VALIDATION_MESSAGE.confirmPasswordNotValid,
      )
      .required(VALIDATION_MESSAGE.confirmPasswordEmpty)
      .matches(
        ALPHANUMERICAL_AND_SPACE_REGEX,
        VALIDATION_MESSAGE.passwordWrongFormat,
      ),
  });

  return registSchema;
};
