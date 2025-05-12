window.onload = () => {
    document.getElementById("defaultOpen").click();

    document.querySelector("#metric-btn").addEventListener("click", () => calculateBMI("Metric"));
    document.querySelector("#imperial-btn").addEventListener("click", () => calculateBMI("Imperial"));
};

function calculateBMI(mode) {
    let height, weight, resultText;

    // Get the result container
    resultText = document.querySelector("#result-text");

    if (mode === "Metric") {
        height = parseInt(document.querySelector("#metric-height").value);
        weight = parseInt(document.querySelector("#metric-weight").value);
    } else if (mode === "Imperial") {
        height = parseInt(document.querySelector("#imperial-height").value);
        weight = parseInt(document.querySelector("#imperial-weight").value);
    }

    if (!height || isNaN(height)) {
        resultText.innerHTML = "Provide a valid Height!";
    } else if (!weight || isNaN(weight)) {
        resultText.innerHTML = "Provide a valid Weight!";
    } else {
        let bmi;
        if (mode === "Metric") {
            bmi = (weight / ((height * height) / 10000)).toFixed(2);
        } else if (mode === "Imperial") {
            bmi = ((weight / (height * height)) * 703).toFixed(2);
        }

        if (bmi < 18.5) {
            resultText.innerHTML = `Under Weight : <span>${bmi}</span>`;
        } else if (bmi >= 18.5 && bmi < 25) {
            resultText.innerHTML = `Normal Weight : <span>${bmi}</span>`;
        } else {
            resultText.innerHTML = `Over Weight : <span>${bmi}</span>`;
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