import type { BasicUserInfoModel } from "./basicUserInfo.model";

export interface PostModel {
    id: number;
    title: string;  
    body: string;
    user: BasicUserInfoModel;
    commentsNo: string;
};
