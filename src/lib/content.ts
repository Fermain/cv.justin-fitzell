import { asset } from '$app/paths';
import { entries } from '@fermain/frame';
import personData from '../content/settings/person.json';
import referencesData from '../content/references.json';
import skillsData from '../content/skills.json';

export interface Line {
	name: string;
	value: string;
}

export interface Person {
	name: string;
	headline: string;
	summary: string;
	photo?: string;
	/** How much of a date the page shows. */
	dates?: string;
	contact: Line[];
	details: Line[];
}

export interface Role {
	slug: string;
	role: string;
	organisation: string;
	location?: string;
	start: string;
	end: string | null;
	summary?: string;
	highlights: string[];
}

export interface Study {
	slug: string;
	qualification: string;
	institution: string;
	completed: number;
	notes?: string;
}

export interface Certificate {
	slug: string;
	title: string;
	issuer?: string;
	number?: string;
	issued: string;
	expires: string | null;
	image?: string;
}

export interface Skills {
	groups: { name: string; items: string[] }[];
}

export interface References {
	note?: string;
	people: (Line & { contact?: string })[];
}

export const person: Person = personData;
export const skills: Skills = skillsData;
export const references: References = referencesData;

const load = <T>(files: Record<string, unknown>) => entries(files) as unknown as T[];

export const roles = load<Role>(import.meta.glob('/src/content/experience/*.json', { eager: true, import: 'default' }));
export const studies = load<Study>(import.meta.glob('/src/content/education/*.json', { eager: true, import: 'default' }));
export const certificates = load<Certificate>(
	import.meta.glob('/src/content/certificates/*.json', { eager: true, import: 'default' })
);

/** Newest first. Dates are written year first, so they sort as text. */
export const newestFirst = <T>(list: T[], key: (item: T) => string | number) =>
	[...list].sort((a, b) => (key(a) < key(b) ? 1 : key(a) > key(b) ? -1 : 0));

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Some CVs give only years, where the months are forgotten or beside the point. */
export const YEAR_ONLY = 'Year only';

/**
 * "Mar 2021" from "2021-03-01", or "2021" where the CV shows years only. Read from the
 * text, so no time zone can move the month.
 */
export const month = (date: string) =>
	person.dates === YEAR_ONLY ? date.slice(0, 4) : `${MONTHS[Number(date.slice(5, 7)) - 1]} ${date.slice(0, 4)}`;

/** "Mar 2021 – present", or just "2010" for something that began and ended in the same one. */
export function period(start: string, end: string | null) {
	const from = start ? month(start) : '';
	const to = end ? month(end) : 'present';
	return from === to ? from : `${from} – ${to}`;
}

/** The address of an uploaded file, wherever the site is served from. */
export const media = (path: string) => asset(path.replace(/^\//, '') as Parameters<typeof asset>[0]);

/** Whether a certificate has run out, as of the day the site was built or the editor is open. */
export const expired = (certificate: Certificate, today = new Date().toISOString().slice(0, 10)) =>
	Boolean(certificate.expires && certificate.expires < today);
