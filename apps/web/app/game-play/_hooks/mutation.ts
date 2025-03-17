import { useApiClient } from "@/hooks/common";

export const useGameCreationMutation = () => {
  return useApiClient().useMutation("post", "/v1/games");
};
``
export const useGameEndMutation = () => {
  return useApiClient().useMutation("post", "/v1/games/{gameId}/end");
};

export const useGameFrameCreationMutation = () => {
  return useApiClient().useMutation("post", "/v1/games/{gameId}/frames");
};

export const useGameFrameUpdateMutation = () => {
  return useApiClient().useMutation("put", "/v1/games/{gameId}/frames/{frameId}");
};
