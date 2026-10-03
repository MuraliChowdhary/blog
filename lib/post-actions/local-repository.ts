import {
  EMPTY_POST_ACTION_STATE,
  PostAction,
  PostActionState,
} from "./types";

import { PostActionRepository } from "./repository";

const STORAGE_KEY = "blog-post-actions";

type StoredActions = Record<string, PostActionState>;

function readStorage(): StoredActions {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const value = localStorage.getItem(STORAGE_KEY);

    return value ? JSON.parse(value) : {};
  } catch {
    return {};
  }
}

function writeStorage(data: StoredActions) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(data)
  );
}

export class LocalPostActionRepository
  implements PostActionRepository
{
  async get(postKey: string) {
    const data = readStorage();

    return (
      data[postKey] ?? {
        ...EMPTY_POST_ACTION_STATE,
      }
    );
  }

  async toggle(
    postKey: string,
    action: PostAction
  ) {
    const data = readStorage();

    const current =
      data[postKey] ?? {
        ...EMPTY_POST_ACTION_STATE,
      };

    const next = {
      ...current,
      [`${action}d`]: !current[
        `${action}d` as keyof PostActionState
      ],
    };

    // Special case: like/dislike should be mutually exclusive
    if (action === "like" && next.liked) {
      next.disliked = false;
    }

    if (action === "dislike" && next.disliked) {
      next.liked = false;
    }

    data[postKey] = next;

    writeStorage(data);

    return next;
  }
}