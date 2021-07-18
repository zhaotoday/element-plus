export const useFormValidators = () => {
  return {
    userId() {
      return {
        validator(rule, value) {
          return (
            !value || /^[1-9]\d{7}$/.test(value) || new Error("请输入8位数字ID")
          );
        },
      };
    },
    account() {
      return {
        pattern: /[a-zA-Z0-9_-]{8,20}/,
        message: "账号格式错误",
      };
    },
    nickName() {
      return {
        pattern: /^[\\w\u4e00-\u9fa5]{2,8}$/,
        message: "昵称格式错误",
      };
    },
    required({ label, message } = {}) {
      return {
        required: true,
        message: message || `请输入${label}`,
      };
    },
    phoneNumber({ label = "手机号" } = {}) {
      return {
        pattern: /^1\d{2}\s?\d{4}\s?\d{4}$/,
        message: `${label}格式错误`,
      };
    },
    password({ label = "密码" } = {}) {
      return {
        pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,
        message: `${label}格式错误`,
      };
    },
    captcha({ label = "验证码" } = {}) {
      return {
        len: 6,
        message: `${label}格式错误`,
      };
    },
  };
};
