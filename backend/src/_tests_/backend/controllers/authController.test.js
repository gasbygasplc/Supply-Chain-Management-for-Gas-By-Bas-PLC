let request;
let mongoose;
let MongoMemoryServer;
let app;
let User;
let mongoServer;
let server;

beforeAll(async () => {
    request = (await import("supertest")).default;
    mongoose = (await import("mongoose")).default;
    MongoMemoryServer = (await import("mongodb-memory-server")).MongoMemoryServer;
    app = (await import("../../../../server.js")).default;
    User = (await import("../../../models/User.js")).default;

    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }

    server = app;
});

afterEach(async () => {
    if (User) {
        await User.deleteMany({});
    }
});

afterAll(async () => {
    if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
    }
    if (mongoServer) {
        await mongoServer.stop();
    }
});

describe("Auth API Tests", () => {
    test("should register a user", async () => {
        const res = await request(server).post("/api/auth/register").send({
            name: "Test User",
            nic: "200118706543",
            phone: "94771234567",
            email: `test${Date.now()}@example.com`,
            password: "password123",
            role: "User",
        });

        expect(res.statusCode).toBe(201);
        expect(res.body.success).toBe(true);
    }, 15000); // Increased timeout for stability

    test("should fail registration for duplicate email", async () => {
        const testEmail = `dup${Date.now()}@example.com`;

        await request(server).post("/api/auth/register").send({
            name: "Test User",
            nic: "200118706543",
            phone: "94771234567",
            email: testEmail,
            password: "password123",
            role: "User",
        });

        const res = await request(server).post("/api/auth/register").send({
            name: "Test User",
            nic: "200118706543",
            phone: "94771234567",
            email: testEmail,
            password: "password123",
            role: "User",
        });

        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe("User already exists.");
    }, 30000);
});
