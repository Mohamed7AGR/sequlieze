export const successResponse=async(res,statusCode,message,data)=>{
    res.status(statusCode).json({
        message,
        data
    });
}

export const errorResponse=async(res,statusCode,message)=>{
    res.status(statusCode).json({
        message
    });
}