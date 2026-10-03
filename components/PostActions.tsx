"use client";

import {
  Check,
  Copy,
  Ellipsis,
  Heart,
  Share2,
  ThumbsDown,
  Volume2,
} from "lucide-react";

import { useEffect, useState } from "react";

import {
  EMPTY_POST_ACTION_STATE,
  PostActionState,
} from "@/lib/post-actions/types";

import { LocalPostActionRepository } from "@/lib/post-actions/local-repository";

type Props = {
  postKey: string;
  title: string;
};

const repository =
  new LocalPostActionRepository();

export default function PostActions({
  postKey,
  title,
}: Props) {
  const [actions, setActions] =
    useState<PostActionState>(
      EMPTY_POST_ACTION_STATE
    );

  const [copied, setCopied] =
    useState(false);

  useEffect(() => {
    repository.get(postKey).then(setActions);
  }, [postKey]);

  async function copyLink() {
    await navigator.clipboard.writeText(
      window.location.href
    );

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  }

  async function share() {
    const url = window.location.href;

    if (navigator.share) {
      await navigator.share({
        title,
        url,
      });

      return;
    }

    await copyLink();
  }

  async function toggle(
    action: "like" | "dislike" | "bookmark"
  ) {
    const next =
      await repository.toggle(
        postKey,
        action
      );

    setActions(next);
  }

  function speak() {
    if (!("speechSynthesis" in window)) {
      return;
    }

    window.speechSynthesis.cancel();

    const text =
      document.querySelector(
        "article"
      )?.textContent ?? "";

    const utterance =
      new SpeechSynthesisUtterance(text);

    utterance.rate = 0.95;

    window.speechSynthesis.speak(
      utterance
    );
  }

  return (
    <div
      className="
        flex
        items-center
        gap-1
        rounded-xl
        border
        border-border
        bg-background
        p-1
        shadow-sm
      "
    >
      {/* Copy */}
      <ActionButton
        label={copied ? "Copied" : "Copy link"}
        onClick={copyLink}
        active={copied}
      >
        {copied ? (
          <Check className="h-4 w-4" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </ActionButton>

      {/* Share */}
      <ActionButton
        label="Share"
        onClick={share}
      >
        <Share2 className="h-4 w-4" />
      </ActionButton>

      {/* Listen */}
      <ActionButton
        label="Listen"
        onClick={speak}
      >
        <Volume2 className="h-4 w-4" />
      </ActionButton>

      {/* Like */}
      <ActionButton
        label="Like"
        active={actions.liked}
        onClick={() => toggle("like")}
      >
        <Heart
          className="h-4 w-4"
          fill={
            actions.liked
              ? "currentColor"
              : "none"
          }
        />
      </ActionButton>

      {/* Dislike */}
      <ActionButton
        label="Not useful"
        active={actions.disliked}
        onClick={() => toggle("dislike")}
      >
        <ThumbsDown className="h-4 w-4" />
      </ActionButton>

      {/* More */}
      <ActionButton
        label="More"
        onClick={() => {}}
      >
        <Ellipsis className="h-4 w-4" />
      </ActionButton>
    </div>
  );
}

function ActionButton({
  children,
  label,
  onClick,
  active = false,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`
        flex
        h-9
        w-9
        items-center
        justify-center
        rounded-lg
        transition-all

        ${
          active
            ? "bg-foreground text-background"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        }
      `}
    >
      {children}
    </button>
  );
}