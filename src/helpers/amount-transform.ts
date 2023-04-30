import BigNumber from "bignumber.js";

export class AmountTransform {
	static fromCents(amountScaled: number | bigint | string, decimals = 8, scale = decimals): string {
		return new BigNumber(Number(amountScaled)).dividedBy(10 ** decimals).toFixed(scale);
	}

	static toCents(amount: number | bigint | string, decimals = 8): string {
		return new BigNumber(Number(amount)).multipliedBy(10 ** decimals).toFixed(0);
	}
}
