function Pierna(){
  THREE.Object3D.call(this);
  this.pierna = new THREE.Mesh( new THREE.CylinderGeometry(0.1,0.1,2),new THREE.MeshPhongMaterial({color:0x3366ff}));
  this.pie = new THREE.Mesh( new THREE.TorusGeometry(0.3,0.05,16,100),new THREE.MeshPhongMaterial({color:0x3366ff}));
  this.pierna.position.y = -1;
  this.pie.rotation.x = 3.1416 / 2;
  this.pie.position.y = -2;
  this.add(this.pierna);
  this.add(this.pie);
  
}


 // leg1.position.x = .25,
  //leg1.position.y = -2.5,
  //foot1.position.x = 0.15 + 0.05 + Math.sin(.2),
//  foot1.position.y = -3.55,
//  foot1.rotation.x = 3.1416/2;
//  foot2.rotation.x = 3.1416/2;
  //foot2.position.x = -0.15 -0.05 - Math.sin(.2),
  //foot2.position.y = -3.55,

 
Pierna.prototype = new THREE.Object3D();
function setup(){
  var light = new THREE.PointLight(0xf5f5f5, 2 );
  light.position.set( 10, 10, 10 );
  var material = new THREE.MeshPhongMaterial({color:0x6600aa});
  var material2 = new THREE.MeshPhongMaterial({color:0x7fffd4});
  var points = [];
  points.push(new THREE.Vector2(0,2));
  points.push(new THREE.Vector2(0.7,-0.5));
  points.push(new THREE.Vector2(2,-1.5));
  points.push(new THREE.Vector2(0,-1.5));
  escena = new THREE.Scene();
  cuerpo = new THREE.Mesh( new THREE.LatheGeometry(points),material);
  escena.add( cuerpo );
  cabeza = new THREE.Mesh(new THREE.TorusKnotGeometry(0.5,.1,100,10),material2);
  piernaD = new Pierna();
  piernaI = new Pierna();
  piernaD.position.y = -1.5;
  piernaI.position.y = -1.5;
  cabeza.position.y = 3;
  piernaD.position.z = -1;
  piernaI.position.z = 1;
  step = 0.01;
  
  escena.add( cabeza );
  escena.add( piernaD );
  escena.add( piernaI );
  escena.add( light );
  camara = new THREE.PerspectiveCamera();
  camara.position.z = 20;
  
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerHeight*0.95, window.innerHeight*0.95 );
  document.body.appendChild(renderer.domElement);
}

function loop(){
  requestAnimationFrame( loop );
  renderer.render(escena, camara);
  if( Math.abs(piernaD.rotation.z) > 0.5 )
    step = -step;
    
  piernaD.rotation.z += step;
  piernaI.rotation.z -= step;
  
}

var escena, camara, renderer;
var step, piernaD, piernaI,cabeza,cuerpo;

setup();
loop();
