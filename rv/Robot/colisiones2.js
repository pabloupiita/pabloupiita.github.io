function rueda(){
	THREE.Object3D.call(this);
	THREE.ImageUtils.crossOrigin = '';
	var textura = 	THREE.ImageUtils.loadTexture('http://threejs.org/examples/textures/brick_diffuse.jpg');
	this.arcShape = new THREE.Shape();
	this.arcShape.moveTo( 50, 10 );
	this.arcShape.absarc( 10, 10, 40, 0, Math.PI*2, false );
	this.holePath = new THREE.Path();
	this.holePath.moveTo( 20, 10 );
	this.holePath.absarc( 10, 10, 10, 0, Math.PI*2, true );
	this.arcShape.holes.push( this.holePath );
	this.extrudeSettings = { amount: 8, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
	this.rueda = new THREE.ExtrudeGeometry( this.arcShape, this.extrudeSettings );
	this.material = new THREE.MeshPhongMaterial({ map: this.textura});
	this.mallaRueda = new THREE.Mesh( this.rueda, this.material );
	this.add(this.mallaRueda);
}
rueda.prototype = new THREE.Object3D();
	
function base(){
	THREE.Object3D.call(this);
	this.malla = new THREE.Mesh( new THREE.BoxGeometry( 50,20,98 ), new THREE.MeshNormalMaterial({ color: 0x0000ff }) );
	this.add(this.malla);
}
base.prototype = new THREE.Object3D();

function setup(){
	var material = new THREE.MeshPhongMaterial({color: 0x0000ff });

		var soporte = new THREE.BoxGeometry( 10,10,70);
		var soporte2 = new THREE.CylinderGeometry(5,5.25 );

		var mallaSoporte = new THREE.Mesh( soporte, material);
		var mallaSoporte2 = new THREE.Mesh( soporte2, material);
		mallaBase = new base();
		
		mallaRueda1 = new  rueda ();
		mallaRueda2 = new  rueda ();

		mallaRueda1.position.set( 0, 0, 0);
		mallaBase.position.set( 0, 0, 50);
		mallaRueda2.position.set( 0, 0, 100);
		mallaSoporte.position.set( 0, 100, 50);
		mallaSoporte2.position.set( 0, 50, 53 );
		
		var robot = new THREE.Geometry();

	THREE.GeometryUtils.merge( robot, mallaSoporte );
	THREE.GeometryUtils.merge( robot, mallaSoporte2 );
	THREE.GeometryUtils.merge( robot, mallaBase );

	//mallaRobot = new THREE.Mesh( robot , material );
  	
}
//________________________________________________________

function Roboth(r,x=0,y=0){
Agent.call(this,x,y);
this.add(new THREE.Mesh( robot , material ));

this.step=0.1;
this.colision=0;
this.radius=r;
this.sensor=new THREE.Raycaster(this.position,new THREE.Vector3(1,0,0));
}

Roboth.prototype =new Agent();
Roboth.prototype.sense=function(enviroment){
  this.sensor.set(this.position,new THREE.Vector3(1,0,0));
  var obstaculo1=this.sensor.intersectObjects(enviroment.children,true);
  
  this.sensor.set(this.position,new THREE.Vector3(-1,0,0));
  var obstaculo2=this.sensor.intersectObjects(enviroment.children,true);

  this.sensor.set(this.position,new THREE.Vector3(0,-1,0));
  var obstaculo3=this.sensor.intersectObjects(enviroment.children,true);

  this.sensor.set(this.position,new THREE.Vector3(0,1,0));
  var obstaculo4=this.sensor.intersectObjects(enviroment.children,true);
  
  if((obstaculo1.length>0 && (obstaculo1[0].distance <= this.radius)) || (obstaculo2.length>0 && (obstaculo2[0].distance <= this.radius)) || (obstaculo3.length>0 && (obstaculo3[0].distance <= this.radius)) || (obstaculo4.length>0 && (obstaculo4[0].distance <= this.radius)))
  this.colision=1;
  else
  this.colision=0;
  };
  
  Roboth.prototype.act=function(enviroment)
	{
  		if(this.colision==1)
  		this.step=-this.step;
		if (obstaculo1.length>0 || obstaculo2.length>0)
  		this.position.x +=this.step;
		else
		this.position.y +=this.step;
  	};
  
  function Pared(size,x=0,y=0){
  THREE.Object3D.call(this,x,y);
  this.add(new THREE.Mesh(new THREE.BoxGeometry(size,size,size),
                          new THREE.MeshNormalMaterial()));
  this.size = size;
  this.position.x=x;
  this.position.y=y;
  }
  
  Pared.prototype = new THREE.Object3D();
  
  function setup_dos()
	{

  entorno=new Enviroment();
  camara= new THREE.PerspectiveCamera();
  camara.position.z=100;
  
  entorno.add(new Pared(1,10,0));
  entorno.add(new Pared(1,-10,0));
  entorno.add(new Pared(1,10,1));
  entorno.add(new Pared(1,-10,1));
  entorno.add(new Pared(1,10,1));
  entorno.add(new Pared(1,10,-1));
  entorno.add(new Roboth(10));
  entorno.add(camara);
  entorno.add( mallaRueda1 );
  entorno.add( mallaRueda2 );
  entorno.add( mallaBase);
              
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerHeight*.95,window.innerHeight*.95);
  document.body.appendChild(renderer.domElement);
  	}
  
  function loop(){
  requestAnimationFrame(loop);
  entorno.sense();
  entorno.plan();
  entorno.act();
  renderer.render(entorno,camara);
  }
  
  var entorno,camara,renderer,mallaRobot;
  var mallaRueda1, mallaRueda2, mallaBase;
  setup_uno();
  setup_dos();
  loop();
