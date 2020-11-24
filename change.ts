import { readLines } from "https://deno.land/std@0.76.0/io/bufio.ts";

async function promptString(question: String) {
    console.log(question)

    for await (const line of readLines(Deno.stdin)) {
       return line
    }
}

const price = await promptString("Input Price:");
const amountGiven = await promptString("Input Amount Given:");

if (price === undefined || amountGiven === undefined) {
    throw new Error("Neither input can be blank");
}

const priceNum: number = +price;
const amountNum: number = +amountGiven;

if (priceNum < amountNum) {
    let change: number = Math.ceil((amountNum - priceNum) * 100) / 100;
    const changeAbsolute = change;

    let coinArray: number[] = [0, 0, 0, 0];

    while (change - 0.25 >= 0) {
        coinArray[0]++;
        change -= 0.25;
    }
    while (change - 0.10 >= 0) {
        coinArray[1]++;
        change -= 0.10;
    }
    while(change - 0.05 >= 0) {
        coinArray[2]++;
        change -= 0.05;
    }
    while(change - 0.01 >= -0.01) {
        coinArray[3]++;
        change -= 0.01;
    }

    console.log(`Change: ${changeAbsolute}`);
    console.log(`Quarters: ${coinArray[0]}, Dimes: ${coinArray[1]}, Nickels: ${coinArray[2]}, Pennies: ${coinArray[3]}`);
} else if (priceNum === amountNum) {
    console.log("Change: 0");
} else {
    throw new Error("Amount cannot be less than price");
}