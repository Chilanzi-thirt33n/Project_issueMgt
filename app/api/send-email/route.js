// app/api/send-email/route.js
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    // Parse the request body
    const body = await req.json();
    const {
      to_name,
      issue,
      priority,
      assigned_to,
      reported_by,
      phase,
      area,
      section,
      contact_number,
      comment,
    } = body;

    // Nodemailer transport setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // Your Gmail App Password
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER, // Your email address
      to: "davidchilanzijilliamdark@gmail.com, abelukanga@gmail.com,nattybanny493@gmail.com,max@techvalleyzambia.com",
      subject: `New issue reported: ${issue}`,
      text: `
        Hello ${to_name},

        A new issue has been added to the defect logger dashboard:

        - ISSUE : ${issue}
        - PRIORITY : ${priority}
        - ASSIGNED TO : ${assigned_to}
        - REPORTED BY : ${reported_by}
        - CONTACTS : ${contact_number}
        - COMMENT : ${comment}
        - PHASE : ${phase}
        - AREA : ${area}
        - SECTION : ${section}

        Best regards,
        Your Techvalley Team
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Return success response
    return new Response(
      JSON.stringify({ message: "Email sent successfully!" }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Error sending email:", error);

    // Return error response
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
