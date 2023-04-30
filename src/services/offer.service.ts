import type { BridgeClientConfiguration, Offer } from "@/types.d";
import type { AxiosInstance } from "axios";
import { Service } from "./service";

export class OfferService extends Service {
	constructor(http: AxiosInstance, storage: Storage, config: BridgeClientConfiguration) {
		super(http, storage, config);
	}

	public async getOffers(): Promise<Offer[]> {
		return await this.http.get("/api/offers").then((res) => res.data);
	}
}
