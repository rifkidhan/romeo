/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const throttle = <P extends any[]>(
	fn: (...args: P) => any, //eslint-disable-line @typescript-eslint/no-explicit-any
	timeout: number
): ((...args: P) => void) => {
	let timer: ReturnType<typeof setTimeout>;
	return (...args) => {
		clearTimeout(timer);

		timer = setTimeout(() => {
			fn(...args);
		}, timeout);
	};
};

export default throttle;
