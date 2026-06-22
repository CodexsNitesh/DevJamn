// // src/services/email.services.ts

// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export const sendOTPEmail = async (
//   email: string,
//   otp: string
// ) => {
//   try {
//     const { data, error } = await resend.emails.send({
//       from:
//         process.env.EMAIL_FROM ||
//         "onboarding@resend.dev",
//       to: email,
//       subject: "Your Verification Code",
//       html: `
//         <div style="font-family: Arial, sans-serif; padding: 20px;">
//           <h2>Email Verification</h2>

//           <p>Your OTP code is:</p>

//           <h1 style="
//             letter-spacing: 5px;
//             color: #2563eb;
//           ">
//             ${otp}
//           </h1>

//           <p>
//             This code will expire in
//             <strong>2 minutes</strong>.
//           </p>

//           <p>
//             If you didn't request this code,
//             please ignore this email.
//           </p>
//         </div>
//       `,
//     });

//     if (error) {
//       console.error(error);
//       throw new Error("Failed to send email");
//     }

//     return data;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };




// src/services/email.services.ts

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOTPEmail = async (
  email: string,
  otp: string
) => {
  try {
    const info = await transporter.sendMail({
      from: `"Dev Collab Hub" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code",
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Verify Your Email</h2>

          <p>Your OTP code is:</p>

          <h1 style="letter-spacing: 5px;">
            ${otp}
          </h1>

          <p>
            This OTP is valid for 2 minutes.
          </p>

          <p>
            If you didn't request this OTP,
            please ignore this email.
          </p>
        </div>
      `,
    });

    console.log(
      "Email sent successfully:",
      info.messageId
    );

    return info;
  } catch (error) {
    console.error(
      "Failed to send email:",
      error
    );

    throw new Error("Failed to send email");
  }
};