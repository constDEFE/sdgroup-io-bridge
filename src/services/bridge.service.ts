import type { Balance, TransferOptions } from "@/types.d";
import { CallerType, HeadersEnum } from "@/enums";
import { Service } from "./service";

export class BridgeService extends Service {
	public async getBalance(network: string, symbol: string, address: string): Promise<Balance> {
		return await this.http
			.get<Balance>(`/api/bridge/${network}/${symbol}/wallet/${address}/balance`, {
				headers: {
					[HeadersEnum.X_CALLER_TYPE]: CallerType.APPLICATION
				}
			})
			.then((res) => res.data);
	}

	public async transfer(options: TransferOptions): Promise<{ transactionId: string }> {
		return await this.http
			.post(
				`/api/bridge/${options.network}/${options.symbol}/transfer`,
				{
					from: options.from,
					to: options.to,
					amount: options.amount
				},
				{
					headers: {
						[HeadersEnum.X_CALLER_TYPE]: CallerType.APPLICATION
					}
				}
			)
			.then((res) => res.data);
	}
}
