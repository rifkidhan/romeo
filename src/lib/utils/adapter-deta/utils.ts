import type { UserSchema, SessionSchema } from 'lucia-auth';

export interface DetaUser {
	key: string;
	hashed_password: string | null;
	provider_id: string;
	username: string;
	user_email: string;
}

export interface DetaSession {
	key: string;
	__expires: number;
	user_id: string;
	idle_expires: number;
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const convertUser = (row: DetaUser | any): UserSchema => {
	const { key: id, hashed_password, provider_id, ...attributes } = row;

	return {
		id,
		hashed_password,
		provider_id,
		...attributes
	};
};

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const convertSession = (row: DetaSession | any): SessionSchema => {
	const { key: id, __expires: expires, ...data } = row;

	return {
		id,
		expires,
		...data
	};
};
