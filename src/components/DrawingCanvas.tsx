import React from 'react';
import Canvas from '../canvas/Canvas';
import Renderer from '../canvas/Renderer';
import { CRect } from '../shapes/Shapes';
import * as utils from '../utils/utils';


const DrawingCanvas = (): JSX.Element =>
{
    const width: number = 1000;
    const height: number = 400;
    const shapeBuffer: CRect[] = [];
    const selectedSet: Set<CRect> = new Set();
    const hexGenerator: () => string = utils.getHex(6);
    let box: DOMRect;
    // shapeBuffer.push(new CRect(20,20,40,40,'#5b92eb'));
    for (let i = 0; i < 19; i++) {
        let c = hexGenerator();
        // console.log(c)
        shapeBuffer.push(new CRect((52 * i), 0, 50, 50, c));
    }
    // shapeBuffer.push(new CRect(100,100,100,100,"#000130"))
    // shapeBuffer.push(new CRect(200,50,40,40,hexGenerator()));
    // shapeBuffer.push(new CRect(300,100,40,40,hexGenerator()));


    function getLocalCords(x1: number, y1: number): IVec2
    {
        return { x: x1 - Math.round(box.left), y: y1 - Math.round(box.top) };
    }
    function handleOnClick(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>, r: Renderer)
    {
        let { x, y } = getLocalCords(e.clientX, e.clientY);
        // console.log(x,y);
        utils.ByteArraytoHexString(r.getColorOnPixel(x, y));

        // utils.forEach(shapeBuffer,(element)=>{

        //     let asCRect = element as CRect;
        //     // console.log(asCRect.color );
        //     if (asCRect.color === color){
        //         console.log("found ",asCRect);
        //         if(!selectedSet.has(asCRect)){
        //             selectedSet.add(asCRect);
        //             console.log(selectedSet);
        //             console.assert(selectedSet.has(asCRect));
        //         }else{
        //             console.log("deleted ",asCRect);
        //             selectedSet.delete(asCRect);
        //         }
        //         return;

        //     }
        // })
        // console.log(color);
    }




    return <Canvas width={width} height={height} data={shapeBuffer} selected={selectedSet} onClick={handleOnClick} getCanvas={(canvas) => box = canvas.getBoundingClientRect()} />;
}

export default DrawingCanvas;