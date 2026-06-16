# biofluid-blender-lab
My immersion cooling research lab.
# 🍃 Bio-Fluid Blender Laboratory
### An Interactive Simulator for Eco-Friendly Immersion Cooling Research

Welcome to my personal digital laboratory! This software was engineered to serve as a core analytical tool for my ongoing research into **plant-based, biodegradable fluids** for data center immersion cooling. 

By mapping the complex physical relationships of natural oils into a real-time web interface, this tool allows researchers to instantly simulate, blend, and analyze fluid properties before running real-world chemical trials.

---

## 🔬 The Research Context
As high-performance computing and AI clusters scale globally, traditional air-cooling methods are becoming inefficient and ecologically demanding. Submerging server components directly into non-conductive dielectric liquids (**Immersion Cooling**) offers a massive leap in thermal management. 

My research focuses on moving away from expensive, synthetic petroleum-based fluids and moving toward **Natural Esters and Plant-Based Oils** (like High-Oleic Soybean and Coconut derivatives). This tool calculates the delicate balance between:
1. **Kinematic Viscosity (Fluid Thickness):** Keeping the fluid light enough to glide effortlessly around circuits without straining circulation pumps.
2. **Flash Point (Thermal Safety Line):** Ensuring the ignition threshold remains high enough to guarantee absolute safety under volatile server workloads.

---

## 💻 Mathematical & Software Architecture

Instead of utilizing basic linear averages, the backend of this simulator implements true thermodynamic fluid principles:

* **Logarithmic Mixing (Arrhenius/Refitas Model):** Multi-component liquid viscosities naturally skew toward the lighter base molecule. The engine calculates this curve using:
  `ln(μ_blend) = (x1 * ln(μ1)) + (x2 * ln(μ2))`
* **Thermal Thinning Simulation:** Liquid thickness drops exponentially as operating temperatures rise. The algorithm models this thermal behavior across a scale of 20°C to 80°C.
* **Dynamic Data Arrays:** Built completely using vanilla **JavaScript**, **HTML5 Canvas**, and **Chart.js** to generate instantaneous property curves without server lag.

---

## 🛠️ How to Use the Lab
1. **Adjust the Blend Ratio:** Shift the slider to alter the ratio between the Heavy Plant Oil Base and the Light Natural Ester. Watch the logarithmic curve update instantly.
2. **Simulate Heat:** Change the temperature slider to witness how the fluid thins out under operational data center heat.
3. **Monitor Safety:** Keep an eye on the dynamic diagnostics panel to ensure your custom blend achieves optimal flow without compromising the thermal safety threshold.
