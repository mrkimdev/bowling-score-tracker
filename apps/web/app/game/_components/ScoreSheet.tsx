'use client';

import { FC, useMemo, useState } from 'react';
import { FrameDto } from '../_hooks/types';
import { GameDto } from '../_hooks/types';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui/components/table';
import { MAX_FRAMES } from '@repo/util/bowling-score';
import { ScoreSheetCell } from './ScoreSheetCell';
import { groupBy } from 'es-toolkit';
import { calculateScore } from '@repo/util/bowling-score';

const FRAME_ROWS = Array.from({ length: MAX_FRAMES }, (_, index) => index + 1);

export const ScoreSheet: FC<{ game: GameDto; isReadOnly?: boolean }> = ({
  game,
  isReadOnly = false,
}) => {
  const { players, scores = [] } = game;

  const [frames, setFrames] = useState<FrameDto[]>(game.frames);
  const frameRows = useMemo(() => {
    return groupBy(frames, (item) => item.frame_number);
  }, [frames]);
  const frameColumns = useMemo(() => {
    return groupBy(frames, (item) => item.player_order);
  }, [frames]);

  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Frame</TableHead>
          {players.map((player) => (
            <TableHead key={player}>Player: {player}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {FRAME_ROWS.map((frame) => (
          <TableRow key={frame}>
            <TableCell>{frame}</TableCell>
            {players.map((player, index) => (
              <TableCell key={player}>
                <ScoreSheetCell
                  game={game}
                  isReadOnly={isReadOnly}
                  frame={frameRows[frame]?.find(
                    (item) => item.player_order === index,
                  )}
                  frameNumber={frame}
                  playerOrder={index}
                  isLastFrame={frame === MAX_FRAMES}
                  onChange={(data) => {
                    setFrames((prev) => {
                      const isExisted = prev.find(
                        (item) => item.id === data.id,
                      );
                      if (isExisted) {
                        return prev.map((item) =>
                          item.id === data.id ? data : item,
                        );
                      }
                      return [...prev, data];
                    });
                  }}
                />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow className="font-bold">
          <TableCell>Total</TableCell>
          {players.map((player, index) => (
            <TableCell key={player}>
              {scores[index] ||
                calculateScore(
                  frameColumns[index]?.map((item) => {
                    return {
                      roll_1: item.roll_1,
                      roll_2: item.roll_2,
                      roll_3: item.roll_3,
                    };
                  }) || [],
                )}
            </TableCell>
          ))}
        </TableRow>
      </TableFooter>
    </Table>
  );
};
