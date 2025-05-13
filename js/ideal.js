window.onload = () => {
    document.getElementById("defaultOpen").click();

    document.querySelector("#metric-btn").addEventListener("click", () => calculateBMIRange("Metric"));
    document.querySelector("#imperial-btn").addEventListener("click", () => calculateBMIRange("Imperial"));
};

function convertToInches(height) {
    return height * 0.3937;
}
function convertToKg(lbs) {
    return lbs * 0.4536;
}
function convertToLbs(kg) {
    return kg * 2.2046;
}

// returns body weight in kg, with height in inches
function calculateIBW(height, gender) {
    if (gender === "male") {
        return 50 + 2.3 * (height - 60);
    } else if (gender === "female") {
        return 45.5 + 2.3 * (height - 60);
    }
}

function calculateBMIRange(mode) {
    let height, resultText, gender, ibw;

    // Get the result container
    resultText = document.querySelector("#result-text");
    gender = document.querySelector('input[name="gender"]:checked')?.value;

    if (mode === "Metric") {
        height = convertToInches(parseInt(document.querySelector("#metric-height").value));
    } else if (mode === "Imperial") {
        height = parseInt(document.querySelector("#imperial-height").value);
    }

    // 1.52 meters = 5ft
    if (!height || isNaN(height)) {
        resultText.innerHTML = "Provide a valid Height!";
    } else if (height < 60) {
        if (mode === "Metric") {
            resultText.innerHTML = "Height should be greater than 1.52m!";
        } else if (mode === "Imperial") {
            resultText.innerHTML = "Height should be greater than 5ft!";
        }
    } else if (!gender) {
        resultText.innerHTML = "Provide a valid Gender!";
    } else {
        let bmi_lower, bmi_upper; 
        if (mode === "Metric") {
            ibw = calculateIBW(height, gender).toFixed(1);
            bmi_lower = convertToKg((18.5 * (height * height)) / 703).toFixed(1);
            bmi_upper = convertToKg((25 * (height * height)) / 703).toFixed(1);
            resultText.innerHTML = `
            Ideal Body Weight : <span>${ibw} kg</span><br>
            Healthy BMI Range : <span>${bmi_lower} - ${bmi_upper} kg</span>
            `;
        } else if (mode === "Imperial") {
            ibw = convertToLbs(calculateIBW(height,gender)).toFixed(1);
            bmi_lower = ((18.5 * (height * height)) / 703).toFixed(1);
            bmi_upper = ((25 * (height * height)) / 703).toFixed(1);
            resultText.innerHTML = `
            Ideal Body Weight : <span>${ibw} lbs</span><br>
            Healthy BMI Range : <span>${bmi_lower} - ${bmi_upper} lbs</span>
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