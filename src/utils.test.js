import { unique, mockedBooksData, groupGenres } from './utils';

const genres = ['refactoring', 'agile', 'patterns', 'design', 'refactoring', 'classic', 'crime'];
const genres2 = [
  'refactoring',
  'refactoring',
  'refactoring',
  'refactoring',
  'refactoring',
  'refactoring',
  'crime',
];

describe('utils', () => {
  describe('unique', () => {
    it('should return unique values', () => {
      expect(unique(genres)).toEqual([
        'refactoring',
        'agile',
        'patterns',
        'design',
        'classic',
        'crime',
      ]);
    });
    it('should return unique values 2', () => {
      expect(unique(genres2)).toEqual(['refactoring', 'crime']);
    });
  });
  describe('group genre', () => {
    it('should add all genres in array', () => {
      expect(groupGenres(mockedBooksData).length).toBe(13);
    });
  });
});
