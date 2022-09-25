import { BooksTable } from '../components/BooksTable';
import { useGenreBooks } from '../service/api';
import { useAuth } from '../auth';

export const RecommendBooks: React.FC = () => {
  const { userProfile } = useAuth();
  const { data, error } = useGenreBooks(userProfile?.favoriteGenre);

  console.log({ userProfile });

  if (error) {
    throw new Error(error.message);
  }

  return (
    <BooksTable
      data={data?.allBooks}
      tableTitle={`Books in your favorite genre: ${userProfile?.favoriteGenre}`}
    />
  );
};
