export interface IAuthor {
  name: string;
  id: string;
  born: number;
  bookCount: string;
}

export interface IBook {
  title: string;
  published: number;
  author: string;
  id: number;
  genres: string[];
}

export interface ChildrenProps {
  children: React.ReactNode;
}

export interface ClassNameProps {
  className: string;
}

export type ClassNameChildrenProps = ChildrenProps & Partial<ClassNameProps>;

export type UnArray<T> = T extends (infer U)[] ? U : T;
