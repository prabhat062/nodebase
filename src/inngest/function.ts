import prisma from "@/lib/db";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ step }) => {
    await step.sleep("fetching", "5s");
    await step.sleep("transacribing", "5s");
    await step.sleep("send to AI", "5s");
    await step.run("create-workflow", () => {
      return prisma.workflow.create({
        data: {
          name: "wokrflow from ingesst",
        },
      });
    });
  }
);
