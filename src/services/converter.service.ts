import type { BridgeClientConfiguration, ConverterOptions } from "@/types.d";
import type { AxiosInstance } from "axios";
import { Service } from "./service";

export class ConverterService extends Service {
	constructor(http: AxiosInstance, storage: Storage, config: BridgeClientConfiguration) {
		super(http, storage, config);
	}

	public async convert(options: ConverterOptions): Promise<{ amount: string }> {
		const url = `/api/converter/${options.from}/${options.fromDecimals}/${options.amountScaled}/${options.to}/${options.toDecimals}`;

		return await this.http.get(url).then((res) => res.data);
	}
}
