import { z } from "zod";

/**
 * 校验触发时机
 */
type RuleTrigger = "blur" | "change" | Array<"blur" | "change">;

/**
 * 校验回调
 */
type RuleCallback = (error?: string | Error) => void;

/**
 * 单条校验规则，结构上兼容 element-plus 的 FormItemRule
 */
export interface Rule {
  /** 触发验证的事件类型 */
  trigger?: RuleTrigger;
  /** 是否必填 */
  required?: boolean;
  /** 错误消息 */
  message?: string;
  /** 校验函数 */
  validator?: (rule: any, value: any, callback: RuleCallback) => void;
}

/**
 * 表单校验规则集合，可直接用于 element-plus 的 `<el-form :rules>`
 */
export type Rules = Record<string, Rule[]>;

/**
 * 校验错误信息
 */
export interface ValidateError {
  /** 字段名 */
  field: string;
  /** 错误消息 */
  message: string;
}

/**
 * 规则选项接口
 */
interface RuleOptions {
  /** 触发验证的事件类型 */
  trigger?: RuleTrigger;
}

/**
 * 验证器选项接口
 */
interface ValidatorOptions {
  /** 字段标签 */
  label?: string;
  /** 自定义错误消息 */
  message?: string;
}

/**
 * 验证码选项接口
 */
interface CaptchaOptions extends ValidatorOptions {
  /** 验证码长度 */
  length?: number;
}

/**
 * 表单状态接口
 */
interface FormState {
  /** 表单数据模型 */
  model: Record<string, unknown>;
  /** 验证规则 */
  rules: Rules;
  /** 错误信息 */
  errors: Record<string, string>;
}

/**
 * 验证回调函数类型
 */
type ValidateCallback = (
  errors: ValidateError[] | null,
  model: Record<string, unknown>,
  rules: Rules,
) => void;

/**
 * useValidators 选项接口
 */
interface UseValidatorsOptions {
  /** 规则选项 */
  ruleOptions?: RuleOptions;
}

/** 账号：8-20 位字母数字下划线横线 */
const ACCOUNT_PATTERN = /^[a-zA-Z0-9_-]{8,20}$/;
/** 昵称：2-8 位字母数字中文下划线 */
const NICKNAME_PATTERN = /^[\w\u4e00-\u9fa5]{2,8}$/;
/** 中国大陆手机号 */
const PHONE_PATTERN = /^1\d{2}\s?\d{4}\s?\d{4}$/;
/** 密码：6-32 位且同时包含字母和数字 */
const PASSWORD_PATTERN = /^(?=.*[0-9])(?=.*[a-zA-Z]).{6,32}$/;

/**
 * 允许空值（`""` / `null` / `undefined`）通过的 schema 包装。
 * 空值是否合法由 `isRequired` 单独负责，格式类校验只在有值时生效。
 */
function allowEmpty(schema: z.ZodType): z.ZodType {
  return z.union([z.literal(""), z.null(), z.undefined(), schema]);
}

const accountSchema = allowEmpty(z.string().regex(ACCOUNT_PATTERN));
const nickNameSchema = allowEmpty(z.string().regex(NICKNAME_PATTERN));
const phoneSchema = allowEmpty(z.string().regex(PHONE_PATTERN));
const emailSchema = allowEmpty(z.email());
const phoneOrEmailSchema = allowEmpty(
  z.union([z.string().regex(PHONE_PATTERN), z.email()]),
);
const passwordSchema = allowEmpty(z.string().regex(PASSWORD_PATTERN));

/** 必填校验：兼容字符串、数组及任意真值 */
const requiredSchema = z.custom<unknown>((value) => {
  if (value === null || value === undefined) return false;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === "string") return value.trim().length > 0;
  return Boolean(value);
});

/**
 * 同步执行单条规则校验，校验失败返回错误消息，成功返回 undefined
 */
function runRule(rule: Rule, value: unknown): string | undefined {
  let message: string | undefined;
  rule.validator?.(rule, value, (error) => {
    message = typeof error === "string" ? error : error?.message;
  });
  return message;
}

/**
 * 表单验证器组合函数
 * @param options - 验证器选项
 * @returns 包含各种验证规则和验证方法的对象
 */
export function useValidators({
  ruleOptions = { trigger: "blur" },
}: UseValidatorsOptions = {}) {
  /**
   * 由 zod schema 构建一条校验规则。
   * 格式类校验已通过 schema 放行空值，因此错误消息统一使用传入的 message。
   */
  function buildRule(schema: z.ZodType, message: string): Rule {
    return {
      ...ruleOptions,
      validator: (_rule, value, callback) => {
        callback(
          schema.safeParse(value).success ? undefined : new Error(message),
        );
      },
    };
  }

  /** 账号格式验证规则 */
  function isAccount({
    label = "账号",
    message = "",
  }: ValidatorOptions = {}): Rule {
    return buildRule(accountSchema, message || `${label}格式错误`);
  }

  /** 昵称格式验证规则 */
  function isNickName({
    label = "昵称",
    message = "",
  }: ValidatorOptions = {}): Rule {
    return buildRule(nickNameSchema, message || `${label}格式错误`);
  }

  /** 必填项验证规则 */
  function isRequired({ label, message }: ValidatorOptions = {}): Rule {
    return {
      ...buildRule(requiredSchema, message || `请输入${label}`),
      required: true,
    };
  }

  /** 手机号格式验证规则（中国大陆手机号） */
  function isPhoneNumber({
    label = "手机号",
    message = "",
  }: ValidatorOptions = {}): Rule {
    return buildRule(phoneSchema, message || `${label}格式错误`);
  }

  /** 邮箱格式验证规则 */
  function isEmail({
    label = "邮箱",
    message = "",
  }: ValidatorOptions = {}): Rule {
    return buildRule(emailSchema, message || `${label}格式错误`);
  }

  /** 手机号或邮箱格式验证规则 */
  function isPhoneNumberOrEmail({
    label = "账号",
    message = "",
  }: ValidatorOptions = {}): Rule {
    return buildRule(
      phoneOrEmailSchema,
      message || `${label}格式错误（必须是手机号或邮箱）`,
    );
  }

  /** 密码格式验证规则（6-32 位，包含字母和数字，可包含特殊字符） */
  function isPassword({
    label = "密码",
    message = "",
  }: ValidatorOptions = {}): Rule {
    return buildRule(
      passwordSchema,
      message || `${label}格式错误，需 6-32 位且含字母和数字`,
    );
  }

  /** 验证码格式验证规则 */
  function isCaptcha({
    label = "验证码",
    message = "",
    length = 6,
  }: CaptchaOptions = {}): Rule {
    return buildRule(
      allowEmpty(z.string().length(length)),
      message || `${label}格式错误`,
    );
  }

  /**
   * 执行表单验证
   * @param formState - 表单状态对象
   * @param field - 可选，指定验证的字段名
   * @param callback - 可选，验证完成后的回调函数
   */
  function validate(
    formState: FormState,
    field?: string,
    callback?: ValidateCallback,
  ): void {
    const fields = field ? [field] : Object.keys(formState.rules);
    const errors: ValidateError[] = [];

    for (const key of fields) {
      const rules = formState.rules[key] ?? [];
      for (const rule of rules) {
        const msg = runRule(rule, formState.model[key]);
        if (msg) {
          errors.push({ field: key, message: msg });
          break;
        }
      }
    }

    if (field) {
      const matched = errors.find((e) => e.field === field);
      formState.errors = {
        ...formState.errors,
        [field]: matched?.message || "",
      };
    } else {
      const nextErrors: Record<string, string> = {};
      for (const key of Object.keys(formState.errors)) {
        nextErrors[key] = "";
      }
      for (const error of errors) {
        nextErrors[error.field] ||= error.message;
      }
      formState.errors = nextErrors;
    }

    callback?.(errors.length ? errors : null, formState.model, formState.rules);
  }

  /** 清空指定字段的输入值并重新验证 */
  function clearInput(formState: FormState, field: string): void {
    formState.model[field] = "";
    validate(formState, field);
  }

  return {
    isAccount,
    isNickName,
    isRequired,
    isPhoneNumber,
    isEmail,
    isPhoneNumberOrEmail,
    isPassword,
    isCaptcha,
    validate,
    clearInput,
  };
}
