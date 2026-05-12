import * as React from "react";
import { Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import { SpaceDevsLaunch } from "@/lib/spacedevs";
import Image from "next/image";

export interface LaunchCardProps {
  launch: SpaceDevsLaunch;
  className?: string;
}

export const LaunchCard = React.forwardRef<HTMLDivElement, LaunchCardProps>(
  ({ launch, className }, ref) => {
    const date = new Date(launch.net);
    const dateStr = date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const timeStr = date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const isSuccess = launch.status.abbrev === "Success";
    const isFailure = launch.status.abbrev === "Failure";
    const successText = launch.status.abbrev;

    const imageUrl =
      launch.image ||
      "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?auto=format&fit=crop&q=80&w=400&h=400";

    const agencyName = launch.launch_service_provider?.name || "Inconnue";

    return (
      <div
        ref={ref}
        className={cn(
          "max-w-sm w-full font-sans rounded-3xl overflow-hidden shadow-lg bg-neutral-100/50 border border-neutral-200/80 transition-all duration-300 hover:scale-[1.03] dark:bg-white/5 dark:border-white/10 text-neutral-900 dark:text-neutral-100 flex flex-col",
          className,
        )}
      >
        <div className="relative h-60 w-full bg-neutral-200 dark:bg-neutral-800 shrink-0">
          <Image
            src={imageUrl}
            alt={launch.name}
            fill
            unoptimized
            className="object-cover"
          />
          <div className="absolute top-0 inset-x-0 bg-linear-to-b from-black/80 via-black/40 to-transparent p-4 pb-8">
            <h2
              className="text-center text-lg font-bold leading-tight line-clamp-2 text-white"
              title={launch.name}
            >
              {launch.name}
            </h2>
          </div>
        </div>

        <div className="flex flex-col flex-1 p-5 gap-4">
          <div className="flex flex-col items-center mt-1 gap-1">
            <div className="min-h-10 flex items-start justify-center w-full">
              <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 text-center line-clamp-2">
                {agencyName}
              </p>
            </div>
            <div className="flex w-full items-center justify-between">
              <div className="w-1/3 text-left">
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {dateStr}
                </p>
              </div>
              <div className="w-1/3 flex flex-col items-center justify-center">
                <div className="flex items-center justify-center gap-2 my-1 w-full">
                  <div className="h-px flex-1 bg-neutral-300 dark:bg-neutral-700" />
                  <Rocket className="h-4 w-4 text-neutral-400 shrink-0 mx-1" />
                  <div className="h-px flex-1 bg-neutral-300 dark:bg-neutral-700" />
                </div>
              </div>
              <div className="w-1/3 text-right">
                <p
                  className={cn(
                    "text-sm font-bold uppercase tracking-wider",
                    isSuccess
                      ? "text-emerald-500"
                      : isFailure
                        ? "text-red-500"
                        : "text-amber-500",
                  )}
                  title={launch.status.name}
                >
                  {successText}
                </p>
              </div>
            </div>
            <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400 truncate w-full text-center">
              {timeStr}
            </p>
          </div>

          <div className="border-t border-dashed border-neutral-300 dark:border-neutral-700 my-2" />

          <div className="flex flex-col gap-3 mt-auto">
            <div className="flex justify-between items-center">
              <span className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                Fusée
              </span>
              <span
                className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 text-right truncate w-2/3"
                title={launch.rocket?.configuration.name || "N/A"}
              >
                {launch.rocket?.configuration.name || "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                Mission
              </span>
              <span
                className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 text-right truncate w-2/3"
                title={launch.mission?.type || "N/A"}
              >
                {launch.mission?.type || "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

LaunchCard.displayName = "LaunchCard";
