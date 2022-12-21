import { Deta } from 'deta';
import { DETA_PROJECT_KEY } from '$env/static/private';

export const deta = Deta(DETA_PROJECT_KEY);

export const user = deta.Base('user');

export const blogs = deta.Base('blogs');

export const galleries = deta.Base('galleries');
