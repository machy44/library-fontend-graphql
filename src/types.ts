export interface IAuthor {
  name: string;
  id: string,
  born: number,
  bookCount: string
}


export interface IBook {
  title: string,
  published: number,
  author: string,
  id: number,
  genres: string[]
}

export interface Props {
  show: boolean
};