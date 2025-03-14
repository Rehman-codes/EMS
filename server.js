const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`✅ MongoDB Connected Successfully`);
            console.log(`🚀 Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error(`❌ Database connection failed: ${err.message}`);
        process.exit(1); // Exit if DB connection fails
    });
