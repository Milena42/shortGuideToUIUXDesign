<script setup lang="ts">
import chroma from 'chroma-js';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { onMounted, onUnmounted, ref } from 'vue';

const props = defineProps<{
    colorSpace: 'oklab' | 'hsl';
    points?: { l: number; s: number; h: number }[];
    wireframe?: boolean;
    size?: number;
}>();

function cartesianFromPolar(r: number, deg: number): [x: number, y: number] {
    const rad = (deg * Math.PI) / 180;
    const x = r * Math.cos(rad);
    const y = r * Math.sin(rad);
    return [x, y];
}

const container = ref<HTMLDivElement | null>(null);
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let mesh: THREE.Mesh;
let controls;

const PIXELS = props.wireframe ? 5 : 200;

function makeModel() {
    const geometry = new THREE.BoxGeometry(1, 1, 1, PIXELS, PIXELS, PIXELS);
    const pos = geometry.getAttribute('position');
    const v = new THREE.Vector3();
    const colors: number[] = [];
    const hslPos: number[] = [];

    switch (props.colorSpace) {
        case 'oklab':
            for (let i = 0; i < pos.count; i++) {
                v.fromBufferAttribute(pos, i);
                const r = v.x + 0.5;
                const g = v.y + 0.5;
                const b = v.z + 0.5;
                colors.push(r, g, b);

                const [l, x, y] = chroma(r * 255, g * 255, b * 255, 'rgb').oklab();

                hslPos.push(x, l, -y);
            }
            break;
        case 'hsl':
            for (let i = 0; i < pos.count; i++) {
                v.fromBufferAttribute(pos, i);
                const r = v.x + 0.5;
                const g = v.y + 0.5;
                const b = v.z + 0.5;
                colors.push(r, g, b);

                const [h, s, l] = chroma(r * 255, g * 255, b * 255, 'rgb').hsl();

                const h1 = h ? h : 0;
                const s1 = s ? s : 0;
                const l1 = l ? l : 0;

                const [x, y] = cartesianFromPolar((s1 * (1 - Math.abs(1 - 2 * l1))) / 2, h1);
                const z = l1;
                hslPos.push(x, z, -y);
            }
            break;
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(hslPos, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    const material = new THREE.MeshBasicMaterial({
        vertexColors: true,
        side: THREE.DoubleSide,
        wireframe: props.wireframe,
    });

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
}

function animate() {
    renderer.render(scene, camera);
}

onMounted(() => {
    if (!container.value) return;

    scene = new THREE.Scene();
    scene.background = new THREE.Color('#ccc');
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.value.clientWidth, container.value.clientHeight);
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    container.value.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(
        30,
        container.value.clientWidth / container.value.clientHeight,
        0.1,
        100,
    );
    camera.position.set(1.5, 0.5, -1.5);
    camera.lookAt(0, 0.5, 0);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0.5, 0);
    controls.update();

    makeModel();

    plotPoints();

    renderer.setAnimationLoop(animate);
});

function plotPoints() {
    if (props.points !== undefined) {
        const coords: number[] = [];
        const colors: number[] = [];

        props.points.forEach(({ l, s, h }) => {
            const [x, y] = cartesianFromPolar(s, h);
            coords.push(x, l, -y);
            const [r, g, b] = chroma(l, s, h, 'oklch').rgb();
            colors.push(r / 255, g / 255, b / 255);
        });

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(coords, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        const material = new THREE.PointsMaterial({
            size: 20,
            vertexColors: true,
            sizeAttenuation: false,
        });
        const points = new THREE.Points(geometry, material);
        scene.add(points);
    }
}

const destroy = () => {
    if (renderer) {
        renderer.dispose();
    }
    if (container.value) {
        container.value.innerHTML = '';
    }
};
onUnmounted(destroy);
</script>

<template>
    <div
        ref="container"
        :style="{ height: `${props.size ?? 200}px`, width: `${props.size ?? 200}px` }"
    ></div>
</template>
