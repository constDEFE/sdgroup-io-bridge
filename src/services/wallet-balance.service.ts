import type { BridgeClientConfiguration, WalletWithBalances } from "@/types.d";
import { Service } from "./service";
import type { AxiosInstance } from "axios";

export class WalletBalanceService extends Service {
	constructor(http: AxiosInstance, storage: Storage, config: BridgeClientConfiguration) {
		super(http, storage, config);
	}

	public async getWalletsWithBalances(filters: { owners?: string[] } = {}): Promise<WalletWithBalances[]> {
		const params = new URLSearchParams();
		if (filters.owners && filters.owners.length) {
			params.set("owners", filters.owners.join(","));
		}

		return await this.http.get("/api/wallet-balances", { params }).then((res) => res.data);
	}
}
