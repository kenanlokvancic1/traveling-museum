import nodemailer from "nodemailer";
import dotenv from "dotenv";
import logger from "../utils/logger.js";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendVerificationCode = async (to, code) => {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to,
    subject: "Your Verification Code",
    html: `<h2>Your code is: ${code}</h2><p>Enter it to verify your account.</p>`,
  };

  logger.debug("Sending verification code email", { to });
  try {
    await transporter.sendMail(mailOptions);
    logger.info("Verification code email sent", { to });
  } catch (error) {
    logger.error("Failed to send verification code email", {
      to,
      error: error.message,
    });
    throw error;
  }
};

export const sendPasswordResetEmail = async (to, resetLink) => {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to,
    subject: "Password Reset Request",
    html: `
      <p>You requested a password reset.</p>
      <p>Click <a href="${resetLink}">here</a> to reset your password. This link is valid for 1 hour.</p>
    `,
  };

  logger.debug("Sending password reset email", { to });
  try {
    await transporter.sendMail(mailOptions);
    logger.info("Password reset email sent", { to });
  } catch (error) {
    logger.error("Failed to send password reset email", {
      to,
      error: error.message,
    });
    throw error;
  }
};

const emailStyles = `
  <style>
    .email-container {
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f9f9f9;
      border-radius: 8px;
    }
    .header {
      background-color: #1a73e8;
      color: white;
      padding: 20px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .content {
      background-color: white;
      padding: 20px;
      border-radius: 0 0 8px 8px;
    }
    .button {
      background-color: #1a73e8;
      color: white;
      padding: 12px 24px;
      text-decoration: none;
      border-radius: 4px;
      display: inline-block;
      margin: 10px 0;
    }
    .footer {
      text-align: center;
      margin-top: 20px;
      color: #666;
      font-size: 12px;
    }
  </style>
`;

export const generateCuratorRequestEmail = (user, request) => {
  return `
    ${emailStyles}
    <div class="email-container">
      <div class="header">
        <h2>Curator Request Received</h2>
      </div>
      <div class="content">
        <p>Dear ${user.name},</p>
        <p>We have received your curator request. Our team will review your application and get back to you soon.</p>
        <h3>Request Details:</h3>
        <p><strong>Message:</strong> ${request.message}</p>
        <p><strong>CV:</strong> ${request.cv_url ? `<a href="${request.cv_url}">View CV</a>` : 'N/A'}</p>
        <p><strong>Additional Files:</strong> ${request.additional_files.length > 0 ? request.additional_files.join(", ") : "None"}</p>
      </div>
      <div class="footer">
        <p>This is an automated message, please do not reply.</p>
      </div>
    </div>
  `;
};

export const generateApprovalEmail = (user) => {
  return `
    ${emailStyles}
    <div class="email-container">
      <div class="header">
        <h2>Congratulations!</h2>
      </div>
      <div class="content">
        <p>Dear ${user.name},</p>
        <p>We are pleased to inform you that your curator request has been <strong>approved</strong>.</p>
        <p>You now have curator access to the system and can start managing exhibitions.</p>
        <a href="${process.env.FRONTEND_URL}/login" class="button">Login to get started</a>
      </div>
      <div class="footer">
        <p>Welcome to our curator team!</p>
      </div>
    </div>
  `;
};

export const sendCuratorRequestEmail = async (user, request) => {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: user.email,
    subject: "Curator Request Received",
    html: `
      ${emailStyles}
      <div class="email-container">
        <div class="header">
          <h2>Curator Request Received</h2>
        </div>
        <div class="content">
          <p>Dear ${user.name},</p>
          <p>We have received your curator request. Our team will review your application and get back to you soon.</p>
          <h3>Request Details:</h3>
          <p><strong>Message:</strong> ${request.message}</p>
          <p><strong>CV:</strong> ${request.cv_url ? `<a href="${request.cv_url}" class="button">View CV</a>` : 'N/A'}</p>
          <p><strong>Additional Files:</strong> ${request.additional_files?.length > 0 ? request.additional_files.join(", ") : "None"}</p>
        </div>
        <div class="footer">
          <p>This is an automated message, please do not reply.</p>
        </div>
      </div>
    `
  };

  logger.debug("Sending curator request confirmation email", { to: user.email });
  try {
    await transporter.sendMail(mailOptions);
    logger.info("Curator request confirmation email sent", { to: user.email });
  } catch (error) {
    logger.error("Failed to send curator request email", { 
      to: user.email, 
      error: error.message 
    });
    throw error;
  }
};

export const sendCuratorApprovalEmail = async (user, status) => {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: user.email,
    subject: `Curator Request ${status.charAt(0).toUpperCase() + status.slice(1)}`,
    html: `
      ${emailStyles}
      <div class="email-container">
        <div class="header">
          <h2>${status === 'approved' ? 'Congratulations!' : 'Curator Request Update'}</h2>
        </div>
        <div class="content">
          <p>Dear ${user.name},</p>
          ${status === 'approved' ? `
            <p>We are pleased to inform you that your curator request has been <strong>approved</strong>.</p>
            <p>You now have curator access to the system and can start managing exhibitions.</p>
            <a href="${process.env.FRONTEND_URL}/login" class="button">Login to get started</a>
          ` : `
            <p>We regret to inform you that your curator request has been <strong>rejected</strong>.</p>
            <p>Feel free to apply again in the future with updated credentials.</p>
          `}
        </div>
        <div class="footer">
          <p>${status === 'approved' ? 'Welcome to our curator team!' : 'Thank you for your interest.'}</p>
        </div>
      </div>
    `
  };

  logger.debug("Sending curator status update email", { to: user.email, status });
  try {
    await transporter.sendMail(mailOptions);
    logger.info("Curator status update email sent", { to: user.email, status });
  } catch (error) {
    logger.error("Failed to send curator status update email", { 
      to: user.email, 
      status,
      error: error.message 
    });
    throw error;
  }
};

export const sendAdminNotificationEmail = async (admin, request) => {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: admin.email,
    subject: "New Curator Request Assigned",
    html: `
      ${emailStyles}
      <div class="email-container">
        <div class="header">
          <h2>New Curator Request Assigned</h2>
        </div>
        <div class="content">
          <p>Dear ${admin.name},</p>
          <p>A new curator request has been assigned to you for review.</p>
          <p><strong>Applicant:</strong> ${request.user_id}</p>
          <p><strong>Message:</strong> ${request.message}</p>
          <a href="${process.env.FRONTEND_URL}/curator-requests/${request.curator_request_id}" class="button">Review Request</a>
        </div>
        <div class="footer">
          <p>Please review this request at your earliest convenience.</p>
        </div>
      </div>
    `
  };

  logger.debug("Sending admin notification email", { to: admin.email });
  try {
    await transporter.sendMail(mailOptions);
    logger.info("Admin notification email sent", { to: admin.email });
  } catch (error) {
    logger.error("Failed to send admin notification email", { 
      to: admin.email, 
      error: error.message 
    });
    throw error;
  }
};
