import { timetable } from "./timetable.js";

export function getAllClasses() {
    return timetable;
}

export function getClassByLevel({ search = "", level = "All", days = "All" } = {}) {
    return timetable.filter(cls => {
        const levelMatch = !level || level === "All" || cls.level.toLowerCase() === level.toLowerCase();
        
        const scheduleDays = Array.isArray(cls.schedule) ? cls.schedule.map(s => s.day) : [];
        const daysMatch = !days || days === "All" || scheduleDays.includes(days);

        const scheduleText = Array.isArray(cls.schedule) 
            ? cls.schedule.map(s => `${s.day} ${s.time}`).join(" ") 
            : "";
        const searchMatch = [cls.level, cls.teacher, cls.price, cls.duration, cls.startDate, cls.endDate, scheduleText]
            .join(" ").toLowerCase().includes(search.toLowerCase());

        return levelMatch && daysMatch && searchMatch;
    });
}