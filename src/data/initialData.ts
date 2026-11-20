import { DatabaseSchema } from '@/lib/types';
import siteContent from './site-content.json';

/**
 * All website content lives in `site-content.json`.
 *
 * The admin panel edits that file directly in the GitHub repository (using
 * the access token Ajay Sir signs in with). Every change triggers the
 * GitHub Pages deploy, so the public site is rebuilt with the new content
 * in about 1–2 minutes.
 *
 * Contact enquiries are not stored here: they are emailed to the address
 * in Settings → Contact email.
 */
export const initialDatabase: DatabaseSchema = {
  ...(siteContent as unknown as Omit<DatabaseSchema, 'contactMessages'>),
  contactMessages: [],
};
