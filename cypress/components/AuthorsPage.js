export const AuthorsPage = {
  tableBody: 'author-table-body',
  editForm: 'author-edit-form',
  authorRow: 'author-row',
  getAuthorRow: function (rowNumber) {
    return `${this.authorRow}-${rowNumber}`;
  },
  bornInput: 'born',
  submitForm: 'update-author-submit',
};
