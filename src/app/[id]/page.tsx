import {Suspense} from "react";
import {connection} from "next/server";

import {getCachedDataFromDrupal, getDataFromDrupal} from "@/api";

// Heads up: There is no `generateStaticParams` in this page

async function DynamicData({id}: {id: string}) {
  let data;

  try {
    // Execute this every time
    await connection();

    data = await getDataFromDrupal(id);
  } catch (_error) {
    // If it fails, use the cached data snapshot that the shell used
    data = await getCachedDataFromDrupal(id);
  }

  return <div>Dynamic data: {data.date}</div>;
}

export default async function IdPage({params}: {params: Promise<{id: string}>}) {
  const {id} = await params;

  // Fetch information for the shell, which will be ISRd while mantaining dynamic data
  const data = await getCachedDataFromDrupal(id);

  return (
    <main>
      <h1>Shell data: {data.date}</h1>
      {/* Everything outside of this suspense boundary will be part of the shell which will be ISRd for each page once it was generated */}
      <Suspense fallback={<div>Loading...</div>}>
        <DynamicData id={id} />
      </Suspense>
    </main>
  );
}
