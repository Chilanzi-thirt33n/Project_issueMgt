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
      to: "davidchilanzijilliamdark@gmail.com, example2@example.com",
      subject: `New issue reported: ${issue}`,
      text: `
        Hello ${to_name},

        A new issue has been added to the defect logger dashboard:

        - **Issue**: ${issue}
        - **Priority**: ${priority}
        - **Assigned To**: ${assigned_to}
        - **Reported By**: ${reported_by}
        - **Contact Number**: ${contact_number}
        - **Comments**: ${comment}

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
