
function sendSuccessResponse(res, data, message = 'Success') {
  res.status(200).json({
    data: data,
    message: message
  })
}

function sendErrorResponse(res, errors, message = 'Something Went Wrong', status = 406) {
  res.status(status).json({
    errors: errors,
    message: message
  })
}

const handle = (promise) => {
  return promise
    .then(data => ([data, undefined]))
    .catch(error => Promise.resolve([undefined, error]));
}

export { sendSuccessResponse, sendErrorResponse, handle }