/**
 * ====================================================================
 * NAYA HAIR & BEAUTY STUDIO — 3D HERO EXPERIENCE (Three.js)
 * Sculpture organique de tresses et mèches soyeuses aux reflets cuivrés
 * Conçu pour 60 FPS, responsive, avec pause hors viewport et fallback 2D
 * ====================================================================
 */

class NayaHero3D {
  constructor(canvasContainerId) {
    this.container = document.getElementById(canvasContainerId);
    if (!this.container) return;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.braidGroup = null;
    this.lights = [];
    
    // Suivi de l'animation et de l'état
    this.animId = null;
    this.isVisible = true;
    this.clock = null;
    
    // Interactions souris amorties (lerp)
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.scrollProgress = 0;
    
    // Détection réduction des animations
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.isMobile = window.innerWidth < 768;

    this.init();
  }

  init() {
    // 1. Vérification de la compatibilité WebGL
    if (typeof THREE === 'undefined') {
      console.warn("Three.js n'est pas chargé, passage en mode 2D.");
      this.enableFallback();
      return;
    }

    try {
      this.setupScene();
      this.createSculpture();
      this.setupLights();
      this.setupEvents();
      this.startIntroSequence();
      this.animate();
    } catch (e) {
      console.error("Erreur lors de l'initialisation 3D:", e);
      this.enableFallback();
    }
  }

  setupScene() {
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    // Scène
    this.scene = new THREE.Scene();

    // Caméra avec angle cinématique
    this.camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    this.camera.position.set(0, 0, this.isMobile ? 7.5 : 6.0);

    // Renderer haute précision avec ombres douces
    this.renderer = new THREE.WebGLRenderer({
      antialias: !this.isMobile,
      alpha: true,
      powerPreference: "high-performance"
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;

    const canvas = this.renderer.domElement;
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    this.container.appendChild(canvas);

    this.clock = new THREE.Clock();
  }

  /**
   * Création de la sculpture organique de tresses & mèches stylisées
   */
  createSculpture() {
    this.braidGroup = new THREE.Group();

    // Matériau Cuivre Satiné / Mèches Soyeuses profondes
    const copperSatinMaterial = new THREE.MeshStandardMaterial({
      color: 0xC87D55,
      roughness: 0.35,
      metalness: 0.65,
      emissive: 0x1E0D06,
      emissiveIntensity: 0.2
    });

    // Matériau Brun Espresso Profond
    const espressoSilkMaterial = new THREE.MeshStandardMaterial({
      color: 0x1F1612,
      roughness: 0.45,
      metalness: 0.35
    });

    // Matériau Or Chaud pour les bagues de tresses (hair jewelry)
    const goldJewelryMaterial = new THREE.MeshStandardMaterial({
      color: 0xE5B869,
      roughness: 0.2,
      metalness: 0.85
    });

    // 1. Tresse centrale hélicoïdale à 3 brins entrelacés
    const braidLength = 4.2;
    const pointsCount = this.isMobile ? 40 : 70;
    const braidStrands = 3;

    for (let s = 0; s < braidStrands; s++) {
      const strandPoints = [];
      const phaseOffset = (s * Math.PI * 2) / braidStrands;

      for (let i = 0; i <= pointsCount; i++) {
        const t = (i / pointsCount) * Math.PI * 5;
        const y = (i / pointsCount) * braidLength - braidLength / 2;
        
        // Rayon qui s'amincit élégamment vers le bas
        const taper = Math.sin((i / pointsCount) * Math.PI * 0.9 + 0.1);
        const radius = 0.45 * taper;

        const x = Math.cos(t + phaseOffset) * radius;
        const z = Math.sin(t * 0.5 + phaseOffset) * (radius * 0.7);

        strandPoints.push(new THREE.Vector3(x, y, z));
      }

      const strandCurve = new THREE.CatmullRomCurve3D(strandPoints);
      const tubeGeo = new THREE.TubeGeometry(strandCurve, this.isMobile ? 36 : 64, 0.09, this.isMobile ? 6 : 10, false);
      
      const mesh = new THREE.Mesh(tubeGeo, s === 1 ? copperSatinMaterial : espressoSilkMaterial);
      this.braidGroup.add(mesh);
    }

    // 2. Mèches fluides en rubans protecteurs ondulants autour de la tresse
    const ribbonCount = this.isMobile ? 2 : 4;
    for (let r = 0; r < ribbonCount; r++) {
      const ribbonPoints = [];
      const angle = (r * Math.PI) / 2;
      const heightSteps = 30;

      for (let j = 0; j <= heightSteps; j++) {
        const u = j / heightSteps;
        const y = u * 5 - 2.5;
        const wave = Math.sin(u * Math.PI * 3 + angle) * 0.85;
        const x = Math.cos(u * Math.PI * 2 + angle) * (1.2 + wave * 0.4);
        const z = Math.sin(u * Math.PI * 2.5) * (0.8 + wave * 0.3);

        ribbonPoints.push(new THREE.Vector3(x, y, z));
      }

      const ribbonCurve = new THREE.CatmullRomCurve3D(ribbonPoints);
      const ribbonGeo = new THREE.TubeGeometry(ribbonCurve, 40, 0.045, 6, false);
      const ribbonMesh = new THREE.Mesh(ribbonGeo, r % 2 === 0 ? copperSatinMaterial : espressoSilkMaterial);
      this.braidGroup.add(ribbonMesh);
    }

    // 3. Petites bagues / anneaux dorés traditionnels ornant la tresse
    const ringPositions = [-1.4, -0.6, 0.3, 1.2];
    ringPositions.forEach(yPos => {
      const ringGeo = new THREE.TorusGeometry(0.38, 0.04, 8, 24);
      const ringMesh = new THREE.Mesh(ringGeo, goldJewelryMaterial);
      ringMesh.position.set(0, yPos, 0);
      ringMesh.rotation.x = Math.PI / 2 + 0.2;
      ringMesh.rotation.y = yPos * 0.5;
      this.braidGroup.add(ringMesh);
    });

    // Position initiale décalée pour composition éditoriale
    this.braidGroup.position.set(this.isMobile ? 0 : 0.8, -0.2, 0);
    this.braidGroup.rotation.y = 0.3;
    this.braidGroup.rotation.x = 0.15;
    this.braidGroup.scale.set(0.001, 0.001, 0.001); // Commence invisible pour séquence d'intro

    this.scene.add(this.braidGroup);
  }

  setupLights() {
    // Lumière d'ambiance avec ton chaud
    const ambientLight = new THREE.AmbientLight(0x2A1C16, 1.2);
    this.scene.add(ambientLight);

    // Lumière clé cuivrée
    const keyLight = new THREE.DirectionalLight(0xE5986C, 2.4);
    keyLight.position.set(4, 5, 4);
    this.scene.add(keyLight);
    this.lights.push(keyLight);

    // Lumière secondaire ivoire doux
    const fillLight = new THREE.DirectionalLight(0xFBF4E8, 1.5);
    fillLight.position.set(-4, -2, 3);
    this.scene.add(fillLight);
    this.lights.push(fillLight);

    // Rim light dorée arrière pour détacher les mèches
    const rimLight = new THREE.PointLight(0xF3CA88, 3.0, 10);
    rimLight.position.set(0, 3, -3);
    this.scene.add(rimLight);
    this.lights.push(rimLight);
  }

  /**
   * Séquence d'apparition progressive (Temps 1 à 6)
   */
  startIntroSequence() {
    if (this.reducedMotion) {
      if (this.braidGroup) this.braidGroup.scale.set(1, 1, 1);
      return;
    }

    let startTime = performance.now();
    const duration = 2200; // 2.2 secondes pour une entrée souveraine

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing quintique doux
      const ease = 1 - Math.pow(1 - progress, 4);

      if (this.braidGroup) {
        const targetScale = this.isMobile ? 0.9 : 1.05;
        this.braidGroup.scale.setScalar(targetScale * ease);
        this.braidGroup.rotation.y = 0.3 + (1 - ease) * 1.5;
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }

  setupEvents() {
    // Mouvement souris fluide avec amorti (desktop uniquement)
    if (!this.isMobile && !this.reducedMotion) {
      window.addEventListener('mousemove', (e) => {
        const normX = (e.clientX / window.innerWidth) * 2 - 1;
        const normY = -(e.clientY / window.innerHeight) * 2 + 1;
        this.mouse.targetX = normX * 0.45;
        this.mouse.targetY = normY * 0.3;
      }, { passive: true });
    }

    // Gestion du scroll
    window.addEventListener('scroll', () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const heroHeight = this.container.clientHeight || window.innerHeight;
      this.scrollProgress = Math.min(scrollY / heroHeight, 1.5);
    }, { passive: true });

    // Redimensionnement
    window.addEventListener('resize', () => this.onResize(), { passive: true });

    // IntersectionObserver pour pause automatique de la boucle de rendu
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          this.isVisible = entry.isIntersecting;
        });
      }, { threshold: 0.05 });
      observer.observe(this.container);
    }
  }

  onResize() {
    if (!this.renderer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.isMobile = width < 768;

    this.camera.aspect = width / height;
    this.camera.position.z = this.isMobile ? 7.5 : 6.0;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    if (this.braidGroup) {
      this.braidGroup.position.x = this.isMobile ? 0 : 0.8;
    }
  }

  animate() {
    this.animId = requestAnimationFrame(() => this.animate());

    // Si le hero n'est plus visible à l'écran, on saute le rendu (économie GPU/CPU)
    if (!this.isVisible) return;

    const delta = this.clock ? this.clock.getDelta() : 0.016;
    const time = this.clock ? this.clock.getElapsedTime() : 0;

    // Amortissement du mouvement de la souris
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

    if (this.braidGroup) {
      // Flottement organique très lent
      const floatOffset = Math.sin(time * 0.8) * 0.08;
      const scrollTilt = this.scrollProgress * 1.2;

      this.braidGroup.position.y = (this.isMobile ? -0.1 : -0.2) + floatOffset - (this.scrollProgress * 1.5);
      
      // Rotation combinant temps lent, souris et scroll
      this.braidGroup.rotation.y = 0.3 + (time * 0.15) + this.mouse.x + (this.scrollProgress * 0.8);
      this.braidGroup.rotation.x = 0.15 + this.mouse.y + (this.scrollProgress * 0.3);
      this.braidGroup.rotation.z = Math.sin(time * 0.5) * 0.04;

      // Évolution du cadrage au scroll
      if (this.scrollProgress > 0.8) {
        const fade = Math.max(0, 1 - (this.scrollProgress - 0.8) * 2);
        this.braidGroup.scale.setScalar((this.isMobile ? 0.9 : 1.05) * fade);
      }
    }

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  enableFallback() {
    if (this.container) {
      this.container.classList.add('has-3d-fallback');
    }
  }

  destroy() {
    if (this.animId) cancelAnimationFrame(this.animId);
    if (this.renderer && this.renderer.domElement) {
      this.renderer.domElement.remove();
      this.renderer.dispose();
    }
  }
}

// Initialisation globale
window.NayaHero3D = NayaHero3D;
