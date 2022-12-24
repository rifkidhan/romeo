/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const passwordValidation = (password: string | any) => {
	let progress = 0;

	const lowerCase = /^(?=.*[a-z])/.test(password);
	const upperCase = /^(?=.*[A-Z])/.test(password);
	const numberCase = /^(?=.*[0-9])/.test(password);
	const specialChar = /^(?=.*[!@#$%^&*_-])/.test(password);
	const moreThen = /^(?=.{8,})/.test(password);

	if (lowerCase) {
		progress += 1;
	}

	if (upperCase) {
		progress += 1;
	}
	if (numberCase) {
		progress += 1;
	}
	if (specialChar) {
		progress += 1;
	}
	if (moreThen) {
		progress += 1;
	}

	const swithColor = (value: number) => {
		switch (value) {
			case 1:
				return '--red-1';
			case 2:
				return '--yellow-1';
			case 3:
				return '--green-2';
			case 4:
				return '--green-1';
			case 5:
				return '--blue-1';
			default:
				return '--red-1';
		}
	};

	const progressColor = swithColor(progress);

	return {
		progress,
		progressColor
	};
};

export default passwordValidation;
