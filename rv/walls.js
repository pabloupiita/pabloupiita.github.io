function Wall(){
  THREE.Object3D.call(this);
  var texture = new THREE.TextureLoader().load( './walls.jpg');
  
  this.wall = new THREE.Mesh(new THREE.BoxGeometry(20,5,0.5),
                       new THREE.MeshBasicMaterial({map:texture}));
  texture.anisotropy = 16;
  this.add(this.wall);
}


Wall.prototype = new THREE.Object3D();
function setup(){
THREE.ImageUtils.crossOrigin = '';

var points = [];
  points.push(new THREE.Vector2(0,2));
  points.push(new THREE.Vector2(0.7,-0.5));
  points.push(new THREE.Vector2(2,-1.5));
  points.push(new THREE.Vector2(0,-1.5));
 
  var headForm = new THREE.TorusKnotGeometry(0.5, 0.1, 100, 10 );
  //var headForm = new THREE.DodecahedronGeometry(0.5);
  var esferaForma = new THREE.SphereGeometry(1);
  var legForm = new THREE.CylinderGeometry(0.1,0.1,2);
  var bodyForm = new THREE.LatheGeometry(points);
  var footForm = new THREE.TorusGeometry(0.3,0.05,16,100);
  
  var material = new THREE.MeshNormalMaterial(  );
  
  
  var head  = new THREE.Mesh(headForm,material);
  var esfera2 = new THREE.Mesh(esferaForma);
  var body = new THREE.Mesh(bodyForm, material);
  var leg1 = new THREE.Mesh(legForm);
  var leg2 = new THREE.Mesh(legForm);
  var foot1 = new THREE.Mesh(footForm);
  var foot2 = new THREE.Mesh(footForm);
  
  foot1.position.x = 0.15 + 0.05 + Math.sin(.2),
  foot1.position.y = -3.55,
  foot1.rotation.x = 3.1416/2;
  foot2.rotation.x = 3.1416/2;
  foot2.position.x = -0.15 -0.05 - Math.sin(.2),
  foot2.position.y = -3.55,
  leg1.position.x = .25,
  leg1.position.y = -2.5,
  leg1.rotation.z = Math.asin(0.2);
  leg2.rotation.z = -Math.asin(0.2);
  
  leg2.position.x = -.25,
  leg2.position.y = -2.5,
  head.position.y = 3;
  

  var forma = new THREE.Geometry();
  THREE.GeometryUtils.merge(forma,foot1);
  THREE.GeometryUtils.merge(forma, foot2);
  THREE.GeometryUtils.merge(forma, head);
  THREE.GeometryUtils.merge(forma, leg1);
  THREE.GeometryUtils.merge(forma, leg2);
  THREE.GeometryUtils.merge(forma, body);
  robot = new THREE.Mesh(forma,material);
  
  

wall1 = new Wall();
wall2 = new Wall();
wall3 = new Wall();
wall4 = new Wall();


wall1.position.z = -10;
wall2.rotation.y = 3.1416 / 2;
wall2.position.x = 9.75;
wall3.rotation.y = 3.1416 / 2;
wall3.position.x = -9.75;
wall4.position.z = 10;

var iluminacion = new THREE.PointLight(0xFFFFFF);
iluminacion.position.y = 7;
escena = new THREE.Scene();
escena.add(wall1);
escena.add(wall2);
escena.add(wall3);
escena.add(wall4);
escena.add(robot);
escena.add(iluminacion);

camara = new THREE.PerspectiveCamera();
camara.position.z = 0;
camara.position.y = 30;
camara.rotation.x = -3.1416 / 2 + 0.02;

renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerHeight*0.95, window.innerHeight*0.95);
console.log( renderer.getMaxAnisotropy());
document.body.appendChild( renderer.domElement);

renderer.shadowMapEnabled = true;
wall1.castShadow = true;
robot.castShadow = true;
iluminacion.castShadow = true;
stepx = 0.1;
stepz = 0;
raycaster2 = new THREE.Raycaster(robot.position,new THREE.Vector3(1,0,0));
raycaster3 = new THREE.Raycaster(robot.position,new THREE.Vector3(-1,0,0));
raycaster1 = new THREE.Raycaster(robot.position,new THREE.Vector3(0,0,-1));
raycaster4 = new THREE.Raycaster(robot.position,new THREE.Vector3(0,0,1));

}

function loop(){
var rot = 0;
collisionOne = raycaster1.intersectObject(wall1,true);
collisionTwo = raycaster2.intersectObject(wall2,true);
collisionThree = raycaster3.intersectObject(wall3,true);
collisionFour = raycaster4.intersectObject(wall4,true) ;



if(collisionTwo.length > 0 && collisionTwo[0].distance <= 2){ stepx = 0; stepz = -0.1  ;}
if(collisionOne.length > 0 && collisionOne[0].distance <= 2) {stepx = - 0.1;  stepz = 0;}
if(collisionThree.length > 0 && collisionThree[0].distance <= 2) {stepx = 0; stepz = 0.1;}
if(collisionFour.length > 0 && collisionFour[0].distance <= 2) {stepx = 0.1; stepz = 0;}

if(collisionTwo.length > 0 && collisionTwo[0].distance <= 2
   && collisionOne.length > 0 && collisionOne[0].distance <= 2){
     stepx = -0.1; 
     stepz = 0;
   }

if(collisionThree.length > 0 && collisionThree[0].distance <= 2
   && collisionOne.length > 0 && collisionOne[0].distance <= 2){
     stepx = -0; 
     stepz = 0.1;
   }

if(collisionThree.length > 0 && collisionThree[0].distance <= 2
   && collisionFour.length > 0 && collisionFour[0].distance <= 2){
     stepx = 0.1; 
     stepz = 0;
   }
   
if(collisionTwo.length > 0 && collisionTwo[0].distance <= 2
   && collisionFour.length > 0 && collisionFour[0].distance <= 2){
     stepx = 0; 
     stepz = -0.1;
   }



robot.position.x += stepx;
robot.position.z += stepz;



raycaster2.set(robot.position,new THREE.Vector3(1,0,0));
raycaster3.set(robot.position,new THREE.Vector3(-1,0,0));
raycaster1.set(robot.position,new THREE.Vector3(0,0,-1));
raycaster4.set(robot.position,new THREE.Vector3(0,0,1));
requestAnimationFrame(loop);
renderer.render(escena, camara);
}

var camara, escena, renderer,wall1,wall2,wall3,wall4,raycaster,robot,stepx,stepz,cyl;
var raycaster1, raycaster2,raycaster3, raycaster4;
var collisionOne, collisionTwo,collisionThree, collisionFour;
var collideMatrix = [];
setup();
loop();
