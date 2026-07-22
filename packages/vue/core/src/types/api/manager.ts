import type { Details } from "./details";
import type { Is } from "../../enums/is";

/**
 * 管理员
 */
export interface Manager extends Partial<Details> {
  username: string;
  status?: typeof Is.valueType;
}
