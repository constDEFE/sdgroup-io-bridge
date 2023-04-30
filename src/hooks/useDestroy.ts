import { type Observable, Subject, takeUntil } from "rxjs";
import { useEffect } from "react";

export const useDestroy = (): { untilDestroy: () => <T>(source: Observable<T>) => Observable<T> } => {
	const destroy = new Subject();

	useEffect(() => {
		return () => destroy.next(true);
	}, []);

	return {
		untilDestroy: () => <T>(source: Observable<T>): Observable<T> => source.pipe(takeUntil(destroy))
	};
};
