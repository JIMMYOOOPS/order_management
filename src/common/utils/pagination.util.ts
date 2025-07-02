import { DEFAULT_PAGINATION } from '../constants/constants';

interface IPaginationOptions {
  skip: number;
  take: number;
}

interface PaginatedList<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

/**
 * Generates pagination options based on the provided page and limit.
 * If page is less than 1, it defaults to 1. If limit is less than or equal to 0, it defaults to 10.
 *
 * @param {number} page - The current page number (default is 1).
 * @param {number} limit - The number of items per page (default is 10).
 * @returns {IPaginationOptions} - An object containing skip and take properties for pagination.
 */
function getPagination(
  page = DEFAULT_PAGINATION.page,
  limit = DEFAULT_PAGINATION.limit,
): IPaginationOptions {
  const take = limit > 0 ? limit : 10;
  const skip = page > 1 ? (page - 1) * take : 0;
  return { skip, take };
}

export { getPagination, IPaginationOptions, PaginatedList };
