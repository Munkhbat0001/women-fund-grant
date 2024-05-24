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
