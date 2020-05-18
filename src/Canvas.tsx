import React, { useRef, useEffect } from 'react'

interface canvasProps {
    width: number,
    height: number,
    animate(ctx: Undefinable<Nullable<CanvasRenderingContext2D>>): void,
    stop: boolean,
}


function Canvas({ width, height, animate, stop }: canvasProps): JSX.Element {

    const canvasRef: React.MutableRefObject<Nullable<HTMLCanvasElement>> = useRef(null);


    function getCtx(f: (ctx: Undefinable<Nullable<CanvasRenderingContext2D>>) => void) {
        const ctx: Undefinable<Nullable<CanvasRenderingContext2D>> = canvasRef.current?.getContext('2d');
        ctx?.clearRect(0, 0, width, height);
        f(ctx);
    }


    // eslint-disable-next-line react-hooks/exhaustive-deps
    function draw(step: number) {
        getCtx(animate)

        requestAnimationFrame(draw)
    }

    useEffect(() => {
        draw(0);
        console.log("canvas rendered");
    })

    return (
        <canvas width={width} height={height} ref={canvasRef} style={{ border: "3px red solid" }} />

    )
}



export default Canvas;