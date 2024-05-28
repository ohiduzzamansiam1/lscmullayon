import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export const checkAuth = async () => {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user || !user?.id) redirect("/api/auth/login");
};
