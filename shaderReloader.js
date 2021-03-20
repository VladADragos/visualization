const fs = require('fs');
const config = {

    shadersPath: './src/opengl/shaders/',
    shadersOutPath: './src/canvas/shaders/'
}
const paths = {
    fragmentShaderSrc: config.shadersPath + 'fragment.glsl',
    fragmentShaderOut: config.shadersOutPath + 'fragShader.ts',
    vertexShaderSrc: config.shadersPath + 'vertex.glsl',
    vertexShaderOut: config.shadersOutPath + 'vertexShader.ts',
}


console.log(`watching files...`);


fs.watchFile(paths.fragmentShaderSrc, (curr, prev) =>
{
    console.log("fragment shader changed, writing update");
    let f = fs.readFileSync(paths.fragmentShaderSrc);
    let pre = 'const fragShader =';
    let content = "`" + f.toString() + "`;";
    let end = "export default fragShader;";

    let a = pre + content + end;

    fs.writeFileSync(paths.fragmentShaderOut, a);

    console.log("update done");
});

fs.watchFile(paths.vertexShaderSrc, (curr, prev) =>
{
    console.log("vertex shader changed, writing update");
    let f = fs.readFileSync(paths.vertexShaderSrc);
    let pre = 'const vertexShader =';
    let content = "`" + f.toString() + "`;";
    let end = "export default vertexShader;";

    let a = pre + content + end;

    fs.writeFileSync(paths.vertexShaderOut, a);

    console.log("update done");
});


// fs.watchFile(config.vertexShaderSrc, (curr, prev) =>
// {
//     console.log("vertex shader changed, writing update");
// })