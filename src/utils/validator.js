import { isEqual } from "lodash";
import {
  REGEX_EMAIL,
  REGEX_PHONE,
  REGEX_WEBURL,
  nameEn,
  nameMn,
  REGEX_NUMBER,
  REGEX_PASSWORD,
  REGEX_REGNUMBER,
  REGEX_MOBILE,
  englishOnly,
} from "./regex";

export const validator = () => {
  return new Validator();
};

const Validator = function () {
  this.rules = [];

  this.add = function (rule) {
    if (!contains(this.rules, rule)) {
      this.rules.push(rule);
    }
    return this;
  };

  this.required = function (message) {
    this.add(requiredRule(message));
    return this;
  };

  this.length = function (max, min, message) {
    this.add(lengthRule(max, min, message));
    return this;
  };

  this.regex = function (expression, message) {
    this.add(regexRule(expression, message));
    return this;
  };

  this.email = function (message) {
    this.add(regexRule(REGEX_EMAIL, message ?? "И-мэйл хаягаа оруулна уу"));
    return this;
  };
  this.englishOnly = function (message) {
    this.add(regexRule(englishOnly, message));
    return this;
  };
  this.mobileNoMn = function (message) {
    this.add(regexRule(REGEX_MOBILE, message ?? "Утасны дугаараа оруулна уу"));
    return this;
  };

  this.phone = function (message) {
    this.add(regexRule(REGEX_PHONE, message ?? "Утасны дугаараа оруулна уу"));
    return this;
  };

  this.webUrl = function (message) {
    this.add(regexRule(REGEX_WEBURL, message));
    return this;
  };

  this.nameEn = function (message) {
    this.add(regexRule(nameEn, message));
    return this;
  };

  this.nameMn = function (message) {
    this.add(regexRule(nameMn, message ?? "Кириллээр бичнэ үү"));
    return this;
  };

  this.number = function (message) {
    this.add(regexRule(REGEX_NUMBER, message));
    return this;
  };

  this.password = function (message) {
    this.add(regexRule(REGEX_PASSWORD, message));
    return this;
  };

  this.betweenMinAndMax = function (max, min, message) {
    this.add({
      type: "number",
      min: min,
      max: max,
      transform: (value) => (value ? Number(value) : 0), // Converts input to number
      message: message || `${max} хэтрүүлэхгүй оруулна уу`,
    });
    return this;
  };

  this.regNum = function (message) {
    this.add(regexRule(REGEX_REGNUMBER, message ?? "РД зөв оруулна уу"));
    return this;
  };
  this.equal = function (data, message) {
    this.add(({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue(data) === value) {
          return Promise.resolve();
        }

        return Promise.reject(
          new Error(message || `The two ${data} that you entered do not match!`)
        );
      },
    }));
    return this;
  };
  this.equalFieldByName = function (name, message) {
    this.add(({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue(name) === value) {
          return Promise.resolve();
        }

        return Promise.reject(
          new Error(message || `The two ${name} that you entered do not match!`)
        );
      },
    }));
    return this;
  };

  this.build = function () {
    return this.rules;
  };
};

const contains = (array, obj) => {
  return array.filter((r) => isEqual(r, obj)).length > 0;
};

const requiredRule = (message) => ({
  required: true,
  message,
});

const lengthRule = (max, min, message) => ({
  max,
  ...(min && regexRule(`^.{${min},}$`, message || `minimum: ${min}`)),
});

const regexRule = (regex, message) => {
  message = message || "wrong format";
  return {
    required: true,
    pattern: new RegExp(regex, "g"),
    message,
  };
};
