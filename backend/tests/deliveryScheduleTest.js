const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const app = require('../src/server'); // Adjust the path to your server.js file

chai.use(chaiHttp);

describe('Delivery Schedule API Tests', () => {
    it('should schedule a delivery successfully', (done) => {
        chai.request(app)
            .post('/api/delivery/schedule') // The actual endpoint for scheduling delivery
            .send({
                requestId: '12345', // Replace with a valid requestId from your database
                driverName: 'John Doe',
                vehicleNumber: 'XYZ-1234',
                scheduledDate: '2025-01-20', // A valid future date
            })
            .end((err, res) => {
                // Ensure the response has the expected status and structure
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('success', true);
                expect(res.body).to.have.property('message', 'Delivery scheduled successfully');
                expect(res.body.delivery).to.have.property('orderId');
                expect(res.body.delivery).to.have.property('customerName');
                expect(res.body.delivery).to.have.property('deliveryDate');
                done();
            });
    });

    it('should return an error for missing required fields', (done) => {
        chai.request(app)
            .post('/api/delivery/schedule')
            .send({
                driverName: 'John Doe',
                vehicleNumber: 'XYZ-1234',
                // Missing requestId and scheduledDate
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('success', false);
                expect(res.body).to.have.property('message', 'Missing required fields');
                done();
            });
    });

    it('should return an error for an invalid requestId', (done) => {
        chai.request(app)
            .post('/api/delivery/schedule')
            .send({
                requestId: 'invalid-id',
                driverName: 'John Doe',
                vehicleNumber: 'XYZ-1234',
                scheduledDate: '2025-01-20',
            })
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('success', false);
                expect(res.body).to.have.property('message', 'Gas request not found');
                done();
            });
    });
});
