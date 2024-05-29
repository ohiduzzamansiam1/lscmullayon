import { Button } from "@/components/ui/button";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import NavProfile from "./NavProfile";

async function Navbar() {
  const { isAuthenticated, getUser } = getKindeServerSession();

  const user = await getUser();

  return (
    <div className="mx-auto w-full flex justify-between items-center p-5 z-10 shadow-2xl shadow-black/10 border rounded-full px-6 md:my-5">
      <Link
        href={"/classes"}
        className="font-extrabold select-none font-logo text-2xl"
      >
        LSC
      </Link>
      <div className="flex items-center">
        {(await isAuthenticated()) ? (
          <NavProfile user={user} />
        ) : (
          <div className="flex items-center gap-x-2">
            <Button
              variant="secondary"
              asChild
              className="select-none rounded-full"
            >
              <LoginLink>Login</LoginLink>
            </Button>
            <Button asChild className="select-none rounded-full">
              <RegisterLink>Sign Up</RegisterLink>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
