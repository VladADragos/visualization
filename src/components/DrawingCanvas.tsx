import React from 'react';
import Canvas from '../canvas/Canvas';
import Renderer from '../canvas/Renderer';
import { CRect } from '../shapes/Shapes';
import * as utils from '../utils/utils';

function toHexString(arr: Uint8ClampedArray){
    let str ="#";
    for(let i = 0; i < arr.length-1; i++){
        str += arr[i].toString(16);
    }

    return str;
}
const DrawingCanvas=():JSX.Element =>{
    const width: number = 500;
    const height: number = 200;
    const shapeBuffer: IDrawable[] = [];
    const selectedSet: Set<IRect> = new Set();
    let box:DOMRect;
    shapeBuffer.push(new CRect(20,20,40,40,'#5b92eb'));
    shapeBuffer.push(new CRect(80,80,40,40,'#ffaaff'));
    
    
    function getLocalCords(x1:number,y1:number): IVec2{
     return {x: x1-Math.round(box.left),y: y1-Math.round(box.top)};
    }
    function handleOnClick(e:React.MouseEvent<HTMLCanvasElement, MouseEvent>,r:Renderer){
        let {x,y} = getLocalCords(e.clientX,e.clientY);
        console.log(x,y);
        let color = toHexString(r.getColorOnPixel(x,y));
        utils.forEach(shapeBuffer,(element)=>{
            
            let asCRect = element as CRect;
            // console.log(asCRect.color );
            console.log("before comp");
            if (asCRect.color === color){
                console.log("found ",asCRect);
                if(!selectedSet.has(asCRect)){
                    selectedSet.add(asCRect);
                    console.log(selectedSet);
                    console.assert(selectedSet.has(asCRect));
                }else{
                    console.log("deleted ",asCRect);
                    selectedSet.delete(asCRect);
                }
                return;
                
            }
        })
        console.log(color);
    }




return <Canvas width={width} height={height} data={shapeBuffer} selected={selectedSet} onClick={handleOnClick} getCanvas={(canvas)=>box = canvas.getBoundingClientRect()}/>;
}

export default DrawingCanvas;