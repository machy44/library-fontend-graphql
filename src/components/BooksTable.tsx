import React from 'react';
import { IBook } from '../types';
import { CardWithBorder } from '../ui/Card';
import { Table } from '../ui/Table';
import { Title } from '../ui/Text';

const { Thead, Tr, Th, Tbody, Td } = Table;

export interface IBooksTable {
  data: IBook[] | undefined;
  tableTitle?: string;
}

export function BooksTable({ data, tableTitle = 'books' }: IBooksTable) {
  if (data === undefined) return null;
  return (
    <CardWithBorder className="space-y-4">
      <Title className="text-center">{tableTitle}</Title>
      <Table>
        <Thead>
          <Tr>
            <Th />
            <Th>author</Th>
            <Th>published</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((a) => (
            <Tr key={a.id}>
              <Td>{a.title}</Td>
              <Td>{a.author.name}</Td>
              <Td>{a.published}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </CardWithBorder>
  );
}
