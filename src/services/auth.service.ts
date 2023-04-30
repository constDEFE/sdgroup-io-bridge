import type { Account, BridgeClientConfiguration } from "@/types.d";
import type { AxiosInstance } from "axios";
import { Service } from "./service";

export class AuthService extends Service {
	private readonly authMessage = "Authentication";

	constructor(http: AxiosInstance, storage: Storage, config: BridgeClientConfiguration) {
		super(http, storage, config);
	}

	public async loginViaMetamask(): Promise<{ token: string }> {
		if ("ethereum" in window) {
			const provider = window.ethereum as {
				request: (...any: any[]) => Promise<any>;
			};
			const accounts = await provider.request({
				method: "eth_requestAccounts"
			});
			const account = accounts[0];

			const signature = await provider.request({
				method: "personal_sign",
				params: [this.authMessage, account]
			});

			const { token } = await this.http.post("/api/auth/web3", { signature }).then((response) => response.data);

			this.storage.setItem(`${this.config.storageKeysPrefix}_token`, token);

			return { token };
		}

		throw new Error("WEB3 Provider not found");
	}

	public async getAccounts(): Promise<Account[]> {
		return await this.http.get<Account[]>("/api/auth/accounts").then((res) => res.data);
	}

	public async login(login: string, password: string): Promise<{ token: string }> {
		const { token } = await this.http.post(`/api/auth/login`, { login, password }).then((res) => res.data);

		this.storage.setItem(`${this.config.storageKeysPrefix}_token`, token);

		return token;
	}

	public async isAuth(): Promise<boolean> {
		const token = this.storage.getItem(`${this.config.storageKeysPrefix}_token`) || "";

		return token.split(".").length === 3;
	}

	public async logout(): Promise<void> {
		this.storage.removeItem(`${this.config.storageKeysPrefix}_token`);
	}
}
