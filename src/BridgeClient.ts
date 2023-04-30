import type { BridgeClientConfiguration, Application, SupportedServices} from "@/types.d";
import axios, { type AxiosInstance } from "axios";
import { BehaviorSubject, filter, type Observable } from "rxjs";
import { CallerType, HeadersEnum } from "@/enums";

export class BridgeClient {
	private readonly http: AxiosInstance;
	private readonly storage: Storage;
	private readonly instanceServices = new Map();
	private readonly application$: BehaviorSubject<Application | undefined> = 
		new BehaviorSubject<Application | undefined>(undefined);

	constructor(private readonly config: BridgeClientConfiguration = {}) {
		this.http = axios.create();
		this.storage = this.config.storage ?? localStorage;
		this.config.storageKeysPrefix = this.config.storageKeysPrefix ?? "bridge";
		this.http.interceptors.request.use((config) => {
			const token = this.storage.getItem(`${this.config.storageKeysPrefix}_token`);
			config.headers.set("Authorization", `Bearer ${token}`);

			if (config.headers.get(HeadersEnum.X_CALLER_TYPE) === CallerType.APPLICATION) {
				const application = this.application$.getValue();
				if (application) {
					config.auth = {
						username: application.authId,
						password: application.secretKey
					};
				}
			}

			return config;
		});
	}

	public getService(service: SupportedServices): InstanceType<SupportedServices> {
		if (this.instanceServices.has(service)) return this.instanceServices.get(service);

		this.instanceServices.set(service, new service(this.http, this.storage, this.config));

		return this.getService(service);
	}

	public useApplication(application: Application | undefined): this {
		this.application$.next(application);

		return this;
	}

	public getSelectedApplication$(): Observable<Application> {
		return this.application$.pipe(filter((application) => Boolean(application))) as Observable<Application>;
	}
}
