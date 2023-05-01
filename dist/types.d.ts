import type { Observable } from "rxjs";
import type { AxiosInstance } from "axios";
import type { DependencyList, Dispatch, SetStateAction } from "react";
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
export declare class AmountTransform {
	/**
	 * Converts a monetary value from cents to a decimal string representation.
	 * @param amountScaled - The monetary value in cents as a number, bigint, or string.
	 * @param decimals - The number of decimal places to include in the output. Defaults to 8.
	 * @param scale - The scale of the output value. Defaults to `decimals`.
	 * @returns The decimal string representation of the monetary value.
	 */
	static fromCents(amountScaled: number | bigint | string, decimals?: number, scale?: number): string;
	/**
	 * Convert an amount in a given currency to cents, as a string of fixed-point
	 * decimal notation with the specified number of decimal places (default 8).
	 *
	 * @param amount - The amount to convert, as a number, bigint, or string.
	 * @param decimals - The number of decimal places to use (default 8).
	 * @returns A string representation of the result, with the specified number of
	 * decimal places and no decimal point.
	 */
	static toCents(amount: number | bigint | string, decimals?: number): string;
}
export declare type NetworkOptions =
	| BitcoinNetworkInterface
	| TronCompatibleNetworkInterface
	| EthereumCompatibleNetworkInterface;
export declare type Network = CommonNetworkOptions & { options: NetworkOptions } & { kind: NetworkType };
export declare interface CommonNetworkOptions {
	readonly name: string;
	readonly code: string;
	readonly url: string;
}
export declare interface BitcoinNetworkInterface extends CommonNetworkOptions {
	readonly kind: NetworkType.BITCOIN;
	readonly username: string;
	readonly password: string;
}
export declare interface EthereumCompatibleNetworkInterface extends CommonNetworkOptions {
	readonly kind: NetworkType.ETHEREUM_COMPATIBLE;
}
export declare interface TronCompatibleNetworkInterface extends CommonNetworkOptions {
	readonly kind: NetworkType.TRON_COMPATIBLE;
	readonly apiKey: string;
}
export declare interface NetworkRequest {
	code: string;
	name: string;
	kind: string;
	url: string;
	apiKey: string;
	username: string;
	password: string;
}
export declare interface GroupAmount {
	networkCode: string;
	tokenSymbol: string;
	amountScaled: string;
	isFiat: false;
}
export declare interface CreatePaymentOptions {
	orderId: string;
	applicationId: string;
	webhook: string;
	groupAmount: GroupAmount[];
	recipientWallets: {
		networkCode: string;
		address: string;
	}[];
}
export declare interface ManualPaymentOptions {
	network: string;
	symbol: string;
	txId: string;
}
export declare interface PaymentInterface {
	id: string;
	orderId: string;
	application: {
		id: string;
		name: string;
	};
	webhook: string;
	groupAmount: GroupAmount[];
	status: PaymentStatus;
	wallets: Array<{
		networkCode: string;
		address: string;
	}>;
	paidAmount: GroupAmount;
	paidNetworkCode: string;
	paidTokenSymbol: string;
	paymentDate: string;
	txId: string;
	webhookStatus: null | PaymentWebhookStatus;
	createdAt: string;
}
export declare interface Token {
	symbol: Lowercase<string>;
	decimals: number;
	network: Network;
	type: TokenType;
	contractAddress?: string;
	id: string;
}
export declare interface Offer {
	available: boolean;
	token: Token;
	liquidityWalletAddress: string;
	volumeScaled: string;
	direction: "BUY" | "SELL";
	minScaled: string;
	maxScaled: string;
	id: string;
}
export declare interface CreateTokenOptions {
	symbol: string;
	decimals: number;
	networkCode: string;
	type: TokenType;
	contractAddress?: string;
}
export declare interface BridgeClientConfiguration {
	storageKeysPrefix?: string;
	storage?: Storage;
}
export declare interface Wallet {
	address: string;
	network: string;
	owners: string[];
	type: "MAIN";
	createdAt: string;
}
export declare interface WalletWithBalances {
	address: string;
	balances: Record<string, { amount: string; decimals: number }>;
	network: string;
	owners: string[];
}
export declare interface ConverterOptions {
	from: string;
	fromDecimals: string;
	to: string;
	toDecimals: string;
	amountScaled: string;
}
export declare interface Balance {
	amount: string;
	decimals: number;
}
export declare interface Account {
	address: string;
	id: string;
	createdAt: string;
}
export declare interface Application {
	readonly name: string;
	readonly authId: string;
	readonly secretKey: string;
	readonly id: string;
}
export declare interface TransferOptions {
	network: string;
	symbol: string;
	from: string;
	to: string;
	amount: string;
}
export declare class FeeSerice {
	/**
	 * Asynchronously gets the fee rate.
	 * @async
	 * @returns A Promise that resolves to an object with the rate property, which is a number representing the fee rate.
	 */
	public getFee(): Promise<{ rate: number }>;
}
export declare class NetworkService {
	private readonly http;
	constructor(http: AxiosInstance);
	/**
	 * Finds and returns a network object from the list of networks based on the given code.
	 * @async
	 * @param code - A string representing the code of the network to be found.
	 * @returns A Promise that resolves to a Network object if the network is found.
	 * @throws An error with message "Network {code} not found" if the network is not found.
	 */
	getNetworkByCode(code: string): Promise<Network>;
	/**
	 * Fetches the list of networks from the server.
	 * @async
	 * @returns A Promise that resolves to an array of Network objects representing the available networks.
	 */
	getNetworks(): Promise<Network[]>;
	/**
	 * Creates a new network using the given options.
	 * @async
	 * @param options - The options used to create the network.
	 * @returns A Promise resolving to the newly created Network object.
	 */
	create(options: NetworkOptions): Promise<Network>;
	/**
	 * Deletes a network with the specified code by sending a DELETE request to the
	 * "/api/network/{code}" endpoint.
	 * @async
	 * @param code - The code of the network to delete.
	 * @returns A Promise that resolves when the network is deleted.
	 * @throws If the HTTP request fails or returns an error status code.
	 */
	delete(code: string): Promise<void>;
}
export declare class TokenService {
	private readonly http;
	readonly $tokenStream: Observable<Token[]>;
	constructor(http: AxiosInstance);
	/**
	 * Retrieves a token by its symbol and optional network code.
	 * @async
	 * @param symbol - The symbol of the token to retrieve.
	 * @param networkCode - Optional network code of the token.
	 * @returns A Promise that resolves to the Token object.
	 * @throws An error if the token is not found.
	 */
	getTokensBySymbol(symbol: string, networkCode?: string): Promise<Token>;
	/**
	 * Returns a Promise that resolves with an array of Token objects fetched from
	 * the '/api/tokens' endpoint using the http client.
	 * @async
	 * @returns A Promise that resolves with an array of Token objects.
	 */
	getTokens(): Promise<Token[]>;
	/**
	 * Creates a new token by making a POST request to the server.
	 * @async
	 * @param options - The options for creating the token.
	 * @returns A promise that resolves to the created token.
	 */
	create(options: CreateTokenOptions): Promise<Token>;
	/**
	 * Deletes a token with the given symbol.
	 * @async
	 * @param symbol - The symbol of the token to delete.
	 * @returns A promise that resolves when the token is deleted.
	 */
	delete(symbol: string): Promise<void>;
}
export declare abstract class Service {
	protected readonly http: AxiosInstance;
	protected readonly storage: Storage;
	protected readonly config: BridgeClientConfiguration;
	constructor(http: AxiosInstance, storage: Storage, config: BridgeClientConfiguration);
}
export declare class AuthService extends Service {
	private readonly authMessage;
	/**
	 * A function that logs in a user via Metamask and returns a Promise that resolves with a token
	 * string upon successful authentication. If Metamask is not available, an error is thrown.
	 * @async
	 * @returns A Promise that resolves with a token string
	 * @throws An error if Metamask is not available
	 * @example
	 * try {
	 *		const { token } = await loginViaMetamask();
	 *		console.log("Logged in successfully with token: ", token);
	 * } catch (error) {
	 *		console.error("Error while logging in via Metamask: ", error);
	 * }
	 */
	loginViaMetamask(): Promise<{ token: string }>;
	/**
	 * Get accounts asynchronously from the server.
	 * @async
	 * @returns A Promise that resolves to an array of Account objects.
	 */
	getAccounts(): Promise<Account[]>;
	/**
	 * Logs in a user with the given credentials and returns a Promise that resolves
	 * to an object with a single property, `token`, which is a string containing the
	 * user's authentication token.
	 * @param login - The user's login name or email address.
	 * @param password - The user's login password.
	 * @returns A Promise that resolves to an object with a single property, `token`,
	 * which is a string containing the user's authentication token.
	 */
	login(login: string, password: string): Promise<{ token: string }>;
	/**
	 * Check if the user is authenticated by verifying the presence of a JWT token in
	 * the storage.
	 * @async
	 * @returns A Promise that resolves to a boolean indicating whether the user is authenticated.
	 */
	isAuth(): Promise<boolean>;
	/**
	 * Remove the authentication token from storage to log out the user.
	 * @async
	 * @returns A Promise that resolves once the token is removed.
	 */
	logout(): Promise<void>;
}
export declare class ApplicationService extends Service {
	/**
	 * Creates a new application with the given name.
	 * @async
	 * @param name - The name of the application to create.
	 * @returns A Promise that resolves to the newly created Application object.
	 */
	create(name: string): Promise<Application>;
	/**
	 * Retrieves a list of applications from the API.
	 * @async
	 * @returns A Promise that resolves to an array of Application objects.
	 */
	getApplications(): Promise<Application[]>;
	/**
	 * Retrieves the list of applications associated with the current user.
	 * @async
	 * @returns A promise that resolves to an array of Application objects.
	 */
	getMyApplications(): Promise<Application[]>;
	/**
	 * Export the private key deciphered with the given password.
	 * @todo To be created
	 * @deprecated
	 * @async
	 * @param password - The password used to decipher the private key.
	 * @returns A promise that resolves to a private key as a string.
	 */
	exportPrivateKey(password: string): Promise<string>;
	/**
	 * Reset the private key using the provided password.
	 * @todo To be created
	 * @deprecated
	 * @async
	 * @param password - The password to use for resetting the key.
	 * @returns A promise that resolves when the key has been reset.
	 */
	resetPrivateKey(password: string): Promise<void>;
}
export declare class PaymentsService extends Service {
	/**
	 * Retrieves PaymentInterface objects from the server's `/api/payments` endpoint.
	 * @async
	 * @returns A promise that resolves with an array of PaymentInterface objects.
	 */
	getPayments(): Promise<PaymentInterface[]>;
	/**
	 * Returns a Promise that resolves to a PaymentInterface object with the given payment ID.
	 * @async
	 * @param paymentId - The ID of the payment to retrieve.
	 * @returns A Promise that resolves to a PaymentInterface object with the given payment ID.
	 */
	getPaymentById(paymentId: string): Promise<PaymentInterface>;
	/**
	 * Creates a payment using the provided options.
	 * @async
	 * @param options - The payment options.
	 * @returns A promise that resolves with the payment data.
	 */
	createPayment(options: CreatePaymentOptions): Promise<any>;
	/**
	 * Send a manual payment for a given payment ID.
	 * @async
	 * @param paymentId - The ID of the payment to be paid.
	 * @param  options - The payment options.
	 * @returns A promise that resolves to the payment data.
	 * @throws {Error} If the payment cannot be completed.
	 */
	manualPay(paymentId: string, options: ManualPaymentOptions): Promise<PaymentInterface>;
}
export declare class WalletService extends Service {
	/**
	 * Retrieves an array of Wallet objects from the server, optionally filtered by owners.
	 * @async
	 * @param filters - An object that may contain an array of owner IDs to filter the wallets by.
	 * @returns A Promise that resolves to the retrieved Wallet objects.
	 */
	getWallets(filters: { owners?: string[] }): Promise<Wallet[]>;
}
export declare class BridgeService {
	/**
	 * Get the balance of a wallet address on a specific network for a given symbol.
	 * @async
	 * @param network - The name of the network to fetch the balance from.
	 * @param symbol - The symbol of the asset to fetch the balance of.
	 * @param address - The wallet address to fetch the balance of.
	 * @returns A Promise that resolves to the Balance object with the balance information.
	 */
	public getBalance(network: string, symbol: string, address: string): Promise<Balance>;
	/**
	 * Transfer tokens from one address to another on the specified network and symbol.
	 * @async
	 * @param options - Object containing transfer options.
	 * @returns Promise containing transaction ID.
	 */
	public transfer(options: TransferOptions): Promise<{ transactionId: string }>;
}
export declare class WalletBalanceService extends Service {
	/**
	 * Retrieves an array of wallets with their balances form the server, optionally filtered by owners.
	 * @async
	 * @param filters - An object that may contain an array of owner IDs to filter the wallets by.
	 * @returns A Promise that resolves to the retrieved Wallet objects.
	 */
	getWalletsWithBalances(filters: { owners?: string[] }): Promise<WalletWithBalances[]>;
}
export declare class OfferService extends Service {
	/**
	 * Retrieves a list of offers from the server.
	 * @async
	 * @returns A Promise that resolves with an array of Offer objects.
	 */
	getOffers(): Promise<Offer[]>;
}
export declare class ConverterService extends Service {
	/**
	 * Converts an amount from one currency to another using an api endpoint.
	 * @async
	 * @param options - The conversion options.
	 * @returns A Promise that resolves to an object with the converted amount as a string.
	 */
	convert(options: ConverterOptions): Promise<{ amount: string }>;
}
export declare type SupportedServices =
	| typeof AuthService
	| typeof ApplicationService
	| typeof ConverterService
	| typeof WalletService
	| typeof NetworkService
	| typeof TokenService
	| typeof OfferService
	| typeof PaymentsService
	| typeof WalletBalanceService;
declare class BridgeClient {
	private readonly config;
	private readonly http;
	private readonly storage;
	private readonly instanceServices;
	private readonly application$;
	constructor(config?: BridgeClientConfiguration);
	/**
	 * Returns an instance of the given service. If the service has already been
	 * instantiated, returns the existing instance.
	 * @param service - The service to instantiate.
	 * @returns An instance of the given service.
	 */
	getService(service: SupportedServices): InstanceType<SupportedServices>;
	/**
	 * Updates the internal state of this instance with the given application and returns itself.
	 * @param application - The application to use, or undefined to clear the current application.
	 * @returns This instance, after updating its internal state.
	 */
	useApplication(application: Application | undefined): this;
	/**
	 * Returns an observable that emits the selected application object from the application$ observable.
	 * The returned observable filters out falsy values emitted by the application$ observable.
	 * @returns An observable that emits the selected application object.
	 */
	getSelectedApplication$(): Observable<Application>;
}
/**
 * Returns an object containing a function that can be used to create an RxJS
 * operator that will emit values from a source observable until a 'destroy' signal
 * is received. The 'destroy' signal is emitted when the component unmounts.
 * @returns An object with a 'untilDestroy' function.
 */
export declare const useDestroy: () => {
	/**
	 * Returns an Observable that will automatically unsubscribe when the 'destroy'
	 * Subject emits a value.
	 * @template T - The type of elements emitted by the source Observable.
	 * @param source - The source Observable to subscribe to.
	 * @returns An Observable that mirrors the source Observable until the 'destroy'
	 * Subject emits a value, at which point the subscription is automatically
	 * unsubscribed.
	 */
	untilDestroy: () => <T>(source: Observable<T>) => Observable<T>;
};
export declare interface CallbackParams {
	app: Application;
}
/**
 * Hook that connects to the BridgeClient and executes the given method with the selected application.
 * @template S - The type of the state.
 * @param client - The BridgeClient instance to connect to.
 * @param method - The method to execute with the selected application.
 * @param initialState - The initial state to use, defaults to undefined.
 * @param deps - The list of dependencies to watch for changes, defaults to an empty array.
 * @return The state and the function to update it.
 */
export declare const useBridgeState: <S>(
	client: BridgeClient,
	method: (params: CallbackParams) => Promise<S>,
	initialState?: S | (() => S),
	deps?: DependencyList
) => [S, Dispatch<SetStateAction<S>>];

export default BridgeClient;
