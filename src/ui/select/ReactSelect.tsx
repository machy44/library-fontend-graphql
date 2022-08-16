import React from 'react';
import Select from 'react-select';
import { Controller } from 'react-hook-form';
import type { Option } from './types';

type ReactSelectProps = {
  name: string;
  control: any;
  placeholder: string;
  options: Option[];
};

export const ReactSelect: React.FC<ReactSelectProps> = ({
  name,
  control,
  placeholder,
  options,
}) => {
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
};
