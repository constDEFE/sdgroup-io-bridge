import type { PaymentInterface, CreatePaymentOptions, ManualPaymentOptions } from "@/types.d";
import { HeadersEnum, CallerType } from "@/enums";
import { Service } from "./service";

export class PaymentsService extends Service {
	public async getPayments(): Promise<PaymentInterface[]> {
		return await this.http
			.get<any>(`/api/payments`, {
				headers: {
					[HeadersEnum.X_CALLER_TYPE]: CallerType.APPLICATION
				}
			})
			.then((res) => res.data);
	}

	public async getPaymentById(paymentId: string): Promise<PaymentInterface> {
		return await this.http.get(`/api/payment/${paymentId}`).then((res) => res.data);
	}

	public async createPayment(options: CreatePaymentOptions): Promise<any> {
		return await this.http
			.post("/api/payment", options, {
				headers: {
					[HeadersEnum.X_CALLER_TYPE]: CallerType.APPLICATION
				}
			})
			.then((res) => res.data);
	}

	public async manualPay(paymentId: string, options: ManualPaymentOptions): Promise<PaymentInterface> {
		return await this.http.post(`/api/payment/${paymentId}/pay`, options).then((res) => res.data);
	}
}
