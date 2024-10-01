import Subscription from "@models/subscriptions";
import User from "@models/users";
import { NextResponse } from "next/server";
import { dbConn } from "@utils/database";

export const GET = async () => {
    await dbConn();
    try {
        const subscriptions = await Subscription.find({});
        const activesub = subscriptions.filter((item) => item.status === "active");

        const allUsers = await User.find({ _id: activesub.map((id) => id.userId) });
        if (!subscriptions) {
            return {
                status: 204,
                body: JSON.stringify({ message: "No subscriptions yet" }),
            };
        }

        const updateBalanceBasedOnInstrument = (balances, transaction) => {
            const { instruments, earning } = transaction;

            // Mapping of instruments to balance keys
            const instrumentToBalanceKey = {
                "btc Mining": "bitcoin",
                "eth Mining": "ethereum",
                "ltc Mining": "litecoin",
                "xmr Mining": "monero",
                "xrp Mining": "ripple",
                "zec Mining": "zcash",
                "copy Trading": "trading", // example if you have trading too
                // Note: Deposit balance is intentionally omitted
            };

            // Find the respective balance key for the given instrument
            const balanceKey = instrumentToBalanceKey[instruments];

            if (balanceKey) {
                // Update the respective balance
                balances[balanceKey] += earning;
            } else {
                console.error(`Instrument '${instruments}' not recognized.`);
            }

            return balances;
        };

        for (const user of allUsers) {
            const { balances } = user;

            // Keep the original deposit balance
            const originalDepositBalance = balances.deposit;

            // Update the balances based on the active subscriptions of the user
            activesub.forEach((el) => {
                updateBalanceBasedOnInstrument(balances, el);
            });

            // Ensure deposit balance remains unchanged
            balances.deposit = originalDepositBalance;

            // Save the updated user balances
            await user.save();
        }

        return NextResponse.json({ allUsers, activesub }, { status: 200 });
    } catch (error) {
        console.log(`${error.message}`);

        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
