import type { Option } from './types';

export const convertDataToOptions = <T extends { id: string; name: string }[]>(
  data: T,
): Option[] => {
  return data.map((element) => {
    return { value: element.name, label: element.name };
  });
};
