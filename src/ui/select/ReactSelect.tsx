import React from 'react';
import Select from 'react-select';

type Option = { value: string; label: string };

export const convertDataToOptions = <T extends { id: string; name: string }[]>(
  data: T,
): Option[] => {
  return data.map((element) => {
    return { value: element.name, label: element.name };
  });
};

export const ReactSelect = (props: any) => {
  console.log({ props });
  return <Select {...props} />;
};
