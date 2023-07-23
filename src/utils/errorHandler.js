export default function tryCatchHandler(controller) {
    return async function( req, res, next ) {
      try {
        await controller(req, res, next)
      }catch(err){
        next( err );
      }
    }
  }
export function globalErrorHandler(err, req, res, next){

      console.log(err.name)
      if(err.name === "ValidationError") {
        return res.status(400).json({
          message: err.details[0].message,
          status: "Failed",
          errorType: "ValidationError"
        })
      }
      //else(if not validation error)
      return res.status(err.status || 404).json({
        message: err.message,
        status: "Failed",
      })
    }