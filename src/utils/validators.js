export const validators = {
  userId() {
    return {
      validator(rule, value) {
        return (
          !value || /^[1-9]\d{5}$/.test(value) || new Error("请输入6位数字ID")
        );
      },
    };
  },
  required(label) {
    return {
      required: true,
      message: `${label}不能为空`,
    };
  },
  phoneNumber(label = "手机号") {
    return {
      pattern: /^1\d{2}\s?\d{4}\s?\d{4}$/,
      message: `${label}格式错误`,
    };
  },
  password(label = "密码") {
    return {
      min: 6,
      max: 32,
      message: `${label}格式错误`,
    };
  },
};
