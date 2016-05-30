function setup(){
  var points = [];
  points.push(new THREE.Vector2(0,2));
  points.push(new THREE.Vector2(0.7,-0.5));
  points.push(new THREE.Vector2(2,-1.5));
  points.push(new THREE.Vector2(0,-1.5));
  
  var headForm = new THREE.TorusKnotGeometry(0.5, 0.1, 100, 10 );
  //var headForm = new THREE.DodecahedronGeometry(0.5);
  var esferaForma = new THREE.SphereGeometry(1);
  var legForm = new THREE.CylinderGeometry(0.1,0.1,2);
  var bodyForm = new THREE.LatheGeometry(points, 20, 0, 2*Math.PI);//LatheGeometry(points, segments, phiStart, phiLength)
  var footForm = new THREE.TorusGeometry(0.3,0.05,16,100);
  //var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
 var material = new THREE.MeshNormalMaterial();
 material.wireframe = true;
  
  
  var head  = new THREE.Mesh(headForm,material);
  var esfera2 = new THREE.Mesh(esferaForma);
  var body = new THREE.Mesh(bodyForm, material);
  var leg1 = new THREE.Mesh(legForm, material);
  var leg2 = new THREE.Mesh(legForm,material);
  var foot1 = new THREE.Mesh(footForm,material);
  var foot2 = new THREE.Mesh(footForm,material);
  
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

  malla = new THREE.Mesh(forma,material);
  escena = new THREE.Scene();
  escena.add( malla );
  
  

  camara = new THREE.PerspectiveCamera();
  camara.position.z = 10;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerHeight*0.95, window.innerHeight*0.95);
  document.body.appendChild(renderer.domElement);

}

function loop(){
  requestAnimationFrame( loop );
  renderer.render(escena, camara);
  
  malla.rotation.y += 0.01;
  
}

var escena, camara, renderer, malla;
setup();
loop();
