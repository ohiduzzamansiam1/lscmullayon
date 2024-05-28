"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";

function NavProfile({ user }: { user: KindeUser | null }) {
  return (
    <Dialog>
      <DialogTrigger>
        <Avatar className="size-9">
          <AvatarImage src={user?.picture ?? ""} />
          <AvatarFallback>
            {user?.given_name?.toUpperCase().slice(0, 2)}
          </AvatarFallback>
        </Avatar>
      </DialogTrigger>
      <DialogContent>
        <Avatar className="size-24 mx-auto">
          <AvatarImage src={user?.picture ?? ""} />
          <AvatarFallback>
            {user?.given_name?.toUpperCase().slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <DialogHeader>
          <DialogTitle className="text-center">
            {user?.given_name} {user?.family_name}
          </DialogTitle>
        </DialogHeader>
        <p className="text-center text-muted-foreground text-sm -mt-3">
          {user?.email}
        </p>
        <Button asChild className="text-red-500 w-fit mx-auto" variant="link">
          <LogoutLink>Logout</LogoutLink>
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default NavProfile;