
class WebGLContextProvider
{

    private static glContext: WebGL2RenderingContext;

    static getInstance()
    {
        if (!WebGLContextProvider.glContext) throw new Error("valid webgl context is not set");
        return WebGLContextProvider.glContext;
    }
    static setInstance(ctx: WebGL2RenderingContext)
    {
        return WebGLContextProvider.glContext = ctx;
    }
}


export default WebGLContextProvider;