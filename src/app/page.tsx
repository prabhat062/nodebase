"use client";
import { useTRPC } from "@/trpc/client";
import LogoutButton from "./logout";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Page = () => {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.getWorkflows.queryOptions());
  const testAI = useMutation(
    trpc.testAi.mutationOptions({
      onSuccess: () => {
        toast.success("Response is about to get generated");
      },
    })
  );
  const create = useMutation(
    trpc.createWorkflows.mutationOptions({
      onSuccess: () => {
        toast.success("Job Queued");
      },
    })
  );

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center flex-col gap-y-6">
      Protected Content <div>{JSON.stringify(data, null, 2)}</div>
      <Button disabled={testAI.isPending} onClick={() => testAI.mutate()}>
        Test AI
      </Button>
      <Button disabled={create.isPending} onClick={() => create.mutate()}>
        Create Workflows
      </Button>
      <LogoutButton />
    </div>
  );
};

export default Page;
