'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ScoreSheet } from './ScoreSheet';
import { useGameDetailQuery } from '../_hooks/query';
import { Alert, AlertDescription } from '@repo/ui/components/alert';
import { FC } from 'react';
import { Loader2Icon } from 'lucide-react';
import { AlertTitle } from '@repo/ui/components/alert';
import { Button } from '@repo/ui/components/button';
import { useGameEndMutation } from '../_hooks/mutation';
import { toast } from 'sonner';

export const GamePlay: FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const gameId = searchParams.get('gameId') || '';
  const { data: game, isLoading } = useGameDetailQuery(gameId);
  const { mutate: endGame, isPending } = useGameEndMutation({
    onSuccess: () => {
      toast.success('Game ended successfully');
      router.push('/');
    },
    onError: (error) => {
      toast.error('Unable to end game', { description: error.message });
    },
  });

  return (
    <div className="flex flex-col gap-4 mx-auto">
      {isLoading ? (
        <div className="flex justify-center items-center size-[200px]">
          <Loader2Icon className="size-10 animate-spin" />
        </div>
      ) : (
        <>
          {game ? (
            <ScoreSheet game={game} />
          ) : (
            <Alert variant="destructive">
              <AlertTitle>Game not found</AlertTitle>
              <AlertDescription>
                The game you are looking for does not exist.
              </AlertDescription>
            </Alert>
          )}
        </>
      )}
      <div className="flex justify-center items-center">
        <Button
          disabled={isPending}
          onClick={() => endGame({ params: { path: { gameId } } })}
        >
          End Game
        </Button>
      </div>
    </div>
  );
};
