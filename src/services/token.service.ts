import type { CreateTokenOptions, Token } from "@/types.d";
import type { AxiosInstance } from "axios";
import { defer, from, share, throttleTime } from "rxjs";

export class TokenService {
	public readonly $tokenStream = defer(() => from(this.getTokens())).pipe(share(), throttleTime(10_000));

	constructor(private readonly http: AxiosInstance) {}

	public async getTokensBySymbol(symbol: string, networkCode?: string): Promise<Token> {
		const tokens = await this.getTokens();
		const token = tokens.find((item) => {
			if (networkCode) {
				return item.symbol === symbol && item.network.code === networkCode;
			}

			return item.symbol === symbol;
		});

		if (!token) throw new Error(`Token ${symbol}[${networkCode ?? ""}] not found`);

		return token;
	}

	public async getTokens(): Promise<Token[]> {
		return await this.http.get(`/api/tokens`).then((res) => res.data);
	}

	public async create(options: CreateTokenOptions): Promise<Token> {
		return await this.http.post(`/api/token`, options).then((res) => res.data);
	}

	public async delete(symbol: string): Promise<void> {
		await this.http.delete(`/api/token/${symbol}`);
	}
}
