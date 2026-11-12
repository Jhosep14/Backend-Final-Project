import { findBooks, getAllBooks } from "../models/bookModel.js";

export function showBooks(req, res) {
  const { search, series: requestedSeries } = res.locals.bookFilters;

  // Get the current books and create the list of available series.
  const allBooks = getAllBooks();
  const series = ["All", ...new Set(allBooks.map((book) => book.series))];

  // Use "All" if the requested series does not exist.
  const activeSeries = series.includes(requestedSeries)
    ? requestedSeries
    : "All";

  const books = findBooks({
    search,
    series: activeSeries,
  });

  // Pass the values your existing books.ejs expects.
  res.render("books", {
    title: "Books",
    books,
    allBooks,
    series,
    activeSeries,
    search,
  });
}