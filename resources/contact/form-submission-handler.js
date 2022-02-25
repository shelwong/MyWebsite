(function () {
    
    // Get all data from form and return object
    function getFormData(form){
        var elements = form.elements;
        var hooneypoot;

        var fields = Object.keys(elements).filter(function(x) {
            if(elements[x].name === "hooneypoot"){
                hooneypoot = elements[x].value;
                return false;
                }
            return true;
            }).map(function(x) {
                if(elements[x].name !== undefined){
                    return elements[x].name;
                } else if(elements[x].length > 0){      //For Edge HTML collection
                    return elements[x].item(0).name;
                }
            }).filter(function(item, pos, self){
                return self.indexOf(item) == pos && item;
            });

        var formData = {};
        fields.forEach(function(name){
            var element = elements[name];

            // singular form elements have one value
            formData[name] = element.value;

            //when element has multiple items
            if (element.length) {
                var data = [];
                for (var i = 0; i < element.length; i++){
                    var item = element.item(i);
                    if (item.checked || item.selected) {
                        data.push(item.value);
                    }
                }
            
            formData[name] = data.join(', ');
            }
        });

        // add form specific values
        formData.formDataNameOrder = JSON.stringify(fields);
        formData.formGoogleSheetName = form.dataset.sheet || "responses"; //default sheet name
        formData.formGoogleSendEmail = form.dataset.email || "";

        return {data: formData, hooneypoot: hooneypoot};
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        var form = event.target;
        var formData = getFormData(form);
        var data = formData.data;

        //If honeypot is filled, probably spam.
        if (formData.hooneypoot) {
            return false;
        }

        disableAllButtons(form);
        var url = form.action;
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                form.reset();
                var webform = form.querySelector(".webform");
                var cHeader = document.querySelector("#contact-header");
                if (webform) {
                    cHeader.style.display = "none";
                    webform.style.display = "none"; // hide form
                }
                var thanksMSG = form.querySelector(".thanks-msg");
                if (thanksMSG) {
                    thanksMSG.style.display = "block";
                }
            }
        };

        // url encode form data for sending as post data
        var encoded = Object.keys(data).map(function(x) {
            return encodeURIComponent(x) + "=" + encodeURIComponent(data[x]);
        }).join('&');
        xhr.send(encoded)
    }

    function loaded() {
        //bind to the submit event of form
        var forms= document.querySelectorAll("form.gform");
        for(var i=0; i < forms.length; i++){
            forms[i].addEventListener("submit", handleFormSubmit, false);
        }
    };

    document.addEventListener("DOMContentLoaded", loaded, false);

    function disableAllButtons(form){
        var buttons = form.querySelectorAll("button");
        for (var i=0; i < buttons.length; i++) {
            buttons[i].disabled = true;
        }
    };
})();