import { Resend } from 'resend';

/**
 * Sends the festive card via email using Resend.
 * NOTE: This is a client-side implementation. Resend typically requires server-side usage.
 * If strictly client-side, we might face CORS issues unless using a proxy or if Resend allows it (which they generally don't for security).
 * However, we will implement this using standard fetch if the SDK fails in browser, or just warn the user.
 * 
 * @param {string} apiKey - Resend API Key
 * @param {string} toEmail - Recipient email
 * @param {string} subject - Email subject
 * @param {string} htmlContent - HTML content of the email
 * @param {Array} attachments - Optional array of attachments [{filename, content}]
 */
export async function sendFestiveEmail(apiKey, toEmail, subject, htmlContent, attachments = [], senderEmail = null) {
    if (!apiKey) throw new Error("Resend API Key is required");

    // Direct fetch implementation to have more control over headers/debugging
    // The Resend SDK is a wrapper around this, but often assumes Node environment.

    try {
        // Use local proxy to avoid CORS
        const response = await fetch('/api/resend/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                from: 'Festive Card <noreply@qinque717.top>', // Verified domain
                to: [toEmail],
                subject: subject,
                html: htmlContent,
                attachments: attachments,
                reply_to: senderEmail || undefined // Set reply_to if senderEmail is provided
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to send email");
        }

        return await response.json();
    } catch (error) {
        console.error("Resend Email Error:", error);
        throw error;
    }
}
