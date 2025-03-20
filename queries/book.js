const getBook = `SELECT id, title
	FROM public.books WHERE status = true ORDER BY title`;

const bookDetails = `SELECT id, title, author, price, "desc", status
	FROM public.books WHERE id = $1`;

module.exports = {
  getBook,
  bookDetails,
};
