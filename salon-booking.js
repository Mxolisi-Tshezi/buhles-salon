export default function salonBooking(db) {

    async function findStylist(phoneNumber) {
        var results = await db.manyOrNone('select * from stylist where phone_number = $1', [phoneNumber])
        return results
    }

    return {
        findStylist,
        findClient,
        findTreatment,
        findAllTreatments,
        makeBooking,
        stylistId,
        findAllBookings,
        findClientBookings,
        findStylistsForTreatment,
        findAllBookings,
        totalIncomeForDay,
        mostValuebleClient,
        totalCommission





    }
}  