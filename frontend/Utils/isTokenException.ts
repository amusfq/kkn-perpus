export default function isTokenException (errors: string[]): Boolean {
  const exceptions = [
    "Token is invalid",
    "Token is expired",
    "User unauthorized",
    "Authorization token not found",
  ];
  return errors.some(err => exceptions.includes(err));
}