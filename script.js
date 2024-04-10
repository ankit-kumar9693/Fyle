function validateInputs() {
    var age = document.getElementById('age').value;
    var income = parseFloat(document.getElementById('income').value);
    var extraIncome = parseFloat(document.getElementById('extra-income').value) || 0;
    var deductions = parseFloat(document.getElementById('deductions').value) || 0;

    var valid = true;

    if (!age) {
        valid = false;
        document.getElementById('age-error-icon').style.display = 'inline-block';
    } else {
        document.getElementById('age-error-icon').style.display = 'none';
    }

    if (isNaN(income)) {
        valid = false;
        document.getElementById('income-error-icon').style.display = 'inline-block';
    } else {
        document.getElementById('income-error-icon').style.display = 'none';
    }

    if (isNaN(extraIncome)) {
        valid = false;
        document.getElementById('extra-income-error-icon').style.display = 'inline-block';
    } else {
        document.getElementById('extra-income-error-icon').style.display = 'none';
    }

    if (isNaN(deductions)) {
        valid = false;
        document.getElementById('deductions-error-icon').style.display = 'inline-block';
    } else {
        document.getElementById('deductions-error-icon').style.display = 'none';
    }

    if (valid) {
        calculateTax(age, income, extraIncome, deductions);
    }
}

function calculateTax(age, income, extraIncome, deductions) {
    var tax = 0;
    var taxThreshold = 800000; 

    if (income + extraIncome - deductions > taxThreshold) {
        var taxableIncome = income + extraIncome - deductions - taxThreshold;
        if (age === "<40") {
            tax = taxableIncome * 0.3;
        } else if (age === "40-60") {
            tax = taxableIncome * 0.4;
        } else if (age === "≥60") {
            tax = taxableIncome * 0.1;
        }
    }

    var resultElement = document.getElementById('result');
    resultElement.innerHTML = `
        <p><strong>Your estimated tax amount is:</strong> ₹${tax.toFixed(2)} Lakhs</p>
        <p>(Tax calculated on income over 8 Lakhs)</p>
    `;

    document.getElementById('modal').style.display = 'block';
}

// Close the modal when clicking on the close button
document.getElementsByClassName('close')[0].addEventListener('click', function() {
    document.getElementById('modal').style.display = 'none';
});

// Close the modal when clicking outside of it
window.addEventListener('click', function(event) {
    var modal = document.getElementById('modal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});