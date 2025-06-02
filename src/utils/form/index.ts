export const formFieldHasError = <T> (fieldName: keyof T, erroredFields: (keyof T)[] = []) =>
  erroredFields.includes(fieldName)