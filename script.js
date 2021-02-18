var transitionVariable = 0;

var intro = document.getElementById("intro");
var about = document.getElementById("intro-2");

function init(){
  var initializeAnimation = true;

  //Animation variables
    var scaler = 0.018;
    var spinVelocity = 0.05;
    var breathe = 0.04;
    var damp = 0.992;
    var rotator = 0;

  //Model variables
  var hands;
  var headset;
  var head;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 5000 );
  const loader = new THREE.GLTFLoader();
  const textureLoader = new THREE.TextureLoader();

  var light = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(light);

  //Light variables
  var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(600, 800, 100);
  directionalLight.castShadow = true;
  directionalLight.shadowMapWidth = 2048;
  directionalLight.shadowMapHeight = 2048;
  scene.add(directionalLight);


  //Grid
  const size = 10;
  const divisions = 10;
  const gridHelper = new THREE.GridHelper( size, divisions );


  //Standard
  const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 1
  });

  const renderer = new THREE.WebGLRenderer(
    {
      antialias: true,
      shadowMapEnabled: true
    }
  );

  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.shadowMap.enabled = true;
  document.body.appendChild( renderer.domElement );

// *** LOADING MODELS ***

//Load the hands
  loader.load('Models/hand.gltf', function(gltf){
    gltf.scene.traverse(function (child){
      if(child instanceof THREE.Mesh){
        child.material = material;
      }
    });
    gltf.scene.receiveShadow = true;
    gltf.scene.position.y -= 0.3;
      gltf.scene.rotation.y += 1;
    //gltf.scene.rotation.y -= 0.5;

  //  gltf.scene.rotation.y = Math.PI/2;

    gltf.scene.scale.set(0.01, 0.01, 0.01);

    hands = gltf.scene;
    scene.add(gltf.scene);
  });


//Load the headset
  loader.load('Models/headset.gltf', function(gltf){
    gltf.scene.traverse(function (child){
      if(child instanceof THREE.Mesh){
        child.material = material;
      }
    });
    gltf.scene.receiveShadow = true;

    gltf.scene.position.y -= 15;

    rotator = gltf.scene.rotation.y - 0.5;
    gltf.scene.rotation.y += 1;
    //gltf.scene.rotation.y = Math.PI/2;

    //Initialize scale
    gltf.scene.scale.set(0.1, 0.1, 0.1);

    headset = gltf.scene;
    scene.add(gltf.scene);
  });

  //Load the head
    loader.load('Models/head.gltf', function(gltf){
      gltf.scene.traverse(function (child){
        if(child instanceof THREE.Mesh){
          child.material = material;
        }
      });
      gltf.scene.receiveShadow = true;

      //originally position,y -= 8
      gltf.scene.position.y -= 300;
      gltf.scene.position.z -= 1.5;
      gltf.scene.position.x -= 1.5;

      rotator = gltf.scene.rotation.y - 0.5;
      gltf.scene.rotation.y += 1;

      //Initialize scale
      gltf.scene.scale.set(0.1, 0.1, 0.1);

      head = gltf.scene;
      //scene.add(gltf.scene);
    });



  scene.background = new THREE.Color( 0xf1f1f1);
  camera.position.z = 200;
  camera.position.y = 100;
  camera.position.x = 345;

  camera.lookAt(0,30,0);

  //Adjust canvas size when window changes size
  function onWindowResize(){

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize( window.innerWidth, window.innerHeight );

  }
  window.addEventListener( 'resize', onWindowResize, false );


  //updates
  var update = function()
  {


    if(initializeAnimation){
      headset.scale.x += scaler;
      headset.scale.y += scaler;
      headset.scale.z += scaler;

      hands.scale.x += scaler;
      hands.scale.y += scaler;
      hands.scale.z += scaler;

      head.scale.x += scaler;
      head.scale.y += scaler;
      head.scale.z += scaler;

      scaler *= 0.98;

    if(hands.scale.z >= 1 && headset.scale.z >= 1){
        initializeAnimation = false;
      }
    }

      headset.position.y -= breathe;
      hands.position.y += breathe;
      head.position.y -= breathe;
      breathe *= damp;


      if(breathe < 0 && breathe < -0.005){
        breathe = -0.04;
      }

      if(hands.position.y > 3.5){
        if(breathe > 0){
          breathe *= -1;
        }
      }
      else if(hands.position.y < -0.5){
        if(breathe < 0){
          breathe *= -1;
        }
      }

    spinVelocity *= 0.97;
    if(hands.rotation.y > rotator){
      hands.rotation.y -= spinVelocity;
      headset.rotation.y -= spinVelocity;
      head.rotation.y -= spinVelocity;
    }

/*
    camera.position.z -= 0.6;
    camera.position.x -= 1;

*/
  transition(camera, hands, headset, head);

  };
  function transition(camera, hands, headset){

    if(transitionVariable == 1){
      if(hands.rotation.y > -Math.PI/2 - 0.45){
        /* z = 0.6, x = 1  */
        camera.position.z -= 0.6;
        camera.position.x -= 1.1;

        hands.rotation.y -= 0.01;
        hands.position.y -= 1;

        headset.rotation.y -= 0.01;
        headset.position.y -= 0.1;

        head.rotation.y -= 0.01;
        head.position.y -= 0.1;

      }

      if(head.opacity <= 1){
        head.opacity += 0.01;
      }

    }

  }

  //draw
  var render = function()
  {
    renderer.render(scene, camera);
  };

  //Loop through update
  var loop = function (){
    requestAnimationFrame(loop);
    update();
    render();
  };

  loop();
}

init();


function switchTransition(){

    transitionVariable = 1;
    intro.style.opacity = 0;
    about.style.opacity = 1;

}
