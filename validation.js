// table.js
$(document).ready(function () {
    // Initialize sliders
    $("#minColSlider, #maxColSlider, #minRowSlider, #maxRowSlider").slider({
        min: -50,
        max: 50,
        slide: function (event, ui) {
            // Update corresponding input field value dynamically
            $(this).siblings("input").val(ui.value);
            createTable(); // Update table dynamically
        }
    });

    // Additional event handler for input fields
    $("form input[type='number']").on("input", function () {
        var inputValue = $(this).val();
        var sliderId = $(this).siblings(".slider-container").find("div").attr("id");
        $("#" + sliderId).slider("value", inputValue);
        createTable(); // Update table dynamically
    });

    $("form").validate({
        rules: {
            minRow: {
                required: true,
                number: true,
                range: [-50, 50]
            },
            maxRow: {
                required: true,
                number: true,
                range: [-50, 50]
            },
            minCol: {
                required: true,
                number: true,
                range: [-50, 50]
            },
            maxCol: {
                required: true,
                number: true,
                range: [-50, 50]
            }
        },
        messages: {
            minRow: {
                required: "Please enter a value for Minimum Row",
                number: "Please enter a valid number",
                range: "Value must be between -50 and 50"
            },
            maxRow: {
                required: "Please enter a value for Maximum Row",
                number: "Please enter a valid number",
                range: "Value must be between -50 and 50"
            },
            minCol: {
                required: "Please enter a value for Minimum Column",
                number: "Please enter a valid number",
                range: "Value must be between -50 and 50"
            },
            maxCol: {
                required: "Please enter a value for Maximum Column",
                number: "Please enter a valid number",
                range: "Value must be between -50 and 50"
            }
        },
        errorPlacement: function (error, element) {
            // Customize the placement of error messages
            error.insertAfter(element);
        },
        submitHandler: function (form) {
            // Validation passed, call createTable function
            console.log("Form is valid. Calling createTable...");
            createTable();
            return false; // Prevent form submission
        }
    });

    // Create tabs
    $("#tabs").tabs();

    // Attach click event to the button
    $("#createTableBtn").click(function () {
        // Manually trigger form validation
        if ($("form").valid()) {
            // Submit the form to trigger validation
            $("form").submit();
        }
    });

    // Update table dynamically when text input values change
    $("form input[type='number']").on("input", function () {
        createTable();
    });
});

