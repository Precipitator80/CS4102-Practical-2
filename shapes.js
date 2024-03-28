/**
 * Create a cube we can play with
 * 
 * @returns    object consisting of three matrices: vertices, colors and indices
 */
function cube() {
    return cuboid(-0.5, 0.5, -0.5, 0.5, -0.5, 0.5);
}

function cuboid(left, right, bottom, top, back, front) {
    // Define and store geometry
    // We use 4 vertices per face below. We duplicate vertices so each
    // face has its own 4 vertices. This means 24 vertices below
    // (6 faces * 4 vertices)

    let [leftCol, rightCol, bottomCol, topCol, backCol, frontCol] = [
        [1, 0, 0, 1],    // First face - Left face - red
        [1, 1, 0, 1],    // Second face - Right face - yellow 
        [0, 0, 1, 1],    // Third face - Bottom face - blue 
        [0, 1, 1, 1],    // Fourth face - Top face - cyan
        [1, 0, 1, 1],    // Fifth face - Back face - purple
        [1, 1, 1, 1],    // Sixth face - Front face - white            
    ];

    let vertices = [     // 24 vertices defining the cube - Front and back modified to match camera.
        [left, bottom, back, 1], // First face - Left face
        [left, top, back, 1],
        [left, top, front, 1],
        [left, bottom, front, 1],
        [right, bottom, front, 1], // Second face - Right face
        [right, top, front, 1],
        [right, top, back, 1],
        [right, bottom, back, 1],
        [left, bottom, back, 1], // Third face - Bottom face
        [left, bottom, front, 1],
        [right, bottom, front, 1],
        [right, bottom, back, 1],
        [left, top, front, 1], // Fourth face - Top face
        [left, top, back, 1],
        [right, top, back, 1],
        [right, top, front, 1],
        [left, bottom, -back, 1], // Fifth face - Back face
        [left, top, -back, 1],
        [right, top, -back, 1],
        [right, bottom, -back, 1],
        [right, bottom, -front, 1], // Sixth face - Front face
        [right, top, -front, 1],
        [left, top, -front, 1],
        [left, bottom, -front, 1],
    ];

    // We still have 12 triangles, because we still have 6 faces (2 triangles per face)
    // The difference from previous example is that indices go to 23 (because we have
    // 24 vertices in total and faces do not share vertices anymore)
    // Note -- it is tricky to get this right by hand!  

    let indices = [
        [0, 1, 2],
        [0, 2, 3],
        [4, 5, 6],
        [4, 6, 7],
        [8, 9, 10],
        [8, 10, 11],
        [12, 13, 14],
        [12, 14, 15],
        [16, 17, 18],
        [16, 18, 19],
        [20, 21, 22],
        [20, 22, 23],
    ];

    // One set of texture coordinates per face
    let [xRange, yRange] = [2 * Math.abs(right - left) + 2 * Math.abs(front - back), Math.abs(top - bottom) + 2 * Math.abs(front - back)];

    let x1 = 0;
    let x2 = x1 + Math.abs(front - back) / xRange;
    let x3 = x2 + Math.abs(right - left) / xRange;
    let x4 = x3 + Math.abs(front - back) / xRange;
    let x5 = 1;

    let y1 = 0;
    let y2 = Math.abs(front - back) / yRange;
    let y3 = y2 + Math.abs(top - bottom) / yRange;
    let y4 = 1;

    //console.log("Coords: " + x1 + "," + x2 + "," + x3 + "," + x4 + "," + x5);

    // Expected order to match vertices for texture wrap.
    // Bottom Left, Top Left, Top Right, Bottom Right
    // let texcoords = [
    //    [x1, y2], [x1, y3], [x2, y3], [x2, y2], // Left
    //    [x3, y2], [x3, y3], [x4, y3], [x4, y2], // Right
    //    [x2, y1], [x2, y2], [x3, y2], [x3, y1], // Bottom
    //    [x2, y3], [x2, y4], [x3, y4], [x3, y3], // Top
    //    [x4, y2], [x4, y3], [x5, y3], [x5, y2], // Back
    //    [x2, y2], [x2, y3], [x3, y3], [x3, y2], // Front
    // ];

    // Working coordinates for full texture on each face.
    // Bottom Right, Top Right, Top Left, Bottom Left
    // let texcoords = [
    //    [1, 0], [1, 1], [0, 1], [0, 0], // Left
    //    [1, 0], [1, 1], [0, 1], [0, 0], // Right
    //    [1, 0], [1, 1], [0, 1], [0, 0], // Bottom
    //    [1, 0], [1, 1], [0, 1], [0, 0], // Top
    //    [1, 0], [1, 1], [0, 1], [0, 0], // Back
    //    [1, 0], [1, 1], [0, 1], [0, 0], // Front
    // ];

    // Working coordinates to match vertices for texture wrap.
    // Reverse order of vertices plus flips for top and bottom.
    let texcoords = [
        [x2, y2], [x2, y3], [x1, y3], [x1, y2], // Left
        [x4, y2], [x4, y3], [x3, y3], [x3, y2], // Right
        [x2, y2], [x2, y1], [x3, y1], [x3, y2], // Bottom
        [x2, y4], [x2, y3], [x3, y3], [x3, y4], // Top
        [x5, y2], [x5, y3], [x4, y3], [x4, y2], // Back
        [x3, y2], [x3, y3], [x2, y3], [x2, y2], // Front
    ];

    // We define 24 colours (one colour per vertex). We group them by faces;
    // sets of four vertices belonging to the same face get the same colour   

    let colors = [
        leftCol,
        leftCol,
        leftCol,
        leftCol,
        rightCol,
        rightCol,
        rightCol,
        rightCol,
        bottomCol,
        bottomCol,
        bottomCol,
        bottomCol,
        topCol,
        topCol,
        topCol,
        topCol,
        backCol,
        backCol,
        backCol,
        backCol,
        frontCol,
        frontCol,
        frontCol,
        frontCol
    ];

    let normals = [     // 24 vertices defining the cube
        [-1, 0, 0, 0], // First face - Left face
        [-1, 0, 0, 0],
        [-1, 0, 0, 0],
        [-1, 0, 0, 0],
        [1, 0, 0, 0], // Second face - Right face
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [0, -1, 0, 0], // Third face - Bottom face
        [0, -1, 0, 0],
        [0, -1, 0, 0],
        [0, -1, 0, 0],
        [0, 1, 0, 0], // Fourth face - Top face
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0], // Fifth face - Back face
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, -1, 0], // Sixth face - Front face
        [0, 0, -1, 0],
        [0, 0, -1, 0],
        [0, 0, -1, 0],
    ];

    return {
        vertices: vertices,
        colors: colors,
        indices: indices,
        normals: normals,
        texcoords: texcoords
    };
}

function combineShapes(shapes) {
    let combinedVertices = [];
    let combinedColors = [];
    let combinedIndices = [];
    let combinedNormals = [];
    let combinedTexcoords = [];

    let offset = 0;

    for (let shape of shapes) {
        combinedVertices.push(...shape.vertices);
        combinedColors.push(...shape.colors);
        combinedNormals.push(...shape.normals);
        combinedTexcoords.push(...shape.texcoords);

        // Update indices with the current offset
        let shapeIndices = shape.indices.map(index => index.map(idx => idx + offset));
        combinedIndices.push(...shapeIndices);

        // Increment the offset
        offset += shape.vertices.length;
    }

    return {
        vertices: combinedVertices,
        colors: combinedColors,
        indices: combinedIndices,
        normals: combinedNormals,
        texcoords: combinedTexcoords
    };
}

function bench() {
    let [xExtent, yExtent, zExtent] = [0.5, 0.125, 0.25];
    let top = cuboid(-xExtent, xExtent, -yExtent, yExtent, -zExtent, zExtent);
    let leftLeg = cuboid(-xExtent + xExtent / 6, -xExtent + xExtent / 2, -3 * yExtent, -yExtent, -0.8 * zExtent, 0.8 * zExtent);
    let rightLeg = cuboid(xExtent - xExtent / 2, xExtent - xExtent / 6, -3 * yExtent, -yExtent, -0.8 * zExtent, 0.8 * zExtent);

    return combineShapes([top, leftLeg, rightLeg]);

    // // Increment indices in leftLeg using the top vertices as an offset.
    // const leftLegOffset = top.vertices.length;
    // leftLeg.indices = leftLeg.indices.map(index =>
    //     [index[0] + leftLegOffset, index[1] + leftLegOffset, index[2] + leftLegOffset]);

    // // Increment indices in rightLeg using the other two sets of vertices as an offset.
    // const rightLegOffset = top.vertices.length + leftLeg.vertices.length;
    // rightLeg.indices = rightLeg.indices.map(index =>
    //     [index[0] + rightLegOffset, index[1] + rightLegOffset, index[2] + rightLegOffset]);

    // return {
    //     vertices: [...top.vertices, ...leftLeg.vertices, ...rightLeg.vertices],
    //     colors: [...top.colors, ...leftLeg.colors, ...rightLeg.colors],
    //     indices: [...top.indices, ...leftLeg.indices, ...rightLeg.indices],
    //     normals: [...top.normals, ...leftLeg.normals, ...rightLeg.normals],
    //     texcoords: [...top.texcoords, ...leftLeg.texcoords, ...rightLeg.texcoords]
    // };
}

function flower() {
    let [xExtent, yExtent, zExtent] = [0.5, 0.5, 0.25];
    let stem = cuboid(-xExtent / 2, xExtent / 2, -yExtent, yExtent, -zExtent, zExtent);
    let leftPetal = cuboid(-xExtent, -xExtent / 2, -yExtent / 2, yExtent / 2, -zExtent, zExtent);
    let rightPetal = cuboid(xExtent / 2, xExtent, -yExtent / 2, yExtent / 2, -zExtent, zExtent);

    return combineShapes([stem, leftPetal, rightPetal]);
}