/**
 * This function initialises an object. It uploads all its arrays to the GPU
 * and records the references to each. We can then pass this object to drawObject
 * which will bind the arrays appropriately
 * 
 * @param   object         An object containing arrays for vertices, normals, and indices
 * @param   shaderprogram  a shader program returned by createProgram
 */
function initMirror(object, shaderprogram) {
    gl.useProgram(shaderprogram);

    // Vertices and indices arrive in the form of 2D matrix objects for ease of manipulation
    // We need to flatten them and convert them to JS arrays before passing them to WebGL
    let vertices = object.vertices.flat();
    let indices = object.indices.flat();
    let texcoords = object.texcoords.flat();

    // Create and store data into vertex buffer
    let vertex_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // Create and store data into index buffer
    let index_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    // Create and store data into texture buffer
    let texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    // Fill with a single pixel so we can start rendering. This is standard approach in WebGL
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([127, 127, 255, 255]));
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

    let tex_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, tex_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texcoords), gl.STATIC_DRAW);
    // Give the mirror a frame buffer.
    // Initialise the Target Texture
    const targetTextureWidth = 1024;
    const targetTextureHeight = 1024;
    const targetTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, targetTexture);

    // define size and format of level 0
    const level = 0;
    const internalFormat = gl.RGBA;
    const border = 0;
    const format = gl.RGBA;
    const type = gl.UNSIGNED_BYTE;
    const data = null;
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
        targetTextureWidth, targetTextureHeight, border,
        format, type, data);

    // set the filtering so we don't need mips
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    // Create and bind the framebuffer
    const framebuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);

    // attach the texture as the first color attachment
    const attachmentPoint = gl.COLOR_ATTACHMENT0;
    gl.framebufferTexture2D(gl.FRAMEBUFFER, attachmentPoint, gl.TEXTURE_2D, targetTexture, level);

    // create a depth renderbuffer
    const depthBuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer);

    // make a depth buffer and the same size as the targetTexture
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, targetTextureWidth, targetTextureHeight);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthBuffer);

    return {
        vertex_buffer: vertex_buffer,
        index_buffer: index_buffer,
        tex_buffer: tex_buffer,
        numVertices: indices.length,
        model: mat4.create(),
        texture: targetTexture,
        framebuffer: framebuffer,
        targetTextureWidth: targetTextureWidth,
        targetTextureHeight: targetTextureHeight,
    };
}

/**
 * This function draws an object using the supplied shader program
 * 
 * @param   bufferObject   An object returned by initObject
 * @param   shaderprogram  a shader program returned by createProgram
 */
function drawMirror(bufferObject, shaderprogram) {

    gl.useProgram(shaderprogram);

    let vertex_buffer = bufferObject.vertex_buffer;
    let index_buffer = bufferObject.index_buffer;
    let tex_buffer = bufferObject.tex_buffer;
    let number = bufferObject.numVertices;

    // Bind buffers
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    let aPosition = gl.getAttribLocation(shaderprogram, "aPosition");
    gl.vertexAttribPointer(aPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);

    gl.bindTexture(gl.TEXTURE_2D, bufferObject.texture);
    let aTexCoord = gl.getAttribLocation(shaderprogram, "aTexCoord");
    gl.bindBuffer(gl.ARRAY_BUFFER, tex_buffer);
    gl.vertexAttribPointer(aTexCoord, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aTexCoord);


    // Draw elements as triangles
    gl.drawElements(gl.TRIANGLES, number, gl.UNSIGNED_SHORT, 0);
}