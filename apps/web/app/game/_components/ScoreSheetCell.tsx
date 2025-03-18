'use client';

import { FC, useCallback, useState } from 'react';
import { FrameDto, GameDto } from '../_hooks/types';
import { useForm } from 'react-hook-form';
import { validateFrameData } from '@repo/util/bowling-score';
import {
  useGameFrameCreationMutation,
  useGameFrameUpdateMutation,
} from '../_hooks/mutation';
import { toast } from 'sonner';
import { debounce } from 'es-toolkit';
import { formatFrameValue, parseFrameValue } from '../_utils';

export const ScoreSheetCell: FC<{
  game: GameDto;
  frameNumber: number;
  playerOrder: number;
  frame?: FrameDto;
  isLastFrame?: boolean;
  isReadOnly?: boolean;
  onChange: (data: FrameDto) => void;
}> = ({
  game,
  frame,
  frameNumber,
  playerOrder,
  isLastFrame = false,
  isReadOnly = false,
  onChange,
}) => {
  const { register, handleSubmit } = useForm<{
    roll_1: string;
    roll_2?: string;
    roll_3?: string;
  }>();
  const [error, setError] = useState<string>();

  const { mutate: updateFrame } = useGameFrameUpdateMutation({
    onSuccess(data) {
      onChange(data);
    },
    onError(error) {
      toast.error('Unable to update frame', { description: error.message });
    },
  });

  const { mutate: createFrame } = useGameFrameCreationMutation({
    onSuccess(data) {
      onChange(data);
    },
    onError: (error) => {
      toast.error('Unable to create frame', { description: error.message });
    },
  });
  const onSubmit = useCallback(
    (data: { roll_1: string; roll_2?: string; roll_3?: string }) => {
      console.log(data);
      const roll_1_value = parseFrameValue(data.roll_1);
      const roll_2_value = data.roll_2
        ? parseFrameValue(data.roll_2, [data.roll_1])
        : undefined;
      const roll_3_value = data.roll_3
        ? parseFrameValue(data.roll_3, [data.roll_1, data.roll_2 || '0'])
        : undefined;
      const isValid = validateFrameData(
        {
          roll_1: roll_1_value,
          roll_2: roll_2_value,
          roll_3: roll_3_value,
        },
        isLastFrame,
      );
      if (!isValid) {
        setError('Invalid frame data');
      } else {
        setError(undefined);
        if (frame) {
          updateFrame({
            body: {
              id: frame.id,
              frame_number: frameNumber,
              game_id: game.id,
              player_order: playerOrder,
              roll_1: roll_1_value,
              roll_2: roll_2_value,
              roll_3: roll_3_value,
            },
            params: {
              path: {
                frameId: frame.id,
              },
            },
          });
        } else {
          createFrame({
            body: {
              frame_number: frameNumber,
              game_id: game.id,
              player_order: playerOrder,
              roll_1: roll_1_value,
              roll_2: roll_2_value,
              roll_3: roll_3_value,
            },
          });
        }
      }
    },
    [
      frame,
      frameNumber,
      game.id,
      playerOrder,
      onChange,
      createFrame,
      updateFrame,
    ],
  );

  return (
    <form
      className="w-full flex flex-col gap-1"
      onChange={debounce(handleSubmit(onSubmit), 1000)}
    >
      <div className="flex w-full gap-2 items-center justify-start">
        <input
          {...register('roll_1')}
          defaultValue={frame ? formatFrameValue(frame.roll_1) : ''}
          required
          className="border-b outline-none w-5 text-center uppercase"
          readOnly={isReadOnly}
        />
        <input
          {...register('roll_2')}
          defaultValue={
            frame?.roll_2 ? formatFrameValue(frame.roll_2, [frame.roll_1]) : ''
          }
          className="border-b outline-none w-5 text-center uppercase"
          readOnly={isReadOnly}
        />
        {isLastFrame && (
          <input
            {...register('roll_3')}
            defaultValue={
              frame?.roll_2 && frame?.roll_3
                ? formatFrameValue(frame.roll_3, [
                    frame.roll_1,
                    frame?.roll_2 || 0,
                  ])
                : ''
            }
            className="border-b outline-none w-5 text-center uppercase"
            readOnly={isReadOnly}
          />
        )}
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};
