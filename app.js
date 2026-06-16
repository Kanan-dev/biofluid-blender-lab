// ==========================================
// 1. CHOOSE CONSTANTS FOR OUR BASE OILS
// ==========================================
const BASE1 = {
    name: "Heavy Plant Oil",
    viscosityAt40: 33.0,
    flashPoint: 300
};

const BASE2 = {
    name: "Light Natural Ester",
    viscosityAt40: 5.0,
    flashPoint: 170
};

// ==========================================
// 2. CAPTURE DOM ELEMENTS FROM HTML
// ==========================================
const blendSlider = document.getElementById('blendRatio');
const tempSlider = document.getElementById('temperature');

const ratioValueText = document.getElementById('ratioValue');
const tempValueText = document.getElementById('tempValue');

const viscosityResult = document.getElementById('viscosityResult');
const flashResult = document.getElementById('flashResult');
const safetyStatus = document.getElementById('safetyStatus');
const statusText = document.getElementById('statusText');

// ==========================================
// 3. INITIALIZE THE LIVE CHART (Chart.js)
// ==========================================
const ctx = document.getElementById('propertyChart').getContext('2d');
let propertyChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [], // Will fill with percentages (0% to 100%)
        datasets: [{
            label: 'Viscosity Curve (cSt)',
            data: [], // Will fill with calculated blend thickness points
            borderColor: '#52b788',
            backgroundColor: 'rgba(82, 183, 136, 0.1)',
            borderWidth: 3,
            tension: 0.4, // Makes the line smooth and curvy
            pointRadius: 0,
            pointHoverRadius: 6
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false } // Hides generic legend to keep it clean
        },
        scales: {
            x: {
                grid: { display: false },
                title: { display: true, text: '% Heavy Oil in Mixture', color: '#718096', font: { size: 10 } }
            },
            y: {
                beginAtZero: true,
                title: { display: true, text: 'Viscosity (cSt)', color: '#718096', font: { size: 10 } }
            }
        }
    }
});

// ==========================================
// 4. THE MATHEMATICAL ENGINE
// ==========================================
function calculateFluidProperties() {
    const p1 = parseFloat(blendSlider.value) / 100;
    const p2 = 1 - p1;
    const currentTemp = parseFloat(tempSlider.value);

    // Update text readouts
    ratioValueText.innerText = blendSlider.value;
    tempValueText.innerText = tempSlider.value;

    // --- MATH 1: Viscosity & Temperature Calculations ---
    const lnVBlend40 = (p1 * Math.log(BASE1.viscosityAt40)) + (p2 * Math.log(BASE2.viscosityAt40));
    let finalViscosity = Math.exp(lnVBlend40);
    
    const tempDifference = currentTemp - 40;
    finalViscosity = finalViscosity * Math.exp(-0.022 * tempDifference);

    // --- MATH 2: Flash Point Estimation ---
    const blendedFlash = (p1 * BASE1.flashPoint) + (p2 * BASE2.flashPoint) - (p1 * p2 * 15);

    // Update numbers on screen
    viscosityResult.innerText = finalViscosity.toFixed(2);
    flashResult.innerText = Math.round(blendedFlash);

    // --- MATH 3: Generate Curve Points for the Chart ---
    const chartLabels = [];
    const chartData = [];
    
    // Loop from 0% to 100% to calculate the entire path of the liquid behavior
    for (let i = 0; i <= 100; i += 10) {
        const ratio1 = i / 100;
        const ratio2 = 1 - ratio1;
        
        const lnV = (ratio1 * Math.log(BASE1.viscosityAt40)) + (ratio2 * Math.log(BASE2.viscosityAt40));
        let vAtTemp = Math.exp(lnV) * Math.exp(-0.022 * tempDifference);
        
        chartLabels.push(i + "%");
        chartData.push(vAtTemp.toFixed(2));
    }

    // Push new data points into the chart and trigger an instant redraw
    propertyChart.data.labels = chartLabels;
    propertyChart.data.datasets[0].data = chartData;
    propertyChart.update();

    // ==========================================
    // 5. EVALUATE SYSTEM SAFETY RATINGS
    // ==========================================
    if (finalViscosity < 15.0 && blendedFlash > 180) {
        statusText.innerText = "Excellent - High Flow & Secure Thermal Safety!";
        safetyStatus.style.backgroundColor = "#d8f3dc";
        safetyStatus.style.color = "#1b4332";
    } else if (finalViscosity >= 15.0 && blendedFlash > 180) {
        statusText.innerText = "Caution - Fluid is a bit too thick. Heavy strain on pumps.";
        safetyStatus.style.backgroundColor = "#fefae0";
        safetyStatus.style.color = "#606c38";
    } else {
        statusText.innerText = "Warning - Flash point drops too low for continuous high heat!";
        safetyStatus.style.backgroundColor = "#f8d7da";
        safetyStatus.style.color = "#721c24";
    }
}

// ==========================================
// 6. EVENT LISTENERS
// ==========================================
blendSlider.addEventListener('input', calculateFluidProperties);
tempSlider.addEventListener('input', calculateFluidProperties);

// Run on startup
calculateFluidProperties();