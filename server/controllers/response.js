export function apiResponse(response, okay, statusCode, message, object){
    let resJson = {
        ok: okay,
        status: statusCode,
        "message": message
    }

    if(object !== undefined){
        resJson["response"] = object;
    }
    
    response.status(statusCode).json(resJson)
}