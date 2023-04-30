import type { BridgeClientConfiguration } from "@/types.d";
import type { AxiosInstance } from "axios";

export abstract class Service {
	constructor(
		protected readonly http: AxiosInstance,
		protected readonly storage: Storage,
		protected readonly config: BridgeClientConfiguration
	) {}
}
