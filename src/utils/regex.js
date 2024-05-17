export const REGEX_EMAIL =
  /(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g;
export const REGEX_PHONE = /^[\+]?[0-9]{8,11}$/g;
export const REGEX_WEBURL =
  /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,20}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
export const nameEn = /\b([A-Z|a-z]+[-,a-z. '|0-9]+[ ]*)+/g;
export const nameMn = /^[а-яА-ЯөүБҮ\-]+$/g;
export const REGEX_NUMBER = /^[0-9]*$/g;
export const REGEX_PASSWORD =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/g;
export const englishOnly =
  /^[A-Za-z0-9\s\.\,\'\"\`\!\@\#\$\%\&\:\;\*\(\)\-\+]*$/g;
export const REGEX_REGNUMBER = /^[а-яА-ЯҮүӨө]{2}[\d]{8}$/g;
export const REGEX_MOBILE = /^[5-9]{1}\d{7}$/g;

export const DATE_FORMAT = "YYYY-MM-DD";
export const DATE = {
  date: "YYYY-MM-DD",
  month: "YYYY-MM",
  year: "YYYY",
};
