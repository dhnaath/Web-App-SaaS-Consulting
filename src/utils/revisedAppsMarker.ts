/**
 * Helper to identify newly revised apps in the launcher and workspace switcher.
 */
export function isNewlyRevisedApp(to?: string, title?: string): boolean {
  if (!to && !title) return false;
  return false;
}

export default isNewlyRevisedApp;
