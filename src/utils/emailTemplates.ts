// utils/emailTemplates.ts
export const generateOTPEmailTemplate = (otp: string, name: string) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      font-family: Arial, sans-serif;
    }
    .header {
      background-color: #f8f9fa;
      padding: 20px;
      text-align: center;
      border-radius: 5px;
    }
    .otp-box {
      background-color: #ffffff;
      border: 2px solid #dee2e6;
      border-radius: 5px;
      padding: 20px;
      margin: 20px 0;
      text-align: center;
    }
    .otp-code {
      font-size: 32px;
      font-weight: bold;
      color: #0066cc;
      letter-spacing: 5px;
    }
    .footer {
      text-align: center;
      color: #6c757d;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Verify Your Email</h2>
    </div>
    <p>Hello ${name},</p>
    <p>Your verification code is:</p>
    <div class="otp-box">
      <div class="otp-code">${otp}</div>
    </div>
    <p>This code will expire in 10 minutes.</p>
    <p>If you didn't request this code, please ignore this email.</p>
    <div class="footer">
      <p>This is an automated message, please do not reply.</p>
    </div>
  </div>
</body>
</html>
`;
