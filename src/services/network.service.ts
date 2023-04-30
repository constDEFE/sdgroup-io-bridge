import type { NetworkOptions, Network, NetworkRequest } from "@/types.d";
import { NetworkType } from "@/enums";
import type { AxiosInstance } from "axios";

export class NetworkService {
	constructor(private readonly http: AxiosInstance) {}

	public async getNetworkByCode(code: string): Promise<Network> {
		const networks = await this.getNetworks();
		const network = networks.find((item) => item.code === code);

		if (!network) {
			throw new Error(`Network ${code} not found`);
		}

		return network;
	}

	public async getNetworks(): Promise<Network[]> {
		return await this.http
			.get("/api/networks", {
				headers: {
					"content-type": "application/json"
				}
			})
			.then((res) => res.data);
	}

	public async create(options: NetworkOptions): Promise<Network> {
		const request: NetworkRequest = {
			name: options.name,
			code: options.code,
			kind: options.kind,
			url: options.url,
			apiKey: "",
			username: "",
			password: ""
		};

		if (options.kind === NetworkType.TRON_COMPATIBLE) {
			request.apiKey = options.apiKey;
		}

		return await this.http.post(`/api/network`, request);
	}

	public async delete(code: string): Promise<void> {
		await this.http.delete(`/api/network/${code}`);
	}
}
