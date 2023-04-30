import type { Application, BridgeClientConfiguration } from "@/types.d";
import { Service } from "./service";
import type { AxiosInstance } from "axios";

export class ApplicationService extends Service {
	constructor(http: AxiosInstance, storage: Storage, config: BridgeClientConfiguration) {
		super(http, storage, config);
	}

	public async create(name: string): Promise<Application> {
		return await this.http.post("/api/application").then((res) => res.data);
	}

	public async getApplications(): Promise<Application[]> {
		return await this.http.get("/api/applications").then((res) => res.data);
	}

	public async getMyApplications(): Promise<Application[]> {
		return await this.http.get("/api/my-applications").then((res) => res.data);
	}

	public async exportPrivateKey(password: string): Promise<string> {
		// TODO decipher private key
		return "secret key";
	}

	public async resetPrivateKey(password: string): Promise<void> {
		// TODO reset private key
	}
}
