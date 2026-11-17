import { findBooks, getAllBooks, getBookById } from "../models/bookModel.js";
import supabase from "../db/supabase.js"

export async function showBooks(req, res) {
  const { search, series: requestedSeries } = res.locals.bookFilters;

  // Wait for PostgreSQL before preparing the page.
  const allBooks = await getAllBooks();

  const series = [
    "All",
    ...new Set(allBooks.map((book) => book.series).filter(Boolean)),
  ];

  const activeSeries = series.includes(requestedSeries)
    ? requestedSeries
    : "All";



    

  // Filter the records already retrieved from PostgreSQL.
  const books = findBooks(allBooks, {
    search,
    series: activeSeries,
  });

  res.render("books", {
    title: "Books",
    books,
    allBooks,
    series,
    activeSeries,
    search,
  });
}