"use server";

import { auth, currentUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/dist/server";
import { ZodSchema, ZodType, z } from "zod";

export const withAuth = (
  action: (formData: FormData, user: User) => Promise<any>
) => {
  return async (formData: FormData) => {
    const { userId } = auth();
    const user = await currentUser();
    if (!userId || !user)
      throw new Error("Cannot executed for disconnected user");

    return action(formData, user);
  };
};

export const withValidation = <Schema extends ZodType<any, any, any>>(
  schema: Schema,
  action: (body: z.infer<Schema>, user: User) => Promise<any>
) => {
  return async (formData: FormData) => {
    const { userId } = auth();
    const user = await currentUser();
    if (!userId || !user)
      throw new Error("Cannot executed for disconnected user");

    const formPayload = Object.fromEntries(formData);
    try {
      const parsedData = schema.parse(formPayload);
      return action(parsedData, user);
    } catch (error) {
      console.error(error);
      throw new Error("Payload incorrect");
    }
  };
};
