export default function salonBooking(db) {
    async function findStylist(phoneNumber) {
        let db_results = await db.oneOrNone(
          "select * from stylist where phone_number = $1",[phoneNumber]
        );
        return db_results;
      
    }
    async function findClient(phoneNumber) {
  
        let db_results = await db.oneOrNone(
          "select * from client where phone_number = $1",[phoneNumber]
        );
        return db_results;
  
    }
    async function findTreatment(code) {
  
        let db_results = await db.oneOrNone(
          "select * from treatment where code = $1",[code]
        );
        return db_results;
  
    }
    async function findAllTreatments() {
  
        let db_results = await db.manyOrNone("select * from treatment");
        return db_results;
  
    }
    async function makeBooking(clientId, treatmentId, stylistId, date, time) {
  
        if (!clientId || !treatmentId || !stylistId || !date || !time) {
          return;
        } else {
          let stylistCount = await db.oneOrNone(
            "select count(*) from booking where stylist_id = $1 and booking_date = $2 and booking_time = $3 ",
            [stylistId, date, time]
          );
          if (Number(stylistCount.count) === 1) {
            return;
          }
          let db_results = await db.oneOrNone(
            "select count(*) from booking where treatment_id = $1 and booking_date = $2 and booking_time = $3 ",
            [treatmentId, date, time]
          );
          if (Number(db_results.count) >= 2) {
            return;
          }
          await db.none(
            "insert into booking(booking_date,booking_time,client_id,treatment_id,stylist_id) values($1,$2,$3,$4,$5)",
            [date, time, clientId, treatmentId, stylistId]
          );
        }
  
    }
    async function findClientBookings(clientId) {
  
        let db_resultss = await db.manyOrNone(
          "select booking_date,booking_time,client_id,treatment_id,stylist_id from booking where client_id = $1",
          [clientId]
        );
        db_resultss.forEach((item) => {
          let day = item.booking_date.getDate();
          let month = item.booking_date.getMonth() + 1;
          let year = item.booking_date.getFullYear();
          item.booking_date = `${day}/${month}/${year}`;
        });
        return db_resultss;
  
    }
    async function findAllBookings(date) {
  
        let db_results = await db.manyOrNone(
          "select * from booking where booking_date = $1",
          [date]
        );
        return db_results;
  
    }
    async function findStylistsForTreatment(treatmentId) {
  
        let db_results = await db.manyOrNone(
          "select first_name from stylist join booking on stylist.id = booking.stylist_id where treatment_id = $1",
          treatmentId
        );
        return db_results;
  
    }
    async function findBookings(data) {
  
        let date = "";
        let time = "";
        if (data.date) {
          date = data.date;
        }
        if (data.time) {
          time = data.time;
        }
        if (date !== "" && time !== "") {
          return await db.manyOrNone(
            "select * from booking where booking_date = $1 and booking_time = $2",
            [date, time]
          );
        }
        if (date !== "" && time === "") {
          return await db.manyOrNone(
            "select * from booking where booking_date = $1",
            [date]
          );
        }
        if (date === "" && time !== "") {
          return await db.manyOrNone(
            "select * from booking where booking_time = $1",
            [time]
          );
        }
  
    }
    async function totalIncomeForDay(date) {
  
        let db_results = await db.oneOrNone(
          "select sum(price), booking_date from treatment join booking on treatment.id = booking.treatment_id where booking_date = $1 group by booking_date",
          [date]
        );
        return db_results;
    }
    async function mostValuableClient() {
  
        let db_results = await db.manyOrNone(
          "select sum(price),client_id from booking join treatment on booking.treatment_id = treatment.id group by client_id"
        );
        let price = 0;
        let valuableClientId = {};
        db_results.forEach((item) => {
          if (item.sum > price) {
            price = item.sum;
            valuableClientId = { id: item.client_id };
          }
        });
        let client = await db.oneOrNone(
          "select first_name from client where id = $1",
          [valuableClientId.id]
        );
        return client;
  
    }
  
    return {
      findStylist,
      findClient,
      findTreatment,
      findAllTreatments,
      makeBooking,
      findClientBookings,
      findAllBookings,
      findStylistsForTreatment,
      findBookings,
      totalIncomeForDay,
      mostValuableClient,
    };
  }