// const nodemailer = require('nodemailer');

// const createTransporter = () =>
//   nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: parseInt(process.env.EMAIL_PORT),
//     secure: process.env.EMAIL_PORT === '465',
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

// const emailTemplates = {
//   verification: (name, otp) => ({
//     subject: '🚍 BusNav — Verify Your Admin Account',
//     html: `
//       <div style="font-family:'Segoe UI',sans-serif;max-width:480px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(27,43,75,0.10);">
//         <div style="background:#1B2B4B;padding:28px 32px;text-align:center;">
//           <span style="font-size:32px;">🚍</span>
//           <h1 style="color:#fff;margin:8px 0 0;font-size:24px;font-weight:900;letter-spacing:-0.5px;">
//             Bus<span style="color:#F5A623">Nav</span>
//           </h1>
//           <p style="color:#7A9FC0;margin:4px 0 0;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;">Smart Transit · Real-time Tracking</p>
//         </div>
//         <div style="padding:32px;">
//           <h2 style="color:#1B2B4B;font-size:20px;margin:0 0 8px;">Welcome, ${name}! 👋</h2>
//           <p style="color:#6B7E9B;margin:0 0 24px;font-size:14px;line-height:1.6;">
//             Your admin account is almost ready. Use the OTP below to verify your email address.
//           </p>
//           <div style="background:#EEF2F7;border-radius:12px;padding:20px;text-align:center;margin:0 0 24px;">
//             <p style="color:#8898A9;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 8px;">Verification Code</p>
//             <span style="font-size:36px;font-weight:900;color:#1B2B4B;letter-spacing:8px;">${otp}</span>
//             <p style="color:#F5A623;font-size:12px;font-weight:700;margin:8px 0 0;">⏳ Expires in 10 minutes</p>
//           </div>
//           <p style="color:#B8C8DA;font-size:12px;text-align:center;">
//             If you didn't create a BusNav admin account, you can safely ignore this email.
//           </p>
//         </div>
//         <div style="background:#F7FAFD;padding:16px 32px;text-align:center;border-top:1px solid #E8EDF5;">
//           <p style="color:#B8C8DA;font-size:11px;margin:0;">© ${new Date().getFullYear()} BusNav · Admin Portal</p>
//         </div>
//       </div>
//     `,
//   }),

//   passwordReset: (name, otp) => ({
//     subject: '🔐 BusNav — Password Reset OTP',
//     html: `
//       <div style="font-family:'Segoe UI',sans-serif;max-width:480px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(27,43,75,0.10);">
//         <div style="background:#1B2B4B;padding:28px 32px;text-align:center;">
//           <span style="font-size:32px;">🚍</span>
//           <h1 style="color:#fff;margin:8px 0 0;font-size:24px;font-weight:900;letter-spacing:-0.5px;">
//             Bus<span style="color:#F5A623">Nav</span>
//           </h1>
//           <p style="color:#7A9FC0;margin:4px 0 0;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;">Smart Transit · Real-time Tracking</p>
//         </div>
//         <div style="padding:32px;">
//           <h2 style="color:#1B2B4B;font-size:20px;margin:0 0 8px;">Password Reset Request 🔐</h2>
//           <p style="color:#6B7E9B;margin:0 0 24px;font-size:14px;line-height:1.6;">
//             Hi ${name}, we received a request to reset your admin password. Use the OTP below.
//           </p>
//           <div style="background:#EEF2F7;border-radius:12px;padding:20px;text-align:center;margin:0 0 24px;">
//             <p style="color:#8898A9;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 8px;">Reset Code</p>
//             <span style="font-size:36px;font-weight:900;color:#1B2B4B;letter-spacing:8px;">${otp}</span>
//             <p style="color:#F5A623;font-size:12px;font-weight:700;margin:8px 0 0;">⏳ Expires in 10 minutes</p>
//           </div>
//           <p style="color:#B8C8DA;font-size:12px;text-align:center;">
//             If you didn't request a password reset, please ignore this email. Your password won't change.
//           </p>
//         </div>
//         <div style="background:#F7FAFD;padding:16px 32px;text-align:center;border-top:1px solid #E8EDF5;">
//           <p style="color:#B8C8DA;font-size:11px;margin:0;">© ${new Date().getFullYear()} BusNav · Admin Portal</p>
//         </div>
//       </div>
//     `,
//   }),
// };

// const sendEmail = async ({ to, type, name, otp }) => {
//   const transporter = createTransporter();
//   const template = emailTemplates[type](name, otp);

//   await transporter.sendMail({
//     from: `"BusNav Admin" <${process.env.EMAIL_USER}>`,
//     to,
//     subject: template.subject,
//     html: template.html,
//   });
// };

// module.exports = { sendEmail };

const nodemailer = require('nodemailer');

const createTransporter = () =>
  nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    secure: process.env.EMAIL_PORT === '465',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

const emailTemplates = {
  // ── Admin ─────────────────────────────────────────────────────────────────
  verification: (name, otp) => ({
    subject: '🚍 BusNav — Verify Your Admin Account',
    html: `
      <div style="font-family:'Segoe UI',sans-serif;max-width:480px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(27,43,75,0.10);">
        <div style="background:#1B2B4B;padding:28px 32px;text-align:center;">
          <span style="font-size:32px;">🚍</span>
          <h1 style="color:#fff;margin:8px 0 0;font-size:24px;font-weight:900;letter-spacing:-0.5px;">Bus<span style="color:#F5A623">Nav</span></h1>
          <p style="color:#7A9FC0;margin:4px 0 0;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;">Smart Transit · Real-time Tracking</p>
        </div>
        <div style="padding:32px;">
          <h2 style="color:#1B2B4B;font-size:20px;margin:0 0 8px;">Welcome, ${name}! 👋</h2>
          <p style="color:#6B7E9B;margin:0 0 24px;font-size:14px;line-height:1.6;">Your admin account is almost ready. Use the OTP below to verify your email address.</p>
          <div style="background:#EEF2F7;border-radius:12px;padding:20px;text-align:center;margin:0 0 24px;">
            <p style="color:#8898A9;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 8px;">Verification Code</p>
            <span style="font-size:36px;font-weight:900;color:#1B2B4B;letter-spacing:8px;">${otp}</span>
            <p style="color:#F5A623;font-size:12px;font-weight:700;margin:8px 0 0;">⏳ Expires in 10 minutes</p>
          </div>
          <p style="color:#B8C8DA;font-size:12px;text-align:center;">If you didn't create a BusNav admin account, you can safely ignore this email.</p>
        </div>
        <div style="background:#F7FAFD;padding:16px 32px;text-align:center;border-top:1px solid #E8EDF5;">
          <p style="color:#B8C8DA;font-size:11px;margin:0;">© ${new Date().getFullYear()} BusNav · Admin Portal</p>
        </div>
      </div>
    `,
  }),

  passwordReset: (name, otp) => ({
    subject: '🔐 BusNav — Password Reset OTP',
    html: `
      <div style="font-family:'Segoe UI',sans-serif;max-width:480px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(27,43,75,0.10);">
        <div style="background:#1B2B4B;padding:28px 32px;text-align:center;">
          <span style="font-size:32px;">🚍</span>
          <h1 style="color:#fff;margin:8px 0 0;font-size:24px;font-weight:900;letter-spacing:-0.5px;">Bus<span style="color:#F5A623">Nav</span></h1>
          <p style="color:#7A9FC0;margin:4px 0 0;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;">Smart Transit · Real-time Tracking</p>
        </div>
        <div style="padding:32px;">
          <h2 style="color:#1B2B4B;font-size:20px;margin:0 0 8px;">Password Reset Request 🔐</h2>
          <p style="color:#6B7E9B;margin:0 0 24px;font-size:14px;line-height:1.6;">Hi ${name}, we received a request to reset your admin password. Use the OTP below.</p>
          <div style="background:#EEF2F7;border-radius:12px;padding:20px;text-align:center;margin:0 0 24px;">
            <p style="color:#8898A9;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 8px;">Reset Code</p>
            <span style="font-size:36px;font-weight:900;color:#1B2B4B;letter-spacing:8px;">${otp}</span>
            <p style="color:#F5A623;font-size:12px;font-weight:700;margin:8px 0 0;">⏳ Expires in 10 minutes</p>
          </div>
          <p style="color:#B8C8DA;font-size:12px;text-align:center;">If you didn't request a password reset, please ignore this email. Your password won't change.</p>
        </div>
        <div style="background:#F7FAFD;padding:16px 32px;text-align:center;border-top:1px solid #E8EDF5;">
          <p style="color:#B8C8DA;font-size:11px;margin:0;">© ${new Date().getFullYear()} BusNav · Admin Portal</p>
        </div>
      </div>
    `,
  }),

  // ── Student ───────────────────────────────────────────────────────────────
  studentVerification: (name, otp) => ({
    subject: '🚍 BusNav — Verify Your Student Account',
    html: `
      <div style="font-family:'Segoe UI',sans-serif;max-width:480px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(27,43,75,0.10);">
        <div style="background:#1B2B4B;padding:28px 32px;text-align:center;">
          <span style="font-size:32px;">🚍</span>
          <h1 style="color:#fff;margin:8px 0 0;font-size:24px;font-weight:900;letter-spacing:-0.5px;">Bus<span style="color:#F5A623">Nav</span></h1>
          <p style="color:#7A9FC0;margin:4px 0 0;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;">Smart Transit · Real-time Tracking</p>
        </div>
        <div style="padding:32px;">
          <h2 style="color:#1B2B4B;font-size:20px;margin:0 0 8px;">Welcome, ${name}! 🎓</h2>
          <p style="color:#6B7E9B;margin:0 0 24px;font-size:14px;line-height:1.6;">Your student account is almost ready. Use the OTP below to verify your email address.</p>
          <div style="background:#EEF2F7;border-radius:12px;padding:20px;text-align:center;margin:0 0 24px;">
            <p style="color:#8898A9;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 8px;">Verification Code</p>
            <span style="font-size:36px;font-weight:900;color:#1B2B4B;letter-spacing:8px;">${otp}</span>
            <p style="color:#F5A623;font-size:12px;font-weight:700;margin:8px 0 0;">⏳ Expires in 10 minutes</p>
          </div>
          <p style="color:#B8C8DA;font-size:12px;text-align:center;">If you didn't create a BusNav student account, you can safely ignore this email.</p>
        </div>
        <div style="background:#F7FAFD;padding:16px 32px;text-align:center;border-top:1px solid #E8EDF5;">
          <p style="color:#B8C8DA;font-size:11px;margin:0;">© ${new Date().getFullYear()} BusNav · Student Portal</p>
        </div>
      </div>
    `,
  }),

  studentPasswordReset: (name, otp) => ({
    subject: '🔐 BusNav — Student Password Reset OTP',
    html: `
      <div style="font-family:'Segoe UI',sans-serif;max-width:480px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(27,43,75,0.10);">
        <div style="background:#1B2B4B;padding:28px 32px;text-align:center;">
          <span style="font-size:32px;">🚍</span>
          <h1 style="color:#fff;margin:8px 0 0;font-size:24px;font-weight:900;letter-spacing:-0.5px;">Bus<span style="color:#F5A623">Nav</span></h1>
          <p style="color:#7A9FC0;margin:4px 0 0;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;">Smart Transit · Real-time Tracking</p>
        </div>
        <div style="padding:32px;">
          <h2 style="color:#1B2B4B;font-size:20px;margin:0 0 8px;">Password Reset Request 🔐</h2>
          <p style="color:#6B7E9B;margin:0 0 24px;font-size:14px;line-height:1.6;">Hi ${name}, we received a request to reset your student password. Use the OTP below.</p>
          <div style="background:#EEF2F7;border-radius:12px;padding:20px;text-align:center;margin:0 0 24px;">
            <p style="color:#8898A9;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 8px;">Reset Code</p>
            <span style="font-size:36px;font-weight:900;color:#1B2B4B;letter-spacing:8px;">${otp}</span>
            <p style="color:#F5A623;font-size:12px;font-weight:700;margin:8px 0 0;">⏳ Expires in 10 minutes</p>
          </div>
          <p style="color:#B8C8DA;font-size:12px;text-align:center;">If you didn't request a password reset, please ignore this email. Your password won't change.</p>
        </div>
        <div style="background:#F7FAFD;padding:16px 32px;text-align:center;border-top:1px solid #E8EDF5;">
          <p style="color:#B8C8DA;font-size:11px;margin:0;">© ${new Date().getFullYear()} BusNav · Student Portal</p>
        </div>
      </div>
    `,
  }),

  // ── Driver ────────────────────────────────────────────────────────────────
  driverVerification: (name, otp) => ({
    subject: '🚍 BusNav — Verify Your Driver Account',
    html: `
      <div style="font-family:'Segoe UI',sans-serif;max-width:480px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(27,43,75,0.10);">
        <div style="background:#1B2B4B;padding:28px 32px;text-align:center;">
          <span style="font-size:32px;">🚍</span>
          <h1 style="color:#fff;margin:8px 0 0;font-size:24px;font-weight:900;letter-spacing:-0.5px;">Bus<span style="color:#F5A623">Nav</span></h1>
          <p style="color:#7A9FC0;margin:4px 0 0;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;">Smart Transit · Real-time Tracking</p>
        </div>
        <div style="padding:32px;">
          <h2 style="color:#1B2B4B;font-size:20px;margin:0 0 8px;">Welcome aboard, ${name}! 🚌</h2>
          <p style="color:#6B7E9B;margin:0 0 24px;font-size:14px;line-height:1.6;">Your driver account is almost ready. Use the OTP below to verify your email and start managing your trips.</p>
          <div style="background:#EEF2F7;border-radius:12px;padding:20px;text-align:center;margin:0 0 24px;">
            <p style="color:#8898A9;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 8px;">Verification Code</p>
            <span style="font-size:36px;font-weight:900;color:#1B2B4B;letter-spacing:8px;">${otp}</span>
            <p style="color:#F5A623;font-size:12px;font-weight:700;margin:8px 0 0;">⏳ Expires in 10 minutes</p>
          </div>
          <p style="color:#B8C8DA;font-size:12px;text-align:center;">If you didn't create a BusNav driver account, you can safely ignore this email.</p>
        </div>
        <div style="background:#F7FAFD;padding:16px 32px;text-align:center;border-top:1px solid #E8EDF5;">
          <p style="color:#B8C8DA;font-size:11px;margin:0;">© ${new Date().getFullYear()} BusNav · Driver Portal</p>
        </div>
      </div>
    `,
  }),

  driverPasswordReset: (name, otp) => ({
    subject: '🔐 BusNav — Driver Password Reset OTP',
    html: `
      <div style="font-family:'Segoe UI',sans-serif;max-width:480px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(27,43,75,0.10);">
        <div style="background:#1B2B4B;padding:28px 32px;text-align:center;">
          <span style="font-size:32px;">🚍</span>
          <h1 style="color:#fff;margin:8px 0 0;font-size:24px;font-weight:900;letter-spacing:-0.5px;">Bus<span style="color:#F5A623">Nav</span></h1>
          <p style="color:#7A9FC0;margin:4px 0 0;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;">Smart Transit · Real-time Tracking</p>
        </div>
        <div style="padding:32px;">
          <h2 style="color:#1B2B4B;font-size:20px;margin:0 0 8px;">Password Reset Request 🔐</h2>
          <p style="color:#6B7E9B;margin:0 0 24px;font-size:14px;line-height:1.6;">Hi ${name}, we received a request to reset your driver password. Use the OTP below.</p>
          <div style="background:#EEF2F7;border-radius:12px;padding:20px;text-align:center;margin:0 0 24px;">
            <p style="color:#8898A9;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 8px;">Reset Code</p>
            <span style="font-size:36px;font-weight:900;color:#1B2B4B;letter-spacing:8px;">${otp}</span>
            <p style="color:#F5A623;font-size:12px;font-weight:700;margin:8px 0 0;">⏳ Expires in 10 minutes</p>
          </div>
          <p style="color:#B8C8DA;font-size:12px;text-align:center;">If you didn't request a password reset, please ignore this email. Your password won't change.</p>
        </div>
        <div style="background:#F7FAFD;padding:16px 32px;text-align:center;border-top:1px solid #E8EDF5;">
          <p style="color:#B8C8DA;font-size:11px;margin:0;">© ${new Date().getFullYear()} BusNav · Driver Portal</p>
        </div>
      </div>
    `,
  }),
};

const sendEmail = async ({ to, type, name, otp }) => {
  const transporter = createTransporter();
  const template = emailTemplates[type](name, otp);

  await transporter.sendMail({
    from: `"BusNav" <${process.env.EMAIL_USER}>`,
    to,
    subject: template.subject,
    html: template.html,
  });
};

module.exports = { sendEmail };