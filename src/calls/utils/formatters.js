/**
 *
 * @param profile
 * @returns {string}
 */
export function formatUserOrganization(profile) {
  let organization = [];

  if (profile.division && profile.division !== "[]")
    organization.push(profile.division);
  if (profile.cernGroup && profile.cernGroup !== "[]")
    organization.push(`${profile.cernGroup}`);
  if (profile.cernSection && profile.cernSection !== "[]")
    organization.push(`${profile.cernSection}`);

  return organization.join("-");
}
