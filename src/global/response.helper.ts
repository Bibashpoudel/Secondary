function sendResponse(
  success: boolean,
  data: any,
  errors: any,
  msg: any,
  token: any,
) {
  const response: any = {};

  if (success !== null) response.success = success;
  if (data !== null) response.data = data;
  if (errors !== null) response.errors = errors;
  if (msg !== null) response.msg = msg;
  if (token !== null) response.token = token;

  return response;
}

export { sendResponse };
