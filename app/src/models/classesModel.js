import pool from "../db/postgres.js";

const weekdays = [
  "Monday", "Tuesday", "Wednesday", "Thursday",
  "Friday", "Saturday", "Sunday",
];

function formatTime(time) {
  const [hours, minutes] = time.split(":");
  const hour = Number(hours);
  const displayHour = String(hour % 12 || 12).padStart(2, "0");

  return `${displayHour}:${minutes} ${hour >= 12 ? "PM" : "AM"}`;
}

export async function getAllClasses() {
  const { rows } = await pool.query(`
    SELECT
      c.class_id AS id,
      ci.class_name AS level,
      concat_ws(' ', u.user_name, u.user_last_name) AS teacher,
      c.monthly_price AS price,
      c.duration_months AS duration,
      c.start_date::text AS "startDate",
      c.end_date::text AS "endDate",
      s.weekday,
      s.start_time AS "startTime",
      s.end_time AS "endTime"
    FROM public.classes AS c
    JOIN public.class_info AS ci ON ci.class_id = c.class_id
    JOIN public.user_info AS u ON u.user_id = c.teacher_id
    LEFT JOIN public.class_schedule AS s ON s.class_id = c.class_id
    ORDER BY c.class_level, c.class_id, s.weekday, s.start_time
  `);

  const classes = new Map();

  for (const row of rows) {
    // Create each class once.
    if (!classes.has(row.id)) {
      classes.set(row.id, {
        id: row.id,
        level: row.level,
        teacher: row.teacher,
        price: `$${Number(row.price).toFixed(2)} / month`,
        duration: `${row.duration} ${
          row.duration === 1 ? "month" : "months"
        }`,
        startDate: row.startDate,
        endDate: row.endDate,
        schedule: [],
      });
    }

    // Add each session to its class.
    if (row.weekday !== null) {
      classes.get(row.id).schedule.push({
        day: weekdays[row.weekday - 1],
        time: `${formatTime(row.startTime)} - ${formatTime(row.endTime)}`,
      });
    }
  }

  return [...classes.values()];
}

export function getClassByLevel(
  classes,
  { search = "", level = "All", days = "All" } = {}
) {
  const searchTerm = search.toLowerCase();

  return classes.filter((cls) => {
    const levelMatch =
      !level ||
      level === "All" ||
      cls.level.toLowerCase() === level.toLowerCase();

    const daysMatch =
      !days ||
      days === "All" ||
      cls.schedule.some((session) => session.day === days);

    const scheduleText = cls.schedule
      .map((session) => `${session.day} ${session.time}`)
      .join(" ");

    const searchMatch = [
      cls.level,
      cls.teacher,
      cls.price,
      cls.duration,
      cls.startDate,
      cls.endDate,
      scheduleText,
    ]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm);

    return levelMatch && daysMatch && searchMatch;
  });
}