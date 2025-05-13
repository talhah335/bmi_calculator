window.onload = () => {
    document.getElementById("defaultOpen").click();

    document.querySelector("#metric-btn").addEventListener("click", () => calculateLBM("Metric"));
    document.querySelector("#imperial-btn").addEventListener("click", () => calculateLBM("Imperial"));
};

function convertToCm(inches) {
    return inches * 2.54;
}
function convertToKg(lbs) {
    return lbs * 0.4536;
}
function convertToLbs(kg) {
    return kg * 2.2046;
}

function calculateLBM(mode) {
    let height, weight, resultText, gender, ibw;

    // Get the result container
    resultText = document.querySelector("#result-text");
    gender = document.querySelector('input[name="gender"]:checked')?.value;

    if (mode === "Metric") {
        height = parseInt(document.querySelector("#metric-height").value);
        weight = parseInt(document.querySelector("#metric-weight").value);
    } else if (mode === "Imperial") {
        height = parseInt(document.querySelector("#imperial-height").value);
        weight = parseInt(document.querySelector("#imperial-weight").value);
    }

    // 1.52 meters = 5ft
    if (!height || isNaN(height)) {
        resultText.innerHTML = "Provide a valid Height!";
    } else if (!weight || isNaN(weight)) {
        resultText.innerHTML = "Provide a valid Weight!";
    } else if (!gender) {
        resultText.innerHTML = "Provide a valid Gender!";
    } else {
        let lbm, lbm_percent, bf_percent; 
        if (mode === "Metric") {
            if (gender === "male") {
                lbm = (0.407 * weight + 0.267 * height - 19.2);
            }
            if (gender === "female") {
                lbm = (0.252 * weight + 0.473 * height - 48.3);
            }
            lbm_percent = ((lbm / weight) * 100);
            bf_percent = (100 - lbm_percent).toFixed(1);
            resultText.innerHTML = `
            Lean Body Mass : <span>${lbm.toFixed(1)} kg</span><br>
            Body Fat Percentage : <span>${bf_percent}%</span>
            `;
        } else if (mode === "Imperial") {
            if (gender === "male") {
                lbm = (0.407 * convertToKg(weight) + 0.267 * convertToCm(height) - 19.2);
            }
            if (gender === "female") {
                lbm = (0.252 * convertToKg(weight) + 0.473 * convertToCm(height) - 48.3);
            }
            lbm_percent = ((lbm / convertToKg(weight)) * 100);
            bf_percent = (100 - lbm_percent).toFixed(1);
            resultText.innerHTML = `
            Lean Body Mass : <span>${convertToLbs(lbm).toFixed(1)} lbs</span><br>
            Body Fat Percentage : <span>${bf_percent}%</span>
            `;
        }
    }
}

function openMode(evt, unitMode) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(unitMode).style.display = "block";
    evt.currentTarget.className += " active";
}
