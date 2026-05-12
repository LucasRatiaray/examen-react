export type ISSPosition = {
  latitude: number;
  longitude: number;
  altitude: number;
  velocity: number;
};

export async function getISSPosition(): Promise<ISSPosition> {
  const res = await fetch("https://api.wheretheiss.at/v1/satellites/25544", {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Erreur ISS");
  return res.json();
}
