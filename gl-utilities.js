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
 * @param {string} vertCode Vertex shader code, written in GLSL
 * @param {string} fragCode Fragment shader code, written in GLSL
 * 
 * @returns {WebGLProgram} Shader program
 */
function createProgram(vertCode, fragCode) {
    // Compile and upload shader programs
    let vertShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertShader, vertCode);
    gl.compileShader(vertShader);
    if (!gl.getShaderParameter(vertShader, gl.COMPILE_STATUS)) {
        throw new Error('Vertex shader compilation failed: ' + gl.getShaderInfoLog(vertShader));
    }

    let fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragShader, fragCode);
    gl.compileShader(fragShader);
    if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS)) {
        throw new Error('Fragment shader compilation failed: ' + gl.getShaderInfoLog(fragShader));
    }

    let shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertShader);
    gl.attachShader(shaderProgram, fragShader);
    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        throw new Error('Shader program linking failed: ' + gl.getProgramInfoLog(shaderProgram));
    }

    gl.useProgram(shaderProgram);

    return shaderProgram;
}
