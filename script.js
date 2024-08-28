class PancakeAnim {
  constructor() {
    this.isSpinning = true;
    this.canvas = document.getElementById("cnv");
    this.illo = new Zdog.Illustration({
      element: ".zdog-canvas",
      dragRotate: true,
      translate: { x: 10, y:50 },
      // stop spinning when drag starts
      onDragStart: () => {
        this.isSpinning = false;
      },
      onResize: function (width,height) {
        // scale zoom
        //let height = window.innerHeight;
        let min = Math.min(height,width);
        this.zoom = min / 400;
      },
      resize: true
    });
    this.illo.rotate.x -= 0.2;
    this.illo.rotate.y -= 1;
    this.addObjects();

    this.animate();
  }
  addObjects() {
    //Arm
    this.arm = new Zdog.Shape({
      addTo: this.illo,
      path: [{ line: { x: 120 } }, { line: { x: 20 * 100, y: 120 * 100 } }],
      color: "#e07a5f",
      stroke: 50
    });

    // circle
    this.pancake = new Zdog.Ellipse({
      addTo: this.illo,
      diameter: 80,
      translate: { z: 0 },
      scale: { x: 1, y: 1, z: 1 },
      rotate: { x: Math.PI / 2 },
      stroke: 20,
      color: "#f2cc8f",
      fill: "#f2cc8f"
    });

    // pan
    this.pan = new Zdog.Ellipse({
      addTo: this.illo,
      diameter: 120,
      translate: { z: 0, y: 20 },
      scale: { x: 1, y: 1, z: 1 },
      rotate: { x: Math.PI / 2 },
      stroke: 20,
      color: "#3d405b",
      backface: "#3d405b",
      fill: "#3d405b"
    });
    new Zdog.Shape({
      addTo: this.pan,
      path: [{ line: { z: 10, x: 60 } }, { line: { z: 20, x: 120 } }],
      translate: { z: 0, y: 0 },
      scale: { x: 1, y: 1, z: 1 },
      stroke: 20,
      color: "#3d405b",
      backface: "#3d405b",
      fill: "#3d405b"
    });
  
    this.setupTimelines();
  }
  
  setupTimelines(){
    
    var pantl = gsap
      .timeline({defaults: { duration: 0.4, easing:"power2.inout" } })
    
      .to(this.pan.translate, { y: 70})
      .to(this.pan.rotate, { y: 0.4,duration:0.4 }, "<")
      .to(this.arm.translate, { y: 20,duration:0.4 }, "<")
    
      .to(this.pan.translate, { y: -50 })
      .to(this.pan.rotate, { y: -0.4}, "<")
      .to(this.arm.translate, { y: -10 }, "<")
    
      .to(this.pan.translate, { y: 20, duration:0.8 })
      .to(this.pan.rotate, { y: 0, duration:0.8 }, "<")
      .to(this.arm.translate, { y: 0, duration:0.8 }, "<")
    
    
    var secondBounceDuration = 0.5;
    var squidgeDuration=0.4;
    var finalCatchTime 
    var tl = gsap
      .timeline({ repeat: -1, defaults: { duration: 0.8 } })
      .add(()=>{pantl.restart(); pantl.play();})
    
      .to(this.pancake.translate, { y: 45,x:-8, duration:0.4, ease: "power2.inout" }) 
      .to(this.pancake.rotate, { y: 0.4, duration:0.4, ease: "none" }, "<")
      
      //.to(this.pancake.rotate, { y: -0.2,ease: "none",duration:0.05 }, "<")
      //.to(this.pancake.translate, { y: -20,ease: "none",duration:0.05 }, "<")
    
      .to(this.pancake.translate, { y: -200, x:0 ,ease: "power2.out" }, "+=0.025")
      .to(this.pancake.rotate, { y: -Math.PI / 4,ease: "none" }, "<")


      .to(this.pancake.translate, { y: -40,ease: "power2.in" }) //Touchdown
      .to(this.pancake.rotate, { y: -Math.PI / 2,ease: "none" }, "<")

      //.to(this.pancake.translate, { y: 0 })

      .to(this.pancake.scale, { y: 1.5, x: 0.7, ease: "power2.out" ,duration:squidgeDuration }) //squeeze out sides
      .to(this.pancake.translate, { y: -20, duration:squidgeDuration }, "<")
      .to(this.pan.rotate, {y:0.1, ease: "power2.out", duration:squidgeDuration },"<")
      .to(this.pan.translate, { y: 30, ease: "power2.out", duration:squidgeDuration }, "<")
      .to(this.arm.translate, { y: 3, ease: "power2.inout", duration:secondBounceDuration}, "<")
      
    
      .to(this.pancake.translate, { y: -80, ease: "power2.out", duration:secondBounceDuration })//Second jump
      .to(this.pancake.scale, { y: 1, x: 1, ease: "power2.out", duration:secondBounceDuration }, "<")
      .to(this.pancake.rotate, { y: -3*Math.PI/4,ease: "none", duration:secondBounceDuration },"<")
      .to(this.pan.rotate, {y:0, ease: "power2.inout", duration:secondBounceDuration},"<")
      .to(this.pan.translate, { y: 20, ease: "power2.inout", duration:secondBounceDuration}, "<")
      .to(this.arm.translate, { y: 0, ease: "power2.inout", duration:secondBounceDuration}, "<")

      .to(this.pancake.translate, { y: 0, ease: "power2.in", duration:secondBounceDuration })
      .to(this.pancake.rotate, { y: -Math.PI, ease: "none", duration:secondBounceDuration },"<")
      
    
  }

  animate() {
    this.illo.updateRenderGraph();
    
    requestAnimationFrame(() => this.animate());
  }
}

new PancakeAnim();