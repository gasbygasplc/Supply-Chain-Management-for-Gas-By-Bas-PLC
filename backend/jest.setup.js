
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();


beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/testdb", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});

jest.setTimeout(20000);
