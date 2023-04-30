export class FeeService {
	public async getFee(): Promise<{ rate: number }> {
		return { rate: 1.1 };
	}
}
