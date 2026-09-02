import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

// floor
const floorAlphaTexture = textureLoader.load('./floor/alpha.jpg')
const floorColorTexture = textureLoader.load('./floor/rocky_terrain_03_1k/rocky_terrain_03_diff_1k.png')
const floorARMTexture = textureLoader.load('./floor/rocky_terrain_03_1k/rocky_terrain_03_arm_1k.png')
const floorNormalTexture = textureLoader.load('./floor/rocky_terrain_03_1k/rocky_terrain_03_nor_gl_1k.png')
const floorDisplacementTexture = textureLoader.load('./floor/rocky_terrain_03_1k/rocky_terrain_03_disp_1k.png')

floorColorTexture.colorSpace = THREE.SRGBColorSpace

floorColorTexture.repeat.set(2, 2)
floorARMTexture.repeat.set(2, 2)
floorNormalTexture.repeat.set(2, 2)
floorDisplacementTexture.repeat.set(2, 2)

floorColorTexture.wrapS = THREE.RepeatWrapping
floorARMTexture.wrapS = THREE.RepeatWrapping
floorNormalTexture.wrapS = THREE.RepeatWrapping
floorDisplacementTexture.wrapS = THREE.RepeatWrapping

floorColorTexture.wrapT = THREE.RepeatWrapping
floorARMTexture.wrapT = THREE.RepeatWrapping
floorNormalTexture.wrapT = THREE.RepeatWrapping
floorDisplacementTexture.wrapT = THREE.RepeatWrapping

// Walls
const wallColorTexture = textureLoader.load('./wall/mossy_brick_1k/mossy_brick_diff_1k.png')
const wallARMTexture = textureLoader.load('./wall/mossy_brick_1k/mossy_brick_arm_1k.png')
const wallNormalTexture = textureLoader.load('./wall/mossy_brick_1k/mossy_brick_nor_gl_1k.png')
const wallDisplacementTexture = textureLoader.load('./wall/mossy_brick_1k/mossy_brick_disp_1k.png')

wallColorTexture.colorSpace = THREE.SRGBColorSpace

// Roof
const roofColorTexture = textureLoader.load('./roof/roof_tiles_14_1k/roof_tiles_14_diff_1k.png')
const roofARMTexture = textureLoader.load('./roof/roof_tiles_14_1k/roof_tiles_14_arm_1k.png')
const roofNormalTexture = textureLoader.load('./roof/roof_tiles_14_1k/roof_tiles_14_nor_gl_1k.png')
const roofBumpTexture = textureLoader.load('./roof/roof_tiles_14_1k/roof_tiles_14_bump_1k.png')

roofColorTexture.colorSpace = THREE.SRGBColorSpace
roofARMTexture.colorSpace = THREE.NoColorSpace
roofNormalTexture.colorSpace = THREE.NoColorSpace
roofBumpTexture.colorSpace = THREE.NoColorSpace

roofColorTexture.repeat.set(2, 1)
roofARMTexture.repeat.set(2, 1)
roofNormalTexture.repeat.set(2, 1)
roofBumpTexture.repeat.set(2, 1)

roofColorTexture.wrapS = THREE.RepeatWrapping
roofARMTexture.wrapS = THREE.RepeatWrapping
roofNormalTexture.wrapS = THREE.RepeatWrapping
roofBumpTexture.wrapS = THREE.RepeatWrapping

roofColorTexture.wrapT = THREE.RepeatWrapping
roofARMTexture.wrapT = THREE.RepeatWrapping
roofNormalTexture.wrapT = THREE.RepeatWrapping
roofBumpTexture.wrapT = THREE.RepeatWrapping

// bushes
const bushColorTexture = textureLoader.load('./bush/forest_leaves_02_1k/forest_leaves_02_diffuse_1k.png')
const bushARMTexture = textureLoader.load('./bush/forest_leaves_02_1k/forest_leaves_02_arm_1k.png')
const bushNormalTexture = textureLoader.load('./bush/forest_leaves_02_1k/forest_leaves_02_nor_gl_1k.png')

bushColorTexture.colorSpace = THREE.SRGBColorSpace

bushColorTexture.repeat.set(2, 1)
bushARMTexture.repeat.set(2, 1)
bushNormalTexture.repeat.set(2, 1)

bushColorTexture.wrapS = THREE.RepeatWrapping
bushARMTexture.wrapS = THREE.RepeatWrapping
bushNormalTexture.wrapS = THREE.RepeatWrapping

// Graves
const graveColorTexture = textureLoader.load('./grave/quarry_wall_02_1k/quarry_wall_02_diff_1k.png')
const graveARMTexture = textureLoader.load('./grave/quarry_wall_02_1k/quarry_wall_02_arm_1k.png')
const graveNormalTexture = textureLoader.load('./grave/quarry_wall_02_1k/quarry_wall_02_nor_gl_1k.png')

graveColorTexture.colorSpace = THREE.SRGBColorSpace
graveColorTexture.repeat.set(0.3, 0.4)
graveARMTexture.repeat.set(0.3, 0.4)
graveNormalTexture.repeat.set(0.3, 0.4)

// Door
const doorColorTexture = textureLoader.load('./door/color.jpg')
const doorAlphaTexture = textureLoader.load('./door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('./door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('./door/height.jpg')
const doorNormalTexture = textureLoader.load('./door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('./door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('./door/roughness.jpg')

doorColorTexture.colorSpace = THREE.SRGBColorSpace

/**
 * House
 */

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20, 100, 100),
    new THREE.MeshStandardMaterial({
        alphaMap: floorAlphaTexture,
        transparent: true,
        map: floorColorTexture,
        aoMap: floorARMTexture,
        roughnessMap: floorARMTexture,
        metalnessMap: floorARMTexture,
        normalMap: floorNormalTexture,
        displacementMap: floorDisplacementTexture,
        displacementScale: 0.7,
        displacementBias: -0.2
    })
)
floor.rotation.x = - Math.PI * 0.5
scene.add(floor);

// gui.add(floor.material, 'displacementScale').min(0).max(1).step(0.001).name('floorDisplacementScale')
// gui.add(floor.material, 'displacementBias').min(-1).max(1).step(0.001).name('floorDisplacementBias')

// House
const house = new THREE.Group()
scene.add(house)

// Walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4, 50, 50, 50),
    new THREE.MeshStandardMaterial({
        map: wallColorTexture,
        aoMap: wallARMTexture,
        roughnessMap: wallARMTexture,
        metalnessMap: wallARMTexture,
        normalMap: wallNormalTexture,
        displacementMap: wallDisplacementTexture,
        displacementScale: 0.094,
        displacementBias: -0.08
    })
)
house.position.y = 1.25
house.add(walls)

// gui.add(walls.material, 'displacementScale').min(0).max(1).step(0.001).name('wallsDisplacementScale')
// gui.add(walls.material, 'displacementBias').min(-1).max(1).step(0.001).name('wallsDisplacementBias')

// Roof
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1.5, 4, 100, 100),
    new THREE.MeshStandardMaterial({
        map: roofColorTexture,
        aoMap: roofARMTexture,
        roughnessMap: roofARMTexture,
        metalnessMap: roofARMTexture,
        normalMap: roofNormalTexture,
        normalScale: new THREE.Vector2(1, 1),
        displacementMap: roofBumpTexture,
        displacementScale: 0.2,
    })
)
roof.position.y = 1.7
roof.rotation.y = Math.PI / 4
house.add(roof)

// Door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
    new THREE.MeshStandardMaterial({
        color: '#f00404',
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        roughnessMap: doorRoughnessTexture,
        metalnessMap: doorMetalnessTexture,
        normalMap: doorNormalTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.15,
        displacementBias: -0.04
    })
)
door.position.y = -0.2
door.position.z = 2 + 0.01
house.add(door);

// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({
    color: '#ccffcc',
    map: bushColorTexture,
    aoMap: bushARMTexture,
    roughnessMap: bushARMTexture,
    metalnessMap: bushARMTexture,
    normalMap: bushNormalTexture,
})

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.setScalar(0.5);
bush1.position.set(0.8, -1, 2);
bush1.rotation.x = - 0.75

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.setScalar(0.4);
bush2.position.set(-1, -1.1, 2);
bush2.rotation.x = - 0.75

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.setScalar(0.15);
bush3.position.set(-1.2, -1.2, 2.4)

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.setScalar(0.3);
bush4.position.set(1.4, -1.1, 2);
bush4.rotation.x = - 0.75

house.add(bush1, bush2, bush3, bush4)

// Graves
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({
    map: graveColorTexture,
    aoMap: graveARMTexture,
    roughnessMap: graveARMTexture,
    metalnessMap: graveARMTexture,
    normalMap: graveNormalTexture,
})

const graves = new THREE.Group()
scene.add(graves);

for (let i = 0; i < 30; i++) {
    const angle = Math.random() * Math.PI * 2
    const radius = 3 + Math.random() * 4
    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius
    const grave = new THREE.Mesh(graveGeometry, graveMaterial)
    grave.position.x = x;
    grave.position.y = Math.random() * 0.4;
    grave.position.z = z;
    grave.rotation.x = (Math.random() - 0.5) * 0.4
    grave.rotation.y = (Math.random() - 0.5) * 0.4
    grave.rotation.z = (Math.random() - 0.5) * 0.4
    graves.add(grave)
}

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#86cdff', 0.275)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#86cdff', 1)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

// Point Light
const doorLight = new THREE.PointLight("#ff7d46", 10)
doorLight.position.set(0, 1.1, 2.2)
house.add(doorLight)

// Ghosts
const ghost1 = new THREE.PointLight('#8800ff', 6)
const ghost2 = new THREE.PointLight('#ff0088', 6)
const ghost3 = new THREE.PointLight('#ff0000', 6)
scene.add(ghost1, ghost2, ghost3)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Shadows
 */
// Renderer
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// cast and receive
directionalLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

walls.castShadow = true
walls.receiveShadow = true
roof.castShadow = true
floor.receiveShadow = true

for (const grave of graves.children) {
    grave.castShadow = true
    grave.receiveShadow = true
}

// Mapping
directionalLight.shadow.mapSize.width = 256
directionalLight.shadow.mapSize.height = 256
directionalLight.shadow.camera.top = 8
directionalLight.shadow.camera.right = 8
directionalLight.shadow.camera.bottom = -8
directionalLight.shadow.camera.left = -8
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 20

/**
 * Animate
 */
const timer = new Timer()

const tick = () =>
{
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    // Ghost
    const ghost1Angle = elapsedTime * 0.5
    ghost1.position.x = Math.sin(ghost1Angle) * 4
    ghost1.position.z = Math.cos(ghost1Angle) * 4
    ghost1.position.y = Math.sin(ghost1Angle) * Math.sin(ghost1Angle * 2.34) * Math.sin(ghost1Angle * 3.45)

    const ghost2Angle = - elapsedTime * 0.38
    ghost2.position.x = Math.sin(ghost2Angle) * 5
    ghost2.position.z = Math.cos(ghost2Angle) * 5
    ghost2.position.y = Math.sin(ghost2Angle) * Math.sin(ghost2Angle * 2.34) * Math.sin(ghost2Angle * 3.45)

    const ghost3Angle = elapsedTime * 0.23
    ghost3.position.x = Math.sin(ghost3Angle) * 6
    ghost3.position.z = Math.cos(ghost3Angle) * 6
    ghost3.position.y = Math.sin(ghost3Angle) * Math.sin(ghost3Angle * 2.34) * Math.sin(ghost3Angle * 3.45)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()