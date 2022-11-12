import { unique, groupGenres } from './utils';
import { mockedBooksData } from './testUtils';

const testMockedData = [...mockedBooksData, ...mockedBooksData, ...mockedBooksData];

describe('utils', () => {
  describe('unique', () => {
    it('should return unique values', () => {
      const titleUnique = unique('title');
      expect(titleUnique(testMockedData)).toEqual(mockedBooksData);
    });
  });
  describe('group genre', () => {
    it('should add all genres in array', () => {
      expect(groupGenres(mockedBooksData).length).toBe(13);
    });
  });
});
