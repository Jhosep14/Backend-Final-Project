// Temporary catalogue until the PostgreSQL connection is implemented.
const books = [
  { 
    title: "Gateway to the World", 
    subtitle: "Student's Book", 
    level: "A1", series: "Gateway", 
    cover: "/images/covers/gateway-a1.jpg" },
  { 
    title: "Voices Elementary", 
    subtitle: "Student's Book", 
    level: "A2", series: "Voices", 
    cover: "/images/covers/voices-a2.jpg" },
  { 
    title: "Voices Intermediate Plus", 
    subtitle: "Student's Book", 
    level: "B1", 
    series: "Voices", 
    cover: "/images/covers/voices-b1.jpg" },
  { 
    title: "Ready for B2 First", 
    subtitle: "Student's Book", 
    level: "B2", 
    series: "Ready For", 
    cover: "/images/covers/ready-b2.jpg" },
];

export function getAllBooks() {
  return books;
}

export function findBooks({ search = "", series = "All" } = {}) {
  return books.filter((book) => {
    const matchesSeries = series === "All" || book.series === series;
    const matchesSearch = [book.title, book.subtitle, book.level, book.series]
      .join(" ").toLowerCase().includes(search.toLowerCase());
    return matchesSeries && matchesSearch;
  });
}
