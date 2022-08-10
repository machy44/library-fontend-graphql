import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';
import { IBook } from '../types';
import { Card } from '../ui/Card';
import { Table } from '../ui/Table';
import { Title } from '../ui/Text';

const { Thead, Tr, Th, Tbody, Td } = Table;

const Books: React.FC = () => {
  const { data, error } = useQuery<{ allBooks: IBook[] }>(ALL_BOOKS);

  if (error) {
    throw new Error(error.message);
  }

  return (
    <Card>
      <Title className="text-center">books</Title>
      <Table>
        <Thead>
          <Tr>
            <Th />
            <Th>author</Th>
            <Th>published</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.allBooks.map((a) => (
            <Tr key={a.id}>
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
