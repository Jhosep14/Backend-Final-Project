export function classesFilter(req, res, next) {
    const search = typeof req.query.q === "string" ? req.query.q.trim().slice(0, 25) : "";
    
    const level = typeof req.query.level === "string" 
        ? req.query.level 
        : (typeof req.query.l === "string" ? req.query.l : "All");

    res.locals.filter = {
        search,
        level,
    };
    next();
}