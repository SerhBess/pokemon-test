export function typedObjectValues<T>(obj: Record<string, T>): T[] {
  return Object.values(obj);
}
