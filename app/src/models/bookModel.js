import pool from "../db/postgres.js";

// Existing artwork; all database cover keys are currently empty.
const localCovers = {
  "ENG-A1-001": "/images/covers/gateway-a1.jpg",
  "ENG-A2-001": "/images/covers/voices-a2.jpg",
  "ENG-B1-001": "/images/covers/voices-b1.jpg",
  "ENG-B2-001": "/images/covers/ready-b2.jpg",
};

// Your database currently has no series column.
const seriesNames = ["Gateway", "Voices", "Ready For"];

export async function getAllBooks() {
  const { rows } = await pool.query(`
    SELECT
      book_id AS id,
      book_name AS title,
      book_level AS level,
      book_code AS code,
      book_pdf_key AS "pdfKey"
    FROM public.book_info
    ORDER BY book_level, book_id
  `);

  return rows.map((book) => ({
    ...book,
    cover: localCovers[book.code] ?? null,
    series: seriesNames.find((series) =>
      book.title.toLowerCase().startsWith(series.toLowerCase())
    ) ?? null,
  }));
}

export function findBooks(
  books,
  { search = "", series = "All" } = {}
) {
  const searchTerm = search.toLowerCase();

  return books.filter((book) => {
    const matchesSeries =
      series === "All" || book.series === series;

    const matchesSearch = [book.title, book.level, book.series]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm);

    return matchesSeries && matchesSearch;
  });
}
export async function getBookById(bookId) {
  const { rows } = await pool.query(
    `
      SELECT
        book_id AS id,
        book_name AS title,
        book_pdf_key AS "pdfKey"
      FROM public.book_info
      WHERE book_id = $1
    `,
    [bookId]
  );

  return rows[0] ?? null;
}