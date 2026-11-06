# EmailJS Template & Integration Guide

This file contains the exact email template and step-by-step setup instructions to activate automatic confirmation emails for appointment bookings on **Dr. Neelima's website**.

---

## 1. Email Template Settings (EmailJS Dashboard)

When creating or editing your template in EmailJS (**Email Templates** &rarr; **Create New Template**):

| Setting Field | Value to Enter |
| :--- | :--- |
| **Template Name** | `Patient Appointment Confirmation` |
| **Subject** | `Appointment Request Received - Dr. Neelima` |
| **To Email** | `{{to_email}}` |
| **To Name** | `{{to_name}}` |
| **CC / BCC** | `drneelima@gmail.com` *(receives doctor's copy automatically)* |
| **From Name** | `Dr. Neelima - Nephrology Clinic` |
| **Reply-To** | `drneelima@gmail.com` |

---

## 2. Template Body (HTML Version)

Paste the following HTML code block directly into the **Content** tab (switch to the **HTML** or code view) in the EmailJS Template Editor:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Appointment Request Received - Dr. Neelima</title>
</head>
<body style="margin:0;padding:24px;background-color:#F4F6FB;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#14123A;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:620px;margin:0 auto;background-color:#FFFFFF;border-radius:18px;overflow:hidden;border:1px solid #E2E6F0;box-shadow:0 8px 24px rgba(20,18,58,0.06);">
    <!-- Header Banner -->
    <tr>
      <td style="background:linear-gradient(135deg,#0E1330 0%,#182352 100%);padding:32px 28px;text-align:center;color:#FFFFFF;">
        <h1 style="margin:0;font-size:24px;font-weight:700;letter-spacing:-0.02em;color:#FFFFFF;">Dr. Neelima</h1>
        <p style="margin:6px 0 0 0;font-size:14px;color:#22C1C3;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;">Nephrologist &amp; Kidney Specialist</p>
        <p style="margin:4px 0 0 0;font-size:13px;color:#D6DBF5;">{{hospital_name}}</p>
      </td>
    </tr>

    <!-- Main Message -->
    <tr>
      <td style="padding:32px 28px;">
        <h2 style="margin:0 0 12px 0;font-size:20px;color:#14123A;">Appointment Request Received</h2>
        <p style="margin:0 0 16px 0;font-size:15px;line-height:1.6;color:#4A4868;">
          Dear <strong>{{to_name}}</strong>,
        </p>
        <p style="margin:0 0 20px 0;font-size:15px;line-height:1.6;color:#4A4868;">
          Thank you for reaching out. We have successfully received your consultation request for <strong>Dr. Neelima</strong> at <strong>{{hospital_name}}</strong>.
        </p>

        <!-- Status Notice Box -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F0FBFB;border-left:4px solid #22C1C3;border-radius:8px;margin-bottom:24px;">
          <tr>
            <td style="padding:14px 16px;font-size:14px;line-height:1.5;color:#0F5B5C;">
              <strong>Important Notice:</strong> This email confirms that our consultation desk has logged your request. <strong>Our clinic team will contact you shortly by phone or WhatsApp to confirm your final consultation time slot.</strong>
            </td>
          </tr>
        </table>

        <!-- Details Table -->
        <h3 style="margin:0 0 12px 0;font-size:14px;text-transform:uppercase;letter-spacing:0.05em;color:#0E9496;">Requested Consultation Details</h3>
        <table role="presentation" width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse;margin-bottom:24px;background-color:#FAFAFD;border-radius:10px;border:1px solid #ECEEF6;font-size:14px;">
          <tr style="border-bottom:1px solid #ECEEF6;">
            <td style="width:38%;color:#6C6986;font-weight:600;">Patient Name:</td>
            <td style="color:#14123A;font-weight:700;">{{to_name}}</td>
          </tr>
          <tr style="border-bottom:1px solid #ECEEF6;">
            <td style="color:#6C6986;font-weight:600;">Mobile Number:</td>
            <td style="color:#14123A;font-weight:600;">{{mobile}}</td>
          </tr>
          <tr style="border-bottom:1px solid #ECEEF6;">
            <td style="color:#6C6986;font-weight:600;">Email Address:</td>
            <td style="color:#14123A;">{{to_email}}</td>
          </tr>
          <tr style="border-bottom:1px solid #ECEEF6;">
            <td style="color:#6C6986;font-weight:600;">Preferred Date:</td>
            <td style="color:#0E9496;font-weight:700;">{{preferred_date}}</td>
          </tr>
          <tr style="border-bottom:1px solid #ECEEF6;">
            <td style="color:#6C6986;font-weight:600;">Preferred Time:</td>
            <td style="color:#14123A;font-weight:600;">{{preferred_time}}</td>
          </tr>
          <tr style="border-bottom:1px solid #ECEEF6;">
            <td style="color:#6C6986;font-weight:600;">Visit Type:</td>
            <td style="color:#14123A;">{{visit_type}}</td>
          </tr>
          <tr>
            <td style="color:#6C6986;font-weight:600;">Reason for Visit:</td>
            <td style="color:#14123A;">{{reason}}</td>
          </tr>
        </table>

        <!-- Clinic & Contact Information -->
        <h3 style="margin:0 0 10px 0;font-size:14px;text-transform:uppercase;letter-spacing:0.05em;color:#0E9496;">Clinic OPD Timings &amp; Contact</h3>
        <p style="margin:0 0 6px 0;font-size:14px;color:#4A4868;">
          <strong>Monday to Saturday:</strong> 9:00 AM to 4:00 PM<br>
          <strong>Sunday:</strong> 9:00 AM to 5:30 PM
        </p>
        <p style="margin:10px 0 0 0;font-size:14px;color:#4A4868;">
          <strong>Phone:</strong> +91 7306003583<br>
          <strong>WhatsApp:</strong> +91 9037822668<br>
          <strong>Email:</strong> drneelima@gmail.com<br>
          <strong>Hospital Address:</strong> Chala East, Chala Bypass, Kannur, Kerala 670621, India
        </p>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background-color:#F8F9FC;padding:20px 28px;text-align:center;border-top:1px solid #ECEEF6;font-size:12px;color:#8E8CA4;line-height:1.5;">
        <p style="margin:0 0 6px 0;">This is an automated confirmation sent from Dr. Neelima's appointment booking portal.</p>
        <p style="margin:0;">For emergency kidney care, please contact the MIMS Hospital 24/7 Emergency Department directly.</p>
      </td>
    </tr>
  </table>
</body>
</html>
```

---

## 3. Template Body (Plain-Text Fallback Version)

If you prefer plain text or want to fill the **Plain Text Content** field:

```text
Appointment Request Received - Dr. Neelima
Hospital: {{hospital_name}}

Dear {{to_name}},

Thank you for your appointment request. We have received your consultation request for Dr. Neelima (Nephrologist & Kidney Specialist).

REQUESTED DETAILS:
- Patient Name: {{to_name}}
- Mobile: {{mobile}}
- Email: {{to_email}}
- Preferred Date: {{preferred_date}}
- Preferred Time: {{preferred_time}}
- Visit Type: {{visit_type}}
- Reason for Visit: {{reason}}

PLEASE NOTE:
Our clinic desk will contact you shortly by phone or WhatsApp to confirm your final consultation slot.

CLINIC CONTACT & OPD TIMINGS:
- Monday to Saturday: 9:00 AM to 4:00 PM
- Sunday: 9:00 AM to 5:30 PM
- Phone: +91 7306003583
- WhatsApp: +91 9037822668
- Email: drneelima@gmail.com
- Location: MIMS Hospital, Chala Bypass, Kannur, Kerala 670621
```

---

## 4. Step-by-Step Setup Instructions for EmailJS

### Step 1: Create a Free EmailJS Account
1. Open [https://www.emailjs.com/](https://www.emailjs.com/) in your browser.
2. Click **Sign Up Free** (the free tier provides 200 emails/month at no cost, with no credit card required).
3. Complete sign-up and verify your email.

### Step 2: Add an Email Service
1. In the EmailJS Dashboard, click **Email Services** on the left menu.
2. Click **Add New Service**.
3. Select your email provider (e.g., **Gmail**, **Outlook**, or standard SMTP).
4. Click **Connect Account** to authorize EmailJS to send emails from your clinic address (e.g., `drneelima@gmail.com`).
5. Copy the generated **Service ID** (e.g., `service_abc123`).

### Step 3: Create the Email Template
1. In the EmailJS Dashboard, click **Email Templates** on the left menu.
2. Click **Create New Template**.
3. Set the **Subject** to:
   `Appointment Request Received - Dr. Neelima`
4. In the **Content** tab, paste the HTML template provided in Section 2 above.
5. In the **Settings** tab on the right:
   - **To Email:** `{{to_email}}`
   - **CC:** `drneelima@gmail.com` *(this ensures the doctor receives a copy of every request automatically)*
   - **From Name:** `Dr. Neelima - Nephrology Clinic`
   - **Reply-To:** `drneelima@gmail.com`
6. Click **Save** in the top right.
7. Copy the generated **Template ID** (e.g., `template_xyz789`).

### Step 4: Get Your Public Key
1. In the EmailJS Dashboard, click **Account** in the left sidebar menu (or bottom left profile icon).
2. Under the **General** tab, find **Public Key** (e.g., `user_xxxxxxxxxxxxxxxx` or a public key string).
3. Copy your **Public Key**.

### Step 5: Paste Your Keys Into the Website Code
Open [`js/config.js`](file:///c:/Users/Dynabook/Documents/doctor1-website/js/config.js) (or [`js/main.js`](file:///c:/Users/Dynabook/Documents/doctor1-website/js/main.js)). At the top of either file, replace the placeholder strings:

```javascript
const EMAILJS_CONFIG = {
  publicKey: "AKQHr6OCf_s1cOXcg",
  serviceId: "service_mq7h8s8",
  templateId: "template_1dj11uf",
  doctorEmail: "drneelima@gmail.com",
  hospitalName: "MIMS Hospital, Kannur"
};
```

Once saved, any submitted appointment with an email address will automatically trigger the confirmation email to the patient and CC the doctor, while simultaneously opening WhatsApp and rendering the success card!

