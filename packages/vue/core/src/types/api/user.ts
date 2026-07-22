import type { Details } from "./details";
import type { File } from "./file";
import type { Gender } from "../../enums/gender";
import type { Is } from "../../enums/is";

/**
 * 用户
 */
export interface User extends Partial<Details> {
  nickName?: string;
  name: string;
  phoneNumber?: string;
  gender?: typeof Gender.valueType;
  mail?: string;
  avatarFile?: File;
  wxNickName?: string;
  wxAvatarUrl?: string;
  wxUnionId?: string;
  wxMpOpenId?: string;
  wxOaOpenId?: string;
  wxAppOpenId?: string;
  wxWebOpenId?: string;
  birthday?: string;
  status?: typeof Is.valueType;
}
