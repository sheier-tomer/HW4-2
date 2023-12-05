// table.js
$(document).ready(function () {

    
    var tabCounter = 0;

    function addTab(label, content) {
        // Increment the tab counter for unique tab IDs
        tabCounter++;

        // Create a new tab with a close button
        var tabTemplate = "<li><a href='#{id}'>#{label}</a><span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>";
        var tabId = "tabs-" + tabCounter;
        var li = $(tabTemplate.replace(/#\{id\}/g, tabId).replace(/#\{label\}/g, label));

        // Append the new tab to the tab list
        $("#tabs ul").append(li);

        // Append the table content to the tab container
        $("#tabs").append("<div id='" + tabId + "'>" + content + "</div>");

        // Refresh the tabs widget to update the UI
        $("#tabs").tabs("refresh");

        // Select the newly created tab
        $("#tabs").tabs("option", "active", -1);
    }

    // Initialize sliders
    $("#minColSlider, #maxColSlider, #minRowSlider, #maxRowSlider").slider({
        min: -50,
        max: 50,
        slide: function (event, ui) {
            // Update corresponding input field value dynamically
            $(this).siblings("input").val(ui.value);
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
    $("#tabs").tabs({
        activate: function (event, ui) {
        }
    });

    // Attach click event to the button
    $("#createTableBtn").click(function () {
        // Manually trigger form validation
        if ($("form").valid()) {
            // Submit the form to trigger validation
            $("form").submit();

            // Get values for tab label
            var minCol = $("#minCol").val();
            var maxCol = $("#maxCol").val();
            var minRow = $("#minRow").val();
            var maxRow = $("#maxRow").val();

            // Create content for the new tab
            var tableContent = $("#table-container").html();

            // Add a new tab with the label and content
            addTab("Table: " + minCol + "-" + maxCol + ", " + minRow + "-" + maxRow, tableContent);
        }
    });

    // Close icon: removing the tab on click
    $("#tabs").on("click", "span.ui-icon-close", function () {
        var panelId = $(this).closest("li").remove().attr("aria-controls");
        $("#" + panelId).remove();
        $("#tabs").tabs("refresh");
    });

    // Update table dynamically when text input values change
    $("form input[type='number']").on("input", function () {
        createTable();
    });
});


