import { getCurrentUser } from "../actions/getCurrentUser";

import { AuthClient } from "./AuthClient";

export default async function AuthPage() {
  const currentUser = await getCurrentUser();

  return <AuthClient currentUser={currentUser} />;
}
