export const ALPHABETIC_WITH_SPACE_REGEX = /^[a-zA-Z ]*$/;
export const ALPHABETH_WITH_SPACE_REGEX = /^[a-zA-Z ]*$/;
export const ALPHANUMERIC_WITH_SPACE_REGEX = /^[a-z\d\-_\s]+$/i;
export const NUMERICAL_REGEX = /^\d+$/;
export const NUMERICAL_WITH_PLUS_REGEX = /^\+?\d+$/;
export const ALPHABETIC_REGEX = /^[A-Za-z]+$/;
export const KTP_NAME_REGEX = /^[a-zA-Z .,’'-]*$/;
export const ALPHANUMERICAL_WITH_SPECIAL_CHARACTER_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_])/;
export const ALPHANUMERIC_ONLY_REGEX = /^[a-zA-Z0-9]*$/;
export const NUMERIC_WITH_DASH_REGEX = /[\d -]+$/;
export const ALPHANUMERICAL_AND_SPACE_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
export const EMAIL_WITH_SPACE_REGEX =
  /(?:[a-z0-9 +!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*)@(?:(?:[ a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:+)\])/i;
