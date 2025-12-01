"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

const LogoutButton = () => {
  return (
    <div>
      <Button onClick={() => authClient.signOut()}>Log Out</Button>
    </div>
  );
};

export default LogoutButton;
