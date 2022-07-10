import { IAuthor } from '../types';
import { ALL_AUTHORS } from '../queries';
import { useQuery } from '@apollo/client';
import { Spinner } from '../ui/Spinner';
import { Title } from '../ui/Text';
import { Card } from '../ui/Card';
import { Table } from '../ui/Table';

const { Thead, Tr, Th, Tbody, Td } = Table;

const Authors: React.FC = () => {
  const { data, loading } = useQuery<{ allAuthors: IAuthor[] }>(ALL_AUTHORS);

  if (loading) return <Spinner />;

  if (data?.allAuthors === undefined) return null;

  return (
    <Card className="grid gap-y-8">
      <Title className="text-center">authors</Title>
      <Table>
        <Thead>
          <Tr>
            <Th />
            <Th>born</Th>
            <Th>books</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.allAuthors.map((a) => (
            <Tr key={a.id}>
              <Td>{a.name}</Td>
              <Td>{a.born}</Td>
              <Td>{a.bookCount}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Card>
  );
};

export default Authors;
