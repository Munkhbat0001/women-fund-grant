export { default as getRandomElements } from "./getRandomElements";

String.prototype.format = function () {
  var content = this;
  for (var i = 0; i < arguments.length; i++) {
    var target = "{" + i + "}";
    content = content.split(target).join(String(arguments[i]));
    content = content.replace("{}", String(arguments[i]));
  }
  return content;
};

export const formatMoney = (price) => {
  return new Intl.NumberFormat().format(price);
};

export const normFile = (e) => {
  console.log("normFile: ", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
