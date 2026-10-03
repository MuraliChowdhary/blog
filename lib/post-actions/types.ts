export type PostAction =
  | "like"
  | "dislike"
  | "bookmark";

export type PostActionState = {
  liked: boolean;
  disliked: boolean;
  bookmarked: boolean;
};

export const EMPTY_POST_ACTION_STATE: PostActionState = {
  liked: false,
  disliked: false,
  bookmarked: false,
};