'use client';

import { FC } from 'react';
import { FrameDto } from '../_hooks/types';
import { useForm } from 'react-hook-form';
import { validateFrameData } from '@repo/util/bowling-score';

export const ScoreSheetCell: FC<{
  frame?: FrameDto;
  isLastFrame?: boolean;
  isReadOnly?: boolean;
  onChange?: (data: FrameDto) => void;
}> = ({ frame, isLastFrame, isReadOnly = false }) => {
  const { register, handleSubmit } = useForm<{
    roll_1: number;
    roll_2?: number;
    roll_3?: number;
  }>();

  const onSubmit = (data: {
    roll_1: number;
    roll_2?: number;
    roll_3?: number;
  }) => {
    console.log(data);
  };

  return (
    <form
      className="flex w-full gap-2 items-center justify-start"
      onChange={handleSubmit(onSubmit)}
    >
      <input
        {...register('roll_1')}
        defaultValue={frame?.roll_1}
        required
        className="border-b outline-none w-5 text-center"
        readOnly={isReadOnly}
      />
      <input
        {...register('roll_2')}
        defaultValue={frame?.roll_2}
        className="border-b outline-none w-5 text-center"
        readOnly={isReadOnly}
      />
      {isLastFrame && (
        <input
          {...register('roll_3')}
          defaultValue={frame?.roll_3}
          className="border-b outline-none w-5 text-center"
          readOnly={isReadOnly}
        />
      )}
    </form>
  );
};
