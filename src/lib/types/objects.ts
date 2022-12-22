export interface ListObject {
	name: string;
	prefix?: string;
	size: number;
	etag: string;
	lastModified: Date;
}

export interface Blog {
	key: string;
	title: string;
	description: string;
	slug: string;
	thumbnail: string;
	published: boolean;
	authorId: string;
	content: string;
	meta_title: string;
	meta_description: string;
}

export interface Galleries {
	key: string;
	bucket: string;
	name: string;
	content_type: string;
	uploaded_at: string;
}

export interface Profiles {
	key: string;
	userId: string;
	email: string;
	role: string;
	username: string;
	first_name?: string;
	last_name?: string;
	photo_url?: string;
}
