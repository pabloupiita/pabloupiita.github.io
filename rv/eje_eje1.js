function setup(){
var forma =new THREE.BoxGeometry(1,1,1);
var material= new THREE.MeshBasicMaterial({color: 0x00ff00});
malla= new THREE.Mesh(forma,material);

escena =new THREE.Scene();
escena.add(malla);

camara = new THREE.PerspectiveCamera();
camara.position.z=5;

renderer=new THREE.WebGLRenderer();
renderer.SetSize(window.innerHeight*.95,window.innerHeight*.95);
document.body.appendChild(renderer.domElement);
}

function loop(){
requestAnimationFrame(loop);

malla.rotatio.x +=0.01
malla.rotatio.y +=0.01;

renderer.render(escena,camara);
}

var camara,escena,renderer,malla;
setup();
loop();
