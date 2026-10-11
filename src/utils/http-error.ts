/**
 * Eroare "asteptata" care trebuie trimisa clientului cu un anumit cod HTTP.
 * Exemplu: throw new HttpError(404, 'Alimentul nu exista', 'FOOD_NOT_FOUND')
 */
export class HttpError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly code: string = 'ERROR',
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = 'HttpError';
  }
}
