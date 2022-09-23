import { Spinner } from '../ui/Spinner';
import { Title } from '../ui/Text';
import { Card, CardWithBorder } from '../ui/Card';
import { Table } from '../ui/Table';
import { AuthorForm } from '../components/AuthorForm';
import { useGetAllAuthors } from '../service/api';
import { useAuth } from '../auth';

const { Thead, Tr, Th, Tbody, Td } = Table;

const Authors: React.FC = () => {
  const { loading, error, data } = useGetAllAuthors();
  const { token } = useAuth();

  if (loading) return <Spinner />;
  if (error) {
    throw new Error(error.message);
  }

  if (data?.allAuthors === undefined) return null;

  return (
    <Card className="flex flex-col gap-10">
      <CardWithBorder className="grid gap-y-8">
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
      </CardWithBorder>
      {token && <AuthorForm data={data?.allAuthors} />}
    </Card>
  );
};

export default Authors;
