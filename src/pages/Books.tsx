import { BooksTable } from '../components/BooksTable';
import { useGetAllBooks } from '../service/api';

const Books: React.FC = () => {
  const { data, error } = useGetAllBooks();

  if (error) {
    throw new Error(error.message);
  }

  return <BooksTable data={data?.allBooks} />;
};

export default Books;
