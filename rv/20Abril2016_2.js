function setup()
{
THREE.ImageUtils.crossOrigin='';
var textura=THREE.ImageUtils.loadTexture('http://three.js.org/examples/textures/planets/earth_atmos_2048.jpg');
malla=new THREE.Mesh(new THREE.SphereGeometry(1),
			new THREE.MeshPhongMaterial({map:textura}));
malla.position.y+=2;
malla.rotation.z+=0.25;
var base =new THREE.Mesh(new THREE.BoxGeometry(5,.1,5),
			new THREE.MeshLambertMaterial({color:0x00FF00}));
var iluminacion=new THREE.PointLight(0xFFFFFF);
iluminacion.position.y=20;

escena=new THREE.Scene();
escena.add(malla);
escena.add(base);
escena.add(iluminacion);

camara=new THREE.PerspectiveCamera();
camara.position.z=15;
camara.position.y=5;

renderer=new THREE.WebGLRenderer();
renderer.setSize(window.innerHeight*.95,window.innerHeight*.95);
document.body.appendChild(renderer.domElement);

%renderer.shadowMapEnabled=true;
%malla.castShadow=true;
%base.receiveShadow=true;
%iluminacion.castShadow=true;
}

function loop(){
requestAnimationFrame(loop);
malla.rotation.y+=0.01;
renderer.render(escena,camara);
}

var camara,escena,renderer,malla;
setup();
loop();
