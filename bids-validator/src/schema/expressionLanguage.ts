function exists(list: string[], rule: string = 'dataset'): number {
  const prefix: string[] = []

  // Stimuli and subject-relative paths get prefixes
  if (rule == 'stimuli') {
    prefix.push('stimuli')
  } else if (rule == 'subject') {
    // @ts-expect-error
    prefix.push('sub-' + this.entities.subject)
  }

  if (!Array.isArray(list)) {
    list = [list]
  }
  if (rule == 'bids-uri') {
    // XXX To implement
    return list.length
  } else {
    // dataset, subject and stimuli
    return list.filter((x) => {
      const parts = prefix.concat(x.split('/'))
      // @ts-expect-error
      return this.fileTree.contains(parts)
    }).length
  }
}

export const expressionFunctions = {
  index: <T>(list: T[], item: T): number | null => {
    const index = list.indexOf(item)
    return index != -1 ? index : null
  },
  intersects: <T>(a: T[], b: T[]): boolean => {
    return a.some((x) => b.includes(x))
  },
  match: (target: string, regex: string): boolean => {
    let re = RegExp(regex)
    return target.match(re) !== null
  },
  type: <T>(operand: T): string => {
    if (Array.isArray(operand)) {
      return 'array'
    }
    if (typeof operand === 'undefined') {
      return 'null'
    }
    return typeof operand
  },
  min: (list: number[]): number => {
    return Math.min(...list)
  },
  max: (list: number[]): number => {
    return Math.max(...list)
  },
  length: <T>(list: T[]): number | null => {
    if (Array.isArray(list) || typeof list == 'string') {
      return list.length
    }
    return null
  },
  count: <T>(list: T[], val: T): number => {
    return list.filter((x) => x === val).length
  },
  exists: exists,
  substr: (arg: string, start: number, end: number): string => {
    return arg.substr(start, end - start)
  },
  sorted: <T>(list: T[]): T[] => {
    list.sort()
    return list
  },
}
