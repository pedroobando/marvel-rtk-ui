import slugify from 'slugify';

export const urlSlugify = (nameText: any): string => slugify(nameText, '_');
