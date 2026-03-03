import { auth, currentUser } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

export async function getCurrentUser() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const user = await currentUser();

  if (!user) {
    return null;
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Upsert user into Supabase
  await supabase.from("users").upsert({
    id: userId,
    email: user.emailAddresses[0].emailAddress,
  });

  return {
    id: userId,
    email: user.emailAddresses[0].emailAddress,
  };
}