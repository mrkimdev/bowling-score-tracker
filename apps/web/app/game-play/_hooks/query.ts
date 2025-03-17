import { useApiClient } from "@/hooks/common";

export const useGameHistoryQuery = () => {
  return useApiClient().useQuery("get", "/v1/games");
};

export const useGameDetailQuery = (gameId: string) => {
  return useApiClient().useQuery("get", "/v1/games/{gameId}", {
     params: {
        path: { gameId },
      },
  });
}