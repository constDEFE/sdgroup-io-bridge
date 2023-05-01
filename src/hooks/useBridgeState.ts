import type { CallbackParams } from "@/types";
import type { BridgeClient } from "@/BridgeClient";
import type { DependencyList, Dispatch, SetStateAction } from "react";
import { useDestroy } from "./useDestroy";
import { useEffect, useState } from "react";
import { merge, switchMap } from "rxjs";

export const useBridgeState = <S>(
	client: BridgeClient,
	method: (params: CallbackParams) => Promise<S>,
	initialState?: S | (() => S),
	deps: DependencyList = []
): [S, Dispatch<SetStateAction<S>>] => {
	const [items, setItems] = useState<S>(initialState as S | (() => S));
	const { untilDestroy } = useDestroy();

	useEffect(() => {
		merge(client.getSelectedApplication$())
			.pipe(
				untilDestroy(),
				switchMap(async (app) => await method({ app }))
			)
			.subscribe(setItems);
	}, deps);

	return [items, setItems];
};
