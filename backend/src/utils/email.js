require('dotenv').config();
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send a 6-digit OTP to the user's email address.
 * @param {string} to   - Recipient email
 * @param {string} otp  - 6-digit OTP string
 */
const sendOtpEmail = async (to, otp) => {
    const { data, error } = await resend.emails.send({
        from: 'CodeNavigator <onboarding@resend.dev>',
        to,
        subject: 'Password Reset OTP',
        text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
        html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 480px; margin: 0 auto; background: #f8fafc; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0;">
            <!-- Header -->
            <div style="background: #012c4e; padding: 28px 32px; text-align: center;">
                <span style="color: #ead292; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">Code</span><span style="color: #ffffff; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">Navigator</span>
            </div>

            <!-- Body -->
            <div style="padding: 32px;">
                <h2 style="color: #012c4e; margin: 0 0 8px; font-size: 20px;">Password Reset Request</h2>
                <p style="color: #64748b; font-size: 14px; margin: 0 0 24px;">
                    Your OTP is <strong>${otp}</strong>. It is valid for <strong>5 minutes</strong>.
                </p>

                <!-- OTP Box -->
                <div style="background: #012c4e; border-radius: 10px; padding: 20px; text-align: center; margin-bottom: 24px;">
                    <p style="color: #ead292; font-size: 13px; margin: 0 0 8px; letter-spacing: 0.5px; text-transform: uppercase;">Your One-Time Password</p>
                    <span style="color: #ffffff; font-size: 36px; font-weight: 800; letter-spacing: 10px;">${otp}</span>
                </div>

                <p style="color: #94a3b8; font-size: 12px; margin: 0; text-align: center;">
                    If you didn't request this, you can safely ignore this email.<br/>
                    Do not share this OTP with anyone.
                </p>
            </div>

            <!-- Footer -->
            <div style="background: #f1f5f9; padding: 16px 32px; text-align: center; border-top: 1px solid #e2e8f0;">
                <p style="color: #94a3b8; font-size: 12px; margin: 0;">© 2025 CodeNavigator. All rights reserved.</p>
            </div>
        </div>
        `,
    });

    if (error) {
        console.error('Resend error:', error);
        throw new Error(error.message);
    }

    console.log('Email sent successfully. ID:', data?.id);
};

module.exports = { sendOtpEmail };
