exports.courseEnrollmentEmail = (name) => {
    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Course Registration Confirmation</title>
        <style>
            body {
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #333333;
                margin: 0;
                padding: 0;
            }
    
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }
    
            .message {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px; 
            }
            
    
            .body {
                font-size: 16px;
                margin-bottom: 20px;
            }
    
            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }
    
            .highlight {
                font-weight: bold;
            }

            .success{
                color: #33CC99;
                font-weight:bold;
            }

        </style>
    
    </head>
    
    <body>
        <div class="container">
            <div class="message">Course Registration Confirmation</div>
            <div class="body">
                <p>Dear ${name},</p>
                <p>You have <span class="success">successfully registered</span> for the <span class="highlight">Troubleshoot</span> Coding Contest . We
                    are excited to have you as a participant!</p>
                <p>Please check your mail && whatsapp for Further updates...
                </p>
            </div>
            <div class="support">If you have any questions or need assistance, please feel free to reach out to us at <br><br>
            A.KARTHIK - 7382746151<br>
            K.SRIRAM - 6302317026<br>
            P.DIVYA - 6303201466<br>
            P.PAVANI - 9014771530<br>
            We are here to help!</div>
        </div>
    </body>
    
    </html>`;
  };
  