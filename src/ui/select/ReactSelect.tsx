import React from 'react';
import Select from 'react-select';
import { Controller } from 'react-hook-form';

type Option = { value: string; label: string };

export const convertDataToOptions = <T extends { id: string; name: string }[]>(
  data: T,
): Option[] => {
  return data.map((element) => {
    return { value: element.name, label: element.name };
  });
};

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
