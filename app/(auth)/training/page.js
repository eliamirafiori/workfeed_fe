import { redirect } from "next/navigation";

import { verifyAuth } from "@/lib/auth";
import { getTrainings } from "@/lib/training";
import { getJobs } from "@/lib/jobs";

export default async function JobsPage() {
  const result = await verifyAuth();

  if (!result.user) {
    return redirect("/");
  }

  const health = await getJobs();

  const trainingSessions = getTrainings();

  return (
    <main>
      <h1>Find your favorite job</h1>
      <ul id="training-sessions">
        {trainingSessions.map((training) => (
          <li key={training.id}>
            <img src={`/trainings/${training.image}`} alt={training.title} />
            <div>
              <h2>{training.title}</h2>
              <p>{training.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
