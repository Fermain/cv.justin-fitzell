import { collection, defineConfig, fields, setting, singleton } from '@fermain/frame';

// A line of the form "name: value", used for contact details and other facts.
const line = (label: string, name: string, value: string) =>
	fields.object({
		label,
		fields: {
			name: fields.text({ label: 'Name', description: name }),
			value: fields.text({ label: 'Value', description: value })
		}
	});

export default defineConfig({
	media: { path: 'static/images', publicPath: '/images' },

	collections: {
		experience: collection({
			label: 'Experience',
			path: 'src/content/experience',
			title: 'role',
			// Newest first, by date. There is nothing to drag.
			sort: { field: 'start', direction: 'desc' },
			fields: {
				role: fields.text({ label: 'Role' }),
				organisation: fields.text({ label: 'Organisation' }),
				location: fields.text({ label: 'Location', required: false }),
				start: fields.date({ label: 'Started' }),
				end: fields.date({ label: 'Ended', description: 'Leave empty for a role you are still in.', required: false }),
				summary: fields.text({ label: 'Summary', multiline: true, required: false }),
				highlights: fields.list({
					label: 'Highlights',
					description: 'One achievement to a line. They are shown as a list under the summary.',
					itemLabel: 'Highlight',
					item: fields.text({ label: 'Highlight' })
				})
			},
			components: {
				view: () => import('./components/Role.svelte'),
				list: () => import('./components/Experience.svelte')
			}
		}),

		education: collection({
			label: 'Education',
			path: 'src/content/education',
			title: 'qualification',
			sort: { field: 'completed', direction: 'desc' },
			fields: {
				qualification: fields.text({ label: 'Qualification' }),
				institution: fields.text({ label: 'Institution' }),
				completed: fields.number({ label: 'Year completed', integer: true, min: 1950, max: 2100 }),
				notes: fields.text({ label: 'Notes', multiline: true, required: false })
			},
			components: { list: () => import('./components/Education.svelte') }
		}),

		certificates: collection({
			label: 'Certificates',
			path: 'src/content/certificates',
			title: 'title',
			sort: { field: 'issued', direction: 'desc' },
			fields: {
				title: fields.text({ label: 'Title' }),
				issuer: fields.text({ label: 'Issued by', required: false }),
				number: fields.text({ label: 'Certificate number', required: false }),
				issued: fields.date({ label: 'Issued' }),
				expires: fields.date({
					label: 'Expires',
					description:
						'Leave empty if it does not expire. An expired certificate drops off the CV by itself and stays here, so a renewal can be added beside it.',
					required: false
				}),
				image: fields.image({ label: 'Scan', description: 'A photo or scan of the certificate.', required: false })
			},
			components: { list: () => import('./components/Certificates.svelte') }
		}),

		skills: singleton({
			label: 'Skills',
			file: 'src/content/skills.json',
			fields: {
				groups: fields.list({
					label: 'Groups',
					itemLabel: 'Group',
					item: fields.object({
						label: 'Group',
						fields: {
							name: fields.text({ label: 'Name' }),
							items: fields.list({ label: 'Skills', itemLabel: 'Skill', item: fields.text({ label: 'Skill' }) })
						}
					})
				})
			},
			components: { view: () => import('./components/Skills.svelte') }
		}),

		references: singleton({
			label: 'References',
			file: 'src/content/references.json',
			fields: {
				note: fields.text({
					label: 'Note',
					description: 'Shown when nobody is listed, such as "References are available on request."',
					required: false
				}),
				people: fields.list({
					label: 'People',
					itemLabel: 'Person',
					item: fields.object({
						label: 'Person',
						fields: {
							name: fields.text({ label: 'Name' }),
							value: fields.text({ label: 'Value', description: 'Who they are to you, such as "Harbour master, Seaview".' }),
							contact: fields.text({ label: 'Contact', required: false })
						}
					})
				})
			},
			components: { view: () => import('./components/References.svelte') }
		})
	},

	settings: {
		person: setting({
			label: 'About you',
			fields: {
				name: fields.text({ label: 'Name' }),
				headline: fields.text({ label: 'Headline', description: 'What you do, in a few words.' }),
				summary: fields.text({ label: 'Summary', multiline: true }),
				photo: fields.image({ label: 'Photo', required: false }),
				dates: fields.select({
					label: 'Dates',
					description: 'How much of each date the CV shows. Choose years only if the months do not matter.',
					options: ['Month and year', 'Year only']
				}),
				contact: fields.list({
					label: 'Contact',
					itemLabel: 'Line',
					item: line('Line', 'Such as "Email".', 'Such as the address itself.')
				}),
				details: fields.list({
					label: 'Other details',
					description: 'Facts some employers ask for, such as languages or a licence.',
					itemLabel: 'Line',
					item: line('Line', 'Such as "Languages".', 'Such as "English, isiZulu".')
				})
			},
			components: { view: () => import('./components/Header.svelte') }
		})
	}
});
