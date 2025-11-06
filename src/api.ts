export async function getDataFromDrupal(id: string, nofail?: boolean) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate a failure 50% of the time
  if (nofail !== true && Math.random() < 0.5) {
    throw new Error("Failed to get data from Drupal");
  }

  console.log("NOT CACHED");

  return {id, date: new Date().toISOString()};
}

export async function getCachedDataFromDrupal(id: string) {
  'use cache: remote';
  const data = await getDataFromDrupal(id, true);

  console.log("CACHED");

  return {
    id: data.id,
    date: `${data.date} (cached)`,
  };
}
