import { formatUserOrganization } from "calls/utils/formatters";
import { logMessage } from "common/utils/logs";

export class UserSearchUtils {
  /**
   *
   * @param value
   * @param searchUsersPromise
   * @param formatSearchResults
   * @returns {Promise<*>}
   */
  static searchUsersAndFormatResults = async (
    value,
    searchUsersPromise,
    formatSearchResults
  ) => {
    const result = await searchUsersPromise(value);
    if (result && !result.error) {
      return {
        results: formatSearchResults(result.payload.result),
        searchResults: result.payload.result,
        isLoading: false
      };
    }
    return {
      isLoading: false
    };
  };
}

export class UserSearchResultsFormatter {
  /**
   *
   * @param results
   * @returns {*}
   */
  static formatResults = results => {
    const formattedResults = results.map((result, index) => {
      return {
        id: index,
        title: result.displayName,
        description: `${formatUserOrganization(result)} - ${result.username}`
      };
    });
    logMessage(formattedResults);
    return formattedResults;
  };

  static formatResultsOneLinePerPhone = results => {
    let searchResults = [];
    let index = 1;
    results.map(user => {
      // logMessage(user);
      if (user.phones) {
        const phones = user.phones.filter(
          phone => phone.number && phone.number !== undefined
        );

        const formattedPhones = phones.map((phone, index2) => {
          index += 1;
          return {
            key: `phone-${index}`,
            description: `${user.displayName} (${formatUserOrganization(
              user
            )})`,
            title: phone.number,
            icon: phone.phoneType === "mobile" ? "mobile" : "phone"
          };
        });
        return [...searchResults, ...formattedPhones];
      }
      return searchResults;
    });
    // logMessage(searchResults);

    return searchResults;
  };
}
