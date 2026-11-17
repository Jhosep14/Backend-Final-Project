import pg from "pg";

const { Pool } = pg;

// I will reuse this pool throughout the application
const pool = new Pool({
    ssl: true,
    connectionTimeoutMillis: 5000,
}
);

pool.on("error", (error) => {
    console.log("PostgreSQL pool error", error.message);
})

export default pool;