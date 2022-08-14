import { useGetAllBooks } from '../service/api';
import { CardWithBorder } from '../ui/Card';
import { Table } from '../ui/Table';
import { Title } from '../ui/Text';

const { Thead, Tr, Th, Tbody, Td } = Table;

const Books: React.FC = () => {
  const { data, error } = useGetAllBooks();

  if (error) {
    throw new Error(error.message);
  }

  return (
    <CardWithBorder>
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
    </CardWithBorder>
  );
};

export default Books;
