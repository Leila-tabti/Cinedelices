export function controllerWrapper(controller) {
    return async function async (req,res, next){
        const start = performance.now();// Record the start time of the operation
        try {
            await controller (req,res,next)
        } catch (error) {
            return next(error);
        }
        const end = performance.now();
        console.log(controller, `execution time: ${end - start} ms`);
    }
    
}