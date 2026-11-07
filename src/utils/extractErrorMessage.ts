export async function extractErrorMessage(
  response: Response,
  defaultMessage: string,
): Promise<string> {
  try {
    const errorData = await response.json();

    if (errorData && errorData.detail) {
      return errorData.detail;
    }
  } catch (e) {
    // não fazer nada
  }

  return defaultMessage;
}
