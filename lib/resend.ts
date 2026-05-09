import { Resend } from 'resend'

const FROM = process.env.RESEND_FROM_EMAIL ?? 'noreply@thenobleseller.com'

function isResendConfigured(): boolean {
  const key = process.env.RESEND_API_KEY
  return !!key && key !== 'placeholder' && !key.includes('placeholder')
}

/**
 * Spec Stage 8: when Resend isn't configured, dump the rendered email to the
 * server console instead of calling the provider. Lets the full funnel run
 * locally without an account.
 */
function logEmailToConsole(payload: { to: string; subject: string; html: string }) {
  console.log('\n========== [DEV MODE EMAIL] ==========')
  console.log('To:      ', payload.to)
  console.log('From:    ', FROM)
  console.log('Subject: ', payload.subject)
  console.log('--- HTML body (truncated) ---')
  console.log(payload.html.slice(0, 1500))
  console.log('======================================\n')
}

/**
 * Sends a confirmation email after assessment submission.
 */
export async function sendAssessmentConfirmation({
  email,
  primaryArchetype,
  resultsUrl,
}: {
  email: string
  primaryArchetype: string
  resultsUrl: string
}): Promise<void> {
  const subject = `Your Noble Quotient results are ready: ${primaryArchetype}`
  const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body style="font-family: system-ui, sans-serif; background: #f8fafc; margin: 0; padding: 0;">
          <div style="max-width: 560px; margin: 40px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <div style="background: #722F37; padding: 32px 40px;">
              <p style="color: rgba(255,255,255,0.75); font-size: 13px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; margin: 0 0 8px;">The Noble Seller</p>
              <h1 style="color: white; font-size: 24px; font-weight: 700; margin: 0;">Your Noble Quotient is ready.</h1>
            </div>
            <div style="padding: 40px;">
              <div style="text-align: center; padding: 32px 0;">
                <p style="margin: 0 0 8px 0; font-family: Georgia, serif; font-size: 12px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #6B6B6B;">
                  You are
                </p>
                <p style="margin: 0; font-family: Georgia, serif; font-size: 32px; font-weight: 400; color: #0F0F0F; line-height: 1.2;">
                  The ${primaryArchetype}
                </p>
              </div>
              <p style="color: #64748b; font-size: 15px; line-height: 1.6; margin: 0 0 28px;">
                View your full dimension breakdown, all 8 archetype scores, and unlock your personalized Codex.
              </p>
              <a href="${resultsUrl}"
                style="display: inline-block; background: #722F37; color: white; font-size: 15px; font-weight: 600; text-decoration: none; padding: 14px 28px; border-radius: 8px;">
                View My Results →
              </a>
            </div>
            <div style="border-top: 1px solid #e2e8f0; padding: 24px 40px;">
              <p style="color: #94a3b8; font-size: 13px; margin: 0;">
                The Noble Seller · The Noble Quotient
              </p>
            </div>
          </div>
        </body>
      </html>
    `

  if (!isResendConfigured()) {
    logEmailToConsole({ to: email, subject, html })
    return
  }

  const resend = new Resend(process.env.RESEND_API_KEY!)
  await resend.emails.send({ from: FROM, to: email, subject, html })
}

/**
 * Sends a Codex delivery email after payment.
 */
export async function sendCodexDelivery({
  email,
  primaryArchetype,
  codexUrl,
}: {
  email: string
  primaryArchetype: string
  codexUrl: string
}): Promise<void> {
  const subject = `Your Noble Codex is ready`
  const html = `
      <!DOCTYPE html>
      <html>
        <body style="font-family: system-ui, sans-serif; background: #f8fafc; margin: 0; padding: 0;">
          <div style="max-width: 560px; margin: 40px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <div style="background: #722F37; padding: 32px 40px;">
              <p style="color: rgba(255,255,255,0.75); font-size: 13px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; margin: 0 0 8px;">The Noble Seller</p>
              <h1 style="color: white; font-size: 24px; font-weight: 700; margin: 0;">Your Codex is ready.</h1>
            </div>
            <div style="padding: 40px;">
              <p style="color: #334155; font-size: 16px; line-height: 1.6; margin: 0 0 16px;">
                Your personalized <strong>${primaryArchetype}</strong> Codex has been generated. It includes 6 sections tailored specifically to your Noble Quotient scores.
              </p>
              <a href="${codexUrl}"
                style="display: inline-block; background: #722F37; color: white; font-size: 15px; font-weight: 600; text-decoration: none; padding: 14px 28px; border-radius: 8px; margin: 8px 0 24px;">
                Open My Codex →
              </a>
              <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin: 0;">
                Bookmark this link. You can return anytime to re-read or print your Codex.
              </p>
            </div>
          </div>
        </body>
      </html>
    `

  if (!isResendConfigured()) {
    logEmailToConsole({ to: email, subject, html })
    return
  }

  const resend = new Resend(process.env.RESEND_API_KEY!)
  await resend.emails.send({ from: FROM, to: email, subject, html })
}
