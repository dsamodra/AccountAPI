exports.success = (message, statusCode, results) => {
    return {
        code: statusCode,
        message,
        error: false,
        results
    };
};

exports.error = (message, statusCode) => {
    // List of common HTTP request code
    const codes = [200, 201, 400, 401, 404, 403, 422, 500];

    // Get matched code
    const findCode = codes.find((code) => code == statusCode);

    if (!findCode) statusCode = 500;
    else statusCode = findCode;
    return {
        code: statusCode,
        message,
        error: true,
    };
};