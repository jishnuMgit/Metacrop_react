import Fuse, { IFuseOptions } from 'fuse.js'

export const fuzzySearch = <T>(list: T[], query: string): T[] => {
  const fuseOptions: IFuseOptions<T> = {
    shouldSort: true,
    threshold: 0.4,
    location: 0,
    distance: 100,
    minMatchCharLength: 1,
    includeScore: true,
    keys: ['name'],
  }
  const searchResult = new Fuse(list, fuseOptions)
  return searchResult.search(query).map((val) => val.item)
}
