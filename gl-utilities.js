/**
 * This function initialises GL and the viewport.
 */
function glInit() {
    // Initialise and clear viewport
    gl.clearColor(0.1, 0.1, 0.1, 0.9);
    gl.clearDepth(1.0);
    gl.viewport(0.0, 0.0, canvas.width, canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
}

/**
* This function compiles the supplied vertex and fragment shaders into a program
* 
* @param   vertCode  Vertex shader code, written in GLSL
* @param   fragCode  Fragment shader code, written in GLSL
* 
* @returns    Shader program
*/
function createProgram(vertCode, fragCode) {
    // Compile and upload shader programs
    let vertShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertShader, vertCode);
    gl.compileShader(vertShader);

    let fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragShader, fragCode);
    gl.compileShader(fragShader);

    let shaderprogram = gl.createProgram();
    gl.attachShader(shaderprogram, vertShader);
    gl.attachShader(shaderprogram, fragShader);
    gl.linkProgram(shaderprogram);

    gl.useProgram(shaderprogram);

    return shaderprogram;
}