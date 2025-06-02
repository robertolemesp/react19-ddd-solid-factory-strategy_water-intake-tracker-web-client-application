export const mapArrayItemPropertiesValuesByKey = <T extends object, K extends keyof T>(key: K, array: T[]): T[K][] => 
  (!array || !Array.isArray(array) ? [] : array)
    .reduce<T[K][]>((acc, item) => {
      if (key in item) 
        acc.push(item[key])
      
      return acc
    }, [])

