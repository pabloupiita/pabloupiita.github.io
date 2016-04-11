function Robot(size,x,y){
  Agent.call(this,x,y);
  
  this.sensor=new Sensor();
  this.actuator=new THREE.Mesh(
  new THREE.BoxGeometry(size,size,size),
  new THREE.MeshBasicMaterial({color:'#aa0000'}));
  this.actuator.commands=[];
  this.add(this.actuator);
  }
  
  Robot.prototype=new Agent();
  
  Robot.prototype.sense= function(environment)
  {
  this.sensor.set(this.position,
                    new THREE.Vector3(Math.cos(this.rotation.z),Math.sin(this.rotation.z),0));
  var obstaculo =this.sensor.intersectObjects(environment.children,true);
  
  if ((obstaculo.length>0 &&
      (obstaculo[0].distance<=.5)))
        this.sensor.colision=true;
  else
        this.sensor.colision=false;
        };
        
  Robot.prototype.plan=function(environment){
  this.actuator.commands=[];
  
  if (this.sensor.colision==true)
  this.actuator.commands.push('rotateCCW');
  else
  this.actuator.commands.push('goStraight');
  };
  
  Robot.prototype.act=function(environment){
    var command=this.actuator.commands.pop();
    
    if (command==undefined)
    console.log('Undefined command');
    else if(command.in.this.operations)
  
  
  
  
  
  
  
  
