export enum TokenType {
	NATIVE = "NATIVE",
	ERC20 = "ERC20",
	BEP20 = "BEP20",
	TRC20 = "TRC20"
}
export enum CallerType {
	APPLICATION = "APPLICATION",
	USER = "USER"
}
export enum HeadersEnum {
	X_CALLER_TYPE = "X-Caller-Type"
}
export enum PaymentWebhookStatus {
	SENDING = "SENDING",
	FAILURE = "FAILURE",
	SUCCESS = "SUCCESS"
}
export enum PaymentStatus {
	AWAITING_PAYMENT = "AWAITING_PAYMENT",
	PAID = "PAID"
}
export enum NetworkType {
	BITCOIN = "BITCOIN",
	ETHEREUM_COMPATIBLE = "ETHEREUM_COMPATIBLE",
	TRON_COMPATIBLE = "TRON_COMPATIBLE"
}
