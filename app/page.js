import Image from "next/image";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  //console.log({ user });
  //console.log({ identities: user?.identities });

  if (!user) {
    return (
      <main>
        <Link href={"/login"}>You are not logged in. Click here to login</Link>
      </main>
    );
  }

  return <>Hi {user?.email}</>;
}
