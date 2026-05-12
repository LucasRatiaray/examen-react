"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { observationSchema, type ObservationFormData } from "@/lib/schema";
import { useJournal } from "@/context/JournalContext";
import { useRouter } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { DottedCard } from "@/components/ui/dotted-card";
import { ChevronDown } from "lucide-react";

export function ObservationForm() {
  const { dispatch } = useJournal();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ObservationFormData>({
    resolver: zodResolver(observationSchema),
  });

  const onSubmit = (data: ObservationFormData) => {
    dispatch({
      type: "ADD",
      payload: {
        id: crypto.randomUUID(),
        ...data,
      },
    });
    
    router.push("/journal");
  };

  const OPTIONS = [
    { value: "rocket", label: "Fusée" },
    { value: "satellite", label: "Satellite" },
    { value: "iss", label: "Station Spatiale (ISS)" },
    { value: "plane", label: "Avion" },
    { value: "other", label: "Autre" },
  ];

  return (
    <DottedCard className="max-w-xl w-full mx-auto">
      <div className="mb-6 space-y-2">
        <h2 className="text-2xl font-semibold" style={{ fontFamily: "var(--font-serif)" }}>
          Nouvelle Observation
        </h2>
        <p className="text-sm text-neutral-600 dark:text-white/60">
          Enregistrez votre dernière observation spatiale.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Appareil observé *</label>
          <input
            {...register("machineName")}
            className="flex h-10 w-full rounded-md border border-neutral-200/80 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:border-white/12"
            placeholder="Ex: Falcon 9, ISS..."
          />
          {errors.machineName && (
            <p className="text-xs text-red-500">{errors.machineName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Type *</label>
          <div className="relative">
            <select
              {...register("type")}
              className="flex h-10 w-full appearance-none rounded-md border border-neutral-200/80 bg-transparent px-3 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:border-white/12"
            >
              <option value="" className="dark:bg-neutral-900">Sélectionnez un type</option>
              {OPTIONS.map((option) => (
                <option key={option.value} value={option.value} className="dark:bg-neutral-900">
                  {option.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ChevronDown className="h-4 w-4 opacity-50" />
            </div>
          </div>
          {errors.type && (
            <p className="text-xs text-red-500">{errors.type.message}</p>
          )}
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Lieu *</label>
            <input
              {...register("location")}
              className="flex h-10 w-full rounded-md border border-neutral-200/80 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:border-white/12"
              placeholder="Ex: Paris"
            />
            {errors.location && (
              <p className="text-xs text-red-500">{errors.location.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Date *</label>
            <input
              type="date"
              {...register("date")}
              className="block h-10 w-full rounded-md border border-neutral-200/80 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:border-white/12 dark:[color-scheme:dark]"
            />
            {errors.date && (
              <p className="text-xs text-red-500">{errors.date.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Notes (optionnel)</label>
          <textarea
            {...register("notes")}
            className="flex min-h-[100px] w-full rounded-md border border-neutral-200/80 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:border-white/12"
            placeholder="Météo, visibilité, détails..."
          />
        </div>

        <Button type="submit" className="w-full">
          Sauvegarder l'observation
        </Button>
      </form>
    </DottedCard>
  );
}
