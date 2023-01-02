function main() {
  // Создание холста и получение контекста
  var canvas = document.getElementById('my_Canvas');
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  //Код шейдеров
  var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'uniform mat4 u_ModelMatrix;\n' +
    'attribute vec4 a_Color;\n' +
    'varying vec4 v_Color;\n' +
    'void main() {\n' +
    '  gl_Position = u_ModelMatrix * a_Position;\n' +
    '  v_Color = a_Color;\n' +
    '}\n';

  var FSHADER_SOURCE =
    'precision mediump float;\n' +
    'varying vec4 v_Color;\n' +
    'void main() {\n' +
    '  gl_FragColor = v_Color;\n' +
    '}\n';

  // Инициализация шейдеров
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  var vertices = new Float32Array([
    -0.15, 0.6,   0.4, 0.85, 0.7, 1.0,
    -0.45, -0.4,   0.15, 0.65, 0.5, 1.0,
    0.15, 0.6,   0.45, 0.9, 0.65, 0.9,
    0.45, -0.4,   1.0, 0.0, 0.0, 0.5
  ]);
  //Количество вершин
  var verticesAmt = 4;
  // Создаем пустой буферный объект для хранения буфера вершин
  var vertexBuffer = gl.createBuffer();
  // Привязываем к нему соответствующий ARRAY_BUFFER
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  if (!vertexBuffer) {
    console.log('Failed to create the buffer object');
    return false;
  }
  // Записываем данные в ARRAY_BUFFER
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  var SIZE = vertices.BYTES_PER_ELEMENT;
  //Нахождение атрибута a_Position
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get a_Position loction');
    return -1;
  }
  // Assign the buffer object to a_Position variable
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, SIZE * 6, 0);
  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_Position);

  //Нахождение атрибута a_Color
  var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
  if (a_Color < 0) {
    console.log('Failed to get the storage location of a_Color');
    return -1;
  }
  // Assign the buffer object to a_Color variable
  gl.vertexAttribPointer(a_Color, 4, gl.FLOAT, false, SIZE * 6, SIZE * 2);
  // Enable the assignment to a_Color variable
  gl.enableVertexAttribArray(a_Color);

  // Create Matrix4 object for model transformation
  var modelMatrix = new Matrix4();

  // Pass the model matrix to the vertex shader
  var u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
  if (!u_ModelMatrix) {
    console.log('Failed to get the storage location of u_xformMatrix');
    return;
  }

  var x = document.getElementById("x");
  var y = document.getElementById("y");
  var angle = document.getElementById("angle");
  var scale_x = document.getElementById("scaleX");
  var scale_y = document.getElementById("scaleY");

  x.oninput = function () {
    var x_value = document.getElementById("xValue");
    x_value.value = x.value;
    translateX(x, gl, u_ModelMatrix, modelMatrix, verticesAmt);
  };

  y.oninput = function () {
    var y_value = document.getElementById("yValue");
    y_value.value = y.value;
    translateY(y, gl, u_ModelMatrix, modelMatrix, verticesAmt);
  };

  angle.oninput = function () {
    var angle_value = document.getElementById("angleValue");
    angle_value.value = angle.value;
    angleZ(angle, gl, u_ModelMatrix, modelMatrix, verticesAmt);
  };

  scale_x.oninput = function () {
    var scale_x_value = document.getElementById("scaleXValue");
    scale_x_value.value = scale_x.value;
    scaleX(scale_x, gl, u_ModelMatrix, modelMatrix, verticesAmt);
  };

  scale_y.oninput = function () {
    var scale_y_value = document.getElementById("scaleYValue");
    scale_y_value.value = scale_y.value;
    scaleY(scale_y, gl, u_ModelMatrix, modelMatrix, verticesAmt);
  };

  gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);

  // Specify the color for clearing <canvas>
  gl.clearColor(0, 0, 0, 0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Draw the trapezoid
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, verticesAmt);
}

var prev_x = 0;
function translateX(x, gl, u_ModelMatrix, modelMatrix, n) {
  modelMatrix.translate(x.value - prev_x, 0, 0);
  prev_x = x.value;
  gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);

}

var prev_y = 0;
function translateY(y, gl, u_ModelMatrix, modelMatrix, n) {
  modelMatrix.translate(0, y.value - prev_y, 0);
  prev_y = y.value;
  gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);

}

var prev_angle = 0;
function angleZ(angle, gl, u_ModelMatrix, modelMatrix, n) {
  modelMatrix.rotate(angle.value - prev_angle, 0, 0, -1);
  prev_angle = angle.value;
  gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);

}

var prev_x_scale = 1;
function scaleX(x_scale, gl, u_ModelMatrix, modelMatrix, n) {
  modelMatrix.scale(1 / prev_x_scale, 1, 0);
  modelMatrix.scale(x_scale.value, 1, 0);
  prev_x_scale = x_scale.value;
  gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);

}

var prev_y_scale = 1;
function scaleY(y_scale, gl, u_ModelMatrix, modelMatrix, n) {
  modelMatrix.scale(1, 1 / prev_y_scale, 0);
  modelMatrix.scale(1, y_scale.value, 0);
  prev_y_scale = y_scale.value;
  gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
}