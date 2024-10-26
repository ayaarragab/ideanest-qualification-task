"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const serverErrorsHandler = (response, error) => {
    console.error(error);
    return response.status(500).json({
        "status": "error",
        "message": "An internal server error occurred.",
        "error": {
            "code": 500,
            "details": "Please try again later."
        }
    });
};
exports.default = serverErrorsHandler;
