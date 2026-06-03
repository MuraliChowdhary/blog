import { ReactNode } from "react";

type CalloutType = "info" | "warning" | "tip" | "danger";

const styles: Record<CalloutType, string> = {
  info:    "border-border bg-muted/40 text-foreground",
  tip:     "border-green-500/30 bg-green-500/5 text-foreground",
  warning: "border-yellow-500/30 bg-yellow-500/5 text-foreground",
  danger:  "border-red-500/30 bg-red-500/5 text-foreground",
};

const icons: Record<CalloutType, string> = {
  info: "ℹ",
  tip: "✦",
  warning: "⚠",
  danger: "✕",
};

export default function Callout({
  type = "info",
  children,
}: {
  type?: CalloutType;
  children: ReactNode;
}) {
  return (
    <div className={`my-6 rounded-lg border px-5 py-4 text-sm leading-relaxed ${styles[type]}`}>
      <span className="mr-2 opacity-60">{icons[type]}</span>
      {children}
    </div>
  );
}