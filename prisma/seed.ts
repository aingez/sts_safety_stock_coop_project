// unfinished seed file
// never use

import { PrismaClient } from "@prisma/client";
import { root } from "postcss";
const prisma = new PrismaClient({ log: ["query"] }); // log all queries

async function main() {
    await prisma.staff.deleteMany();     // delete all stuff

    const staff1 = await prisma.staff.create({
        data: {
            staff_id: 1,
            name: "John Doe",
        }
    })
    const staff2 = await prisma.staff.create({
        data: {
            staff_id: 2,
            name: "Jane Doe",
        }
    })
    const history1 = await prisma.history.create({
        data: {
            history_id: 1,
            type: "Head",
            model: "A",
            serial: "235478",
            pallet_name: "HE45A",
            packer_id: 1,
            pack_date: new Date(),
            unpacker_id: 2,
            unpack_date: new Date(),
        }
    })
    const history2 = await prisma.history.create({
        data: {
            history_id: 2,
            type: "Head",
            model: "B",
            serial: "235479",
            pallet_name: "HE67B",
            packer_id: 1,
            pack_date: new Date(),
            unpacker_id: 2,
            unpack_date: new Date(),
        }
    })

//    const part1 = await prisma.current_stock_part.create({
//         data: {
//             serial: "235478",
//             model: "A",
//             type: "Head",
//             row_location: 1,
//             column_location: 1,

//         }
//    })

// Run the `main` function
// catch any errors and log them
// finally, close the database connection
// main ()
//     .catch((e) => {
//         console.error(e);
//     })
//     .finally(async () => {
//         await prisma.$disconnect();
//     }
// )
