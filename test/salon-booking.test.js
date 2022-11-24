import assert from 'assert';
import SalonBooking from '../salon-booking.js';
import pgPromise from 'pg-promise';

// TODO configure this to work.
const DATABASE_URL = process.env.DATABASE_URL || "postgresql://salon:salon123@localhost:5432/salon_test";

const config = {
    connectionString: DATABASE_URL
}

const pgp = pgPromise();
const db = pgp(config);

let booking = SalonBooking(db);

describe("The Booking Salon", function () {
    beforeEach(async function () {
        await db.none(`delete from booking`);
    });

    it("should be able to list treatments", async function () {

        const treatments = await booking.findAllTreatments();
        assert.equal(4, treatments.length);

    });

    it("should be able to find a stylist", async function () {

        const stylist = await booking.findStylist("0763112245");
        assert.equal("Politika", stylist.first_name);
        assert.equal("Madlala", stylist.last_name);


    });
    it("should be able to find a client", async function () {

        const client = await booking.findClient("0114527654");
        assert.deepEqual("Mark", client.first_name);

    });
    it("should be able to find a treatment", async function () {

        const treatment = await booking.findTreatment("Ped1");
        assert.equal("Pedicure", treatment.type);

    });
    it("should be able to allow a client to make a booking", async function () {

        const client = await booking.findClient("0731602587");
        const treatment = await booking.findTreatment("Man1");
        const stylist = await booking.findStylist("0126729988");
        await booking.makeBooking(
            client.id,
            treatment.id,
            stylist.id,
            "24 November 2022",
            "11:00"
        );

        const bookings = await booking.findClientBookings(client.id);
        assert.deepEqual(
            [{
                booking_date: "24 November 2022",
                booking_time: "15:30",
                client_id: client.id,
                treatment_id: treatment.id,
                stylist_id: stylist.id,
            }, ],
            bookings
        );

    });

    it("should be able to get client booking(s)", async function () {

        const client1 = await booking.findClient("0767879012");
        const client2 = await booking.findClient("0119037845");
        const client3 = await booking.findClient("0312346734");

        const treatment1 = await booking.findTreatment("brow1");
        const treatment2 = await booking.findTreatment("Mak1");

        const stylist = await booking.findStylist("021400555");
        const stylist2 = await booking.findStylist("0216728901");
        const stylist3 = await booking.findStylist("0763112245");

        await booking.makeBooking(
            client1.id,
            treatment1.id,
            stylist.id,
            "24 November 2022",
            "15:30"
        );
        await booking.makeBooking(
            client1.id,
            treatment1.id,
            stylist2.id,
            "24 November 2022",
            "15:30"
        );
        await booking.makeBooking(
            client1.id,
            treatment1.id,
            stylist3.id,
            "24 November 2022",
            "15:30"
        );

        const bookings = await booking.findAllBookings("24 November 2022");

        assert.equal(2, bookings.length);

    });
    it("should be able to get stylists that ever gave the treatment", async function () {

        const client = await booking.findClient("0763112245");

        const treatment = await booking.findTreatment("brow1");

        const stylist = await booking.findStylist("0126729988");
        const stylist2 = await booking.findStylist("0712345678");

        await booking.makeBooking(
            client.id,
            treatment.id,
            stylist.id,
            "24 November 2022",
            "15:30"
        );
        await booking.makeBooking(
            client.id,
            treatment.id,
            stylist2.id,
            "24 November 2022",
            "11:00"
        );

        const treatmentStylist = await booking.findStylistsForTreatment(
            treatment.id
        );

        assert.deepEqual(
            [{
                first_name: "Lefa"
            }, {
                first_name: "Nthabi"
            }],
            treatmentStylist
        );

    });
    it("should be able to get bookings for a date", async function () {

        const client1 = await booking.findClient("0767879012");
        const client2 = await booking.findClient("0312346734");
        const client3 = await booking.findClient("0119037845");

        const treatment1 = await booking.findTreatment("Ped1");
        const treatment2 = await booking.findTreatment("brow1");

        const stylist = await booking.findStylist("0712345678");
        const stylist2 = await booking.findStylist("0126729988");

        await booking.makeBooking(
            client1.id,
            treatment1.id,
            stylist.id,
            "24 November 2022",
            "11:00"
        );
        await booking.makeBooking(
            client1.id,
            treatment1.id,
            stylist.id,
            "24 November 2022",
            "11:00"
        );
        await booking.makeBooking(
            client3.id,
            treatment2.id,
            stylist2.id,
            "24 November 2022",
            "11:00"
        );
        let data = {
            time: "11:00",
            date: "24 November 2022"
        };
        const bookings = await booking.findBookings(data);

        assert.equal(1, bookings.length);

    });

    it("should be able to find the total income for a day", async function () {

        const client1 = await booking.findClient("0767879012");
        const client2 = await booking.findClient("0119037845");

        const treatment1 = await booking.findTreatment("Ped1");
        const treatment2 = await booking.findTreatment("brow1");

        const stylist = await booking.findStylist("0712345678");
        const stylist2 = await booking.findStylist("0126729988");

        await booking.makeBooking(
            client1.id,
            treatment1.id,
            stylist.id,
            "24 November 2022",
            "11:00"
        );
        await booking.makeBooking(
            client2.id,
            treatment2.id,
            stylist2.id,
            "24 November 2022",
            "11:00"
        );
        const amount = await booking.totalIncomeForDay("24 November 2022");

        assert.equal(415, amount.sum);

    });

    it("should be able to find the most valuable client", async function () {

        const client1 = await booking.findClient("0767879012");
        const client2 = await booking.findClient("0119037845");

        const treatment1 = await booking.findTreatment("Ped1");
        const treatment2 = await booking.findTreatment("brow1");

        const stylist = await booking.findStylist("0712345678");
        const stylist2 = await booking.findStylist("0126729988");

        await booking.makeBooking(
            client1.id,
            treatment1.id,
            stylist.id,
            "24 November 2022",
            "11:00"
        );
        await booking.makeBooking(
            client2.id,
            treatment2.id,
            stylist2.id,
            "24 November 2022",
            "11:00"
        );
        await booking.makeBooking(
            client2.id, treatment1.id, stylist2.id,
            "24 November 2022", "11:00"
        );
        const bestClient = await booking.mostValuableClient();
        assert.equal("Chris", bestClient.first_name);

    });
    after(function () {
        db.$pool.end();
    });
});