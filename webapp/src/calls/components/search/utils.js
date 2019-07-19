import { formatUserOrganization } from 'calls/utils/formatters';
import { logMessage } from 'common/utils/logs';

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
        results: formatSearchResults(result.payload),
        searchResults: result.payload,
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
    const formattedResults = results.map((result, index) => ({
      id: index,
      title: result.displayName,
      description: `${formatUserOrganization(result)} - ${result.username}`
    }));
    logMessage(formattedResults);
    return formattedResults;
  };

  static formatResultsOneLinePerPhone = results => {
    const searchResults = [];
    let index = 1;
    results.map(user => {
      // logMessage(user);
      if (user.phones) {
        const phones = user.phones.filter(
          phone => phone.number && phone.number !== undefined
        );

        phones.map((phone, index2) => {
          index += 1;
          const result = {
            key: `phone-${index}`,
            description: `${user.displayName} (${formatUserOrganization(
              user
            )})`,
            title: phone.number,
            icon: phone.phoneType === 'mobile' ? 'mobile' : 'phone'
          };
          searchResults.push(result);
          return result;
        });

        return searchResults;
      }
      return searchResults;
    });

    return searchResults;
  };
}
