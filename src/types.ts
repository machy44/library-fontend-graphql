export interface IAuthor {
  name: string;
  id: string;
  born: number;
  bookCount: string;
}

export interface IBook {
  title: string;
  published: number;
  author: IAuthor;
  id: number;
  genres: string[];
}

export interface ChildrenProps {
  children: React.ReactNode;
}

export interface ClassNameProps {
  className: string;
}

export interface DateTestIdProps {
  'data-testid': string;
}

export type AdditionalProps = Partial<ClassNameProps & DateTestIdProps>;

export type ClassNameChildrenProps = ChildrenProps & Partial<ClassNameProps>;

export type AdditionAndChildrenProps = ChildrenProps & AdditionalProps;

export type UnArray<T> = T extends (infer U)[] ? U : T;
