
import type { paths } from "@/lib/api-generated/api";
import createClient from "openapi-fetch";

export const createOpenApiClient = () => {
  return createClient<paths>({
    baseUrl: process.env.NEXT_PUBLIC_CLIENT_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
