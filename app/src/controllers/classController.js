import { getAllClasses, getClassByLevel } from "../models/classesModel.js";

export async function showClasses(req, res) {
    const { search = "", level: requestedLevel = "All" } = res.locals.filter || {};

    const allClasses = await getAllClasses();
    const levels = ["All", ...new Set(allClasses.map(c => c.level))];
    
    const activeLevel = levels.includes(requestedLevel) ? requestedLevel : "All";

    const classes = getClassByLevel(allClasses, {
        search,
        level: activeLevel
    });

    res.render("classes", {
        title: "Classes",
        classes,
        allClasses,
        levels,
        activeLevel,
        search
    });
};