import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';
import { IBook } from '../types';
import { Card } from '../ui/Card';
import { Table, THead, Tr, Th, Tbody, Td } from '../ui/Table';
import { Title } from '../ui/Text';

const Books: React.FC = () => {
  const { data } = useQuery<{ allBooks: IBook[] }>(ALL_BOOKS);

  return (
    <Card>
      <Title className="text-center">books</Title>
      <Table>
        <THead>
          <Tr>
            <Th />
            <Th>author</Th>
            <Th>published</Th>
          </Tr>
        </THead>
        <Tbody>
          {data?.allBooks.map((a) => (
            <Tr key={a.title}>
              <Td>{a.title}</Td>
              <Td>{a.author}</Td>
              <Td>{a.published}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Card>
  );
};

export default Books;
