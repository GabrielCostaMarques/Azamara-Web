import emailjs from "@emailjs/browser"

const SendMailContact = ( formData )=> {

    emailjs
        .send(
            "service_nnmi3fn",
            "template_9b4sxwc",
            formData,
            "YHIeqCykoTz5ANg9R"
        )
};

const SendMailBudget = ( formData )=> {
    emailjs.send(
        "service_env4ecd",
        "template_kjh9pus",
        formData,
        "UKMTk2rdYtNXzicbK"
    )
}

export {SendMailContact,SendMailBudget}

