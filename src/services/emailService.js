const sendEmail = async (formData) => {
    try {
      const response = await fetch("https://your-backend-api.com/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      return response.json();
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };
  
  export default sendEmail;
  