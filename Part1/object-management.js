/**
 * This function initialises an object. It uploads all its arrays to the GPU
 * and records the references to each. We can then pass this object to drawObject
 * which will bind the arrays appropriately
 * 
 * @param   object         An object containing arrays for vertices, normals, and indices
 * @param   shaderprogram  a shader program returned by createProgram
 */
function initObject(object, shaderprogram) {
    gl.useProgram(shaderprogram);

    // Vertices, colors and indices arrive in the form of 2D matrix objects for ease of manipulation
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

    // load image
    var image = new Image();

    // This is a typical JavaScript sort of code. We need to wait for the texture to be loaded before proceeding.
    // we accomplish this by providing a callback function to be invoked once loading is done.
    // In a JavaScript-style, we do this inline
    image.addEventListener("load", function () {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.generateMipmap(gl.TEXTURE_2D);
    });

    image.src = "textures/marble10 diffuse 1k.jpg";
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

    let tex_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, tex_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texcoords), gl.STATIC_DRAW);

    return {
        vertex_buffer: vertex_buffer,
        index_buffer: index_buffer,
        tex_buffer: tex_buffer,
        numVertices: indices.length,
        model: mat4.create()
    };
}

/**
 * This function draws an object using the supplied shader program
 * 
 * @param   bufferObject   An object returned by initObject
 * @param   shaderprogram  a shader program returned by createProgram
 */
function drawObject(bufferObject, shaderprogram) {
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

    let aTexCoord = gl.getAttribLocation(shaderprogram, "aTexCoord");
    gl.bindBuffer(gl.ARRAY_BUFFER, tex_buffer);
    gl.vertexAttribPointer(aTexCoord, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aTexCoord);

    // Draw elements as triangles
    gl.drawElements(gl.TRIANGLES, number, gl.UNSIGNED_SHORT, 0);
}