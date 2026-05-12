export type Launch = {
  id: string;
  name: string;
  date_utc: string;
  details: string | null;
  success: boolean | null;
  links: {
    patch: { small: string | null; large: string | null };
  };
};

export async function getLaunches(): Promise<Launch[]> {
  const res = await fetch("https://api.spacexdata.com/v4/launches", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error("Erreur de fetch launches");
  return res.json();
}

export async function getLaunchById(id: string): Promise<Launch> {
  const res = await fetch(`https://api.spacexdata.com/v4/launches/${id}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error("Erreur de fetch launch detail");
  return res.json();
}
