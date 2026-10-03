import {
  EMPTY_POST_ACTION_STATE,
  PostAction,
  PostActionState,
} from "./types";

export interface PostActionRepository {
  get(
    postKey: string
  ): Promise<PostActionState>;

  toggle(
    postKey: string,
    action: PostAction
  ): Promise<PostActionState>;
}