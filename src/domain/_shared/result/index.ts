export class Result<T, E = unknown> {
  private constructor(
    public readonly isSuccess: boolean,
    public readonly value?: T,
    public readonly error?: E
  ) {
    if (isSuccess && error) 
      throw new Error('InvalidOperation: A result cannot be successful and contain an error')
    
    if (isSuccess && value === undefined) 
      throw new Error('InvalidOperation: A successful result needs to contain a value')

    if (!isSuccess && !error) 
      throw new Error('InvalidOperation: A failing result needs to contain an error')

    Object.freeze(this)
  }

  static success<U>(value: U): Result<U, never> {
    return new Result<U, never>(true, value)
  }

  static failure<U = never, F = unknown>(error: F): Result<U, F> {
    return new Result<U, F>(false, undefined, error)
  }

  get isFailure(): boolean {
   return !this.isSuccess
  }

  getValueOrThrow(message?: string): T {
    if (this.isFailure) 
      throw new Error(message || 'Cannot retrieve the value from a failed result.')
    
    return this.value as T
  }

  getErrorOrThrow(message?: string): E {
    if (!this.isFailure) 
      throw new Error(message || 'Cannot retrieve the error from a successful result.')

    return this.error as E
  }
}
