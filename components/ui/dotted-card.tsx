import { cn } from "@/lib/utils";

export function DottedCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col gap-6 overflow-hidden rounded-3xl border border-neutral-200/80 bg-neutral-100/80 p-8 transition dark:border-white/12 dark:bg-white/6",
        className
      )}
      style={{
        backgroundImage:
          "radial-gradient(circle at 25% 25%, var(--dot-color) 0.7px, transparent 1px), radial-gradient(circle at 75% 75%, var(--dot-color) 0.7px, transparent 1px)",
        backgroundSize: "12px 12px",
        backgroundRepeat: "repeat",
      }}
    >
      {children}
    </div>
  );
}
