import { getCurrentUser } from "../actions/getCurrentUser";
import { getPeople } from "../actions/getPeople";

import { MatchClient } from "./MatchClient";

export default async function AuthPage() {
  const currentUser = await getCurrentUser();
  const people = await getPeople();

  return (
    <div className="h-full  grid place-content-center">
      <MatchClient currentUser={currentUser} people={people} />
    </div>
  );
}
