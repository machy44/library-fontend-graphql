import React from 'react';
import { Control } from 'react-hook-form';
import Select from 'react-select';
import { Controller } from 'react-hook-form';
import type { Option } from './types';

type ReactSelectProps<T> = {
  name: string;
  control: Control<T>;
  placeholder: string;
  options: Option[];
};

export function ReactSelect<T extends Record<string, any>>({
  name,
  control,
  placeholder,
  options,
}: ReactSelectProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        return (
          <Select
            options={options}
            onChange={(e) => {
              if (e) {
                onChange(e.value);
              }
            }}
            value={options.filter((option) => value?.includes(option.value))}
            placeholder={placeholder}
          />
        );
      }}
    />
  );
}
