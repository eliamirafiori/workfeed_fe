export async function getJobs() {
  const health = await fetch(
    `${process.env.NEXT_LOCALHOST_URL}/endpoint/health`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    },
  );
  console.log("DEBUGGING JOBS API");
  console.log(health);

  return health;
}
