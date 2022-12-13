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
	content: string;
	meta_title: string;
	meta_description: string;
}
