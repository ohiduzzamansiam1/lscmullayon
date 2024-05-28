import { Button } from "@/components/ui/button";
import {
  getKindeServerSession,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "./components/Navbar";

async function Home() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (user?.id || user) redirect("/classes");

  return (
    <>
      <div className="h-dvh flex flex-col px-4 pt-4 md:py-0">
        <Navbar />
        <div className="h-full flex-1 flex flex-col items-center justify-center -mt-20">
          <h1 className="text-3xl md:text-6xl font-extrabold mt-3 md:mt-4 text-center leading-[2.5rem] md:leading-[4.7rem]">
            Tension of Student&apos;s Pi?
            <br />
            <span>Don&apos;t Worry.</span>
          </h1>

          <Button asChild size="lg" className="mt-4 md:mt-6 rounded-full">
            <LoginLink>Try this</LoginLink>
          </Button>
        </div>
      </div>
    </>
  );
}

export default Home;
