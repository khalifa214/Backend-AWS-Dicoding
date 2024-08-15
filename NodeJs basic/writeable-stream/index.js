const fs = require("fs");
const path = require("path");

const readStreamText = fs.createReadStream(path.resolve(__dirname, "input.txt"), {
    highWaterMark: 15,
})

const writeStreamText = fs.createWriteStream("output.txt");

readStreamText.on("readable", () => {
    try {
        writeStreamText.write(`${readStreamText.read()}\n`);
    } catch (error) {
        console.log(error);
    }
})

readStreamText.on("end", () => {
    console.log("Selesai menulis data");
})





