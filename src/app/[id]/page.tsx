import {Suspense} from "react";
import {connection} from "next/server";

import {getCachedDataFromDrupal, getDataFromDrupal} from "@/api";

async function DynamicData({id}: {id: string}) {
  let data;

  try {
    await connection();

    data = await getDataFromDrupal(id);
  } catch (_error) {
    data = await getCachedDataFromDrupal(id);
  }

  return <div>Dynamic data: {data.date}</div>;
}

export default async function IdPage({params}: {params: Promise<{id: string}>}) {
  const {id} = await params;

  const data = await getCachedDataFromDrupal(id);

  return (
    <main>
      <h1>Shell data: {data.date}</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <DynamicData id={id} />
      </Suspense>
    </main>
  );
}
