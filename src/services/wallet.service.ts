import type { BridgeClientConfiguration, Wallet } from "@/types.d";
import type { AxiosInstance } from "axios";
import { Service } from "./service";

export class WalletService extends Service {
	constructor(http: AxiosInstance, storage: Storage, config: BridgeClientConfiguration) {
		super(http, storage, config);
	}

	public async getWallets(filters: { owners?: string[] } = {}): Promise<Wallet[]> {
		const params = new URLSearchParams();
		if (filters.owners && filters.owners.length) {
			params.set("owners", filters.owners.join(","));
		}

		return await this.http.get("/api/bridge/wallets", { params }).then((res) => res.data);
	}
}
