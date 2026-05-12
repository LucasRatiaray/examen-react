"use client";

import { useJournal } from "@/context/JournalContext";
import { DottedCard } from "@/components/ui/dotted-card";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Calendar, MapPin, Tag } from "lucide-react";

export function JournalList() {
  const { state, dispatch } = useJournal();

  if (state.observations.length === 0) {
    return (
      <DottedCard className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-4 rounded-full bg-neutral-200/50 p-4 dark:bg-white/5">
          <Tag className="h-8 w-8 opacity-50" />
        </div>
        <h3 className="mb-2 text-xl font-semibold" style={{ fontFamily: "var(--font-serif)" }}>
          Aucune observation
        </h3>
        <p className="mb-6 max-w-md text-sm text-neutral-600 dark:text-white/60">
          Vous n'avez pas encore consigné d'observations. Gardez un œil vers le ciel et commencez votre journal !
        </p>
        <Button asChild>
          <Link href="/journal/new">
            <Plus className="mr-2 h-4 w-4" /> Ajouter une observation
          </Link>
        </Button>
      </DottedCard>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-end">
        <Button asChild>
          <Link href="/journal/new">
            <Plus className="mr-2 h-4 w-4" /> Nouvelle observation
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {state.observations.map((obs) => (
          <DottedCard key={obs.id} className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[0.65rem] uppercase tracking-[0.2em] opacity-60">
                  {obs.type}
                </span>
                <h3 className="text-lg font-semibold tracking-tight line-clamp-1">
                  {obs.machineName}
                </h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-red-500 opacity-50 hover:bg-red-500/10 hover:opacity-100 dark:text-red-400"
                onClick={() => dispatch({ type: "DELETE", payload: obs.id })}
                aria-label="Supprimer"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-4 space-y-2 text-sm text-neutral-600 dark:text-white/60">
              <div className="flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5 opacity-70" />
                <span>{new Date(obs.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 opacity-70" />
                <span className="line-clamp-1">{obs.location}</span>
              </div>
            </div>

            {obs.notes && (
              <div className="mt-4 border-t border-neutral-200/50 pt-4 dark:border-white/10">
                <p className="line-clamp-2 text-xs italic opacity-70">
                  "{obs.notes}"
                </p>
              </div>
            )}
          </DottedCard>
        ))}
      </div>
    </div>
  );
}
