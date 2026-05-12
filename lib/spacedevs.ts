export type SpaceDevsLaunch = {
  id: string;
  name: string;
  net: string;
  status: {
    name: string;
    abbrev: string;
  };
  launch_service_provider: {
    name: string;
  } | null;
  rocket: {
    configuration: {
      name: string;
      full_name: string;
    };
  } | null;
  mission: {
    name: string;
    type: string;
    description: string;
  } | null;
  pad: {
    name: string;
    location: {
      name: string;
      country_code: string;
    };
  } | null;
  image: string | null;
};

type SpaceDevsResponse = {
  count: number;
  results: SpaceDevsLaunch[];
};

export async function getUpcomingLaunches(): Promise<SpaceDevsLaunch[]> {
  // 15 minutes (900 secondes) = 4 requêtes / heure.
  const res = await fetch(
    "https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=12",
    {
      next: { revalidate: 900 },
    },
  );

  if (!res.ok) {
    throw new Error(
      "Erreur lors de la récupération des lancements The Space Devs",
    );
  }

  const data: SpaceDevsResponse = await res.json();
  return data.results;
}

export async function getLaunchById(id: string): Promise<SpaceDevsLaunch> {
  const res = await fetch(`https://ll.thespacedevs.com/2.2.0/launch/${id}/`, {
    next: { revalidate: 900 },
  });

  if (!res.ok) {
    throw new Error("Erreur de fetch launch detail");
  }

  return res.json();
}
