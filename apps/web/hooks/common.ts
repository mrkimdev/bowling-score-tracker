
import createClient from "openapi-react-query";
import { createOpenApiClient } from "@/lib/openapi";
import { useMemo } from "react";

export const useApiClient = () => {
  const client = createOpenApiClient();
  return useMemo(() => createClient(client), [client]);
};
