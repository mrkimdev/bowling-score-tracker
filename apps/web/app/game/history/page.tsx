'use client';

import { Loader2Icon } from 'lucide-react';
import { useGameHistoryQuery } from '../_hooks/query';
import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
  AccordionItem,
} from '@repo/ui/components/accordion';
import { ScoreSheet } from '../_components/ScoreSheet';

export default function GameHistory() {
  const { data: games, isLoading } = useGameHistoryQuery();

  return (
    <div className="flex flex-col gap-4 mx-auto">
      <h1 className="text-2xl font-bold text-center">Game History</h1>
      {isLoading ? (
        <div className="flex justify-center items-center size-[200px]">
          <Loader2Icon className="size-10 animate-spin" />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {games?.map((game) => (
            <Accordion key={game.id} type="single">
              <AccordionItem value={game.id}>
                <AccordionTrigger>
                  <AccordionContent>
                    <ScoreSheet game={game} isReadOnly />
                  </AccordionContent>
                </AccordionTrigger>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      )}
    </div>
  );
}
