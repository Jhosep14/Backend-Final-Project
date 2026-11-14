export function bookFilter(req, res, next) {
  // Read the search term from the URL
  const search = typeof req.query.q === 'string' ? req.query.q.trim().slice(0, 100) : "";

  // Read the chosen series
  const series = typeof req.query.series === 'string' ? req.query.series: "All"; 

  // Make search and series available to the view
  res.locals.bookFilters = {search, series};

  // Continue to the route handler
  next();
}