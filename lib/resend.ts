import { Resend } from 'resend'
import {
  DIMENSION_ORDER,
  DIMENSION_LABELS,
  COMPASS_TEASERS,
  COMPASS_TEASER_FALLBACK,
  type DimensionKey,
} from '@/types'

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

export function buildAssessmentConfirmationHtml({
  primaryArchetype,
  resultsUrl,
  dimensionScores,
}: {
  primaryArchetype: string
  resultsUrl: string
  dimensionScores?: Record<DimensionKey, number>
}): string {
  let blindSpotBlock: string
  if (dimensionScores && Object.keys(dimensionScores).length > 0) {
    const lowest3 = [...DIMENSION_ORDER]
      .sort((a, b) => (dimensionScores[a] ?? 5) - (dimensionScores[b] ?? 5))
      .slice(0, 3)
    blindSpotBlock = lowest3
      .map((dim) => {
        const label = DIMENSION_LABELS[dim]
        if (!label) return ''
        const teaser = COMPASS_TEASERS[label] ?? COMPASS_TEASER_FALLBACK
        return `<p style="color: #334155; font-size: 15px; line-height: 1.6; margin: 0 0 20px;"><strong style="color: #722F37;">${label}:</strong> ${teaser}</p>`
      })
      .filter(Boolean)
      .join('')
  } else {
    blindSpotBlock = `<p style="color: #334155; font-size: 15px; line-height: 1.6; margin: 0 0 12px;">Your full results reveal the specific dimensions where focused work will move your performance most.</p>`
  }

  return `
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
              <div style="text-align: center; padding: 8px 0 32px;">
                <p style="margin: 0 0 8px 0; font-family: Georgia, serif; font-size: 12px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #6B6B6B;">
                  You are
                </p>
                <p style="margin: 0; font-family: Georgia, serif; font-size: 32px; font-weight: 400; color: #0F0F0F; line-height: 1.2;">
                  The ${primaryArchetype}
                </p>
              </div>
              <p style="color: #64748b; font-size: 15px; line-height: 1.6; margin: 0 0 28px;">
                View your full dimension breakdown, all 8 archetype scores, and your personalized sales playbook, the Noble Compass.
              </p>
              <a href="${resultsUrl}"
                style="display: inline-block; background: #722F37; color: white; font-size: 15px; font-weight: 600; text-decoration: none; padding: 14px 28px; border-radius: 8px;">
                View My Results →
              </a>
              <p style="font-family: Georgia, serif; font-style: italic; color: #1a1a1a; font-size: 16px; line-height: 1.5; margin: 18px 0 0;">
                Your results exposed three places you're losing deals you can't see.
              </p>


              <div style="border-top: 1px solid #e2e8f0; margin-top: 20px; padding-top: 24px;">
                <p style="margin: 0 0 10px 0; font-family: Georgia, serif; font-size: 22px; font-weight: 700; color: #0F0F0F; line-height: 1.2;">
                  You've seen the what.<br>Now get the why, and the fix.
                </p>
                <p style="margin: 0 0 24px 0; font-family: Georgia, serif; font-style: italic; font-size: 16px; color: #722F37; line-height: 1.5;">
                  Built from your scores. It won't match anyone else's.
                </p>
                ${blindSpotBlock}
                <p style="color: #64748b; font-size: 15px; line-height: 1.6; margin: 20px 0 6px;">
                  Your Noble Compass is where the full diagnosis and the fixes live.
                </p>
                <p style="color: #334155; font-size: 14px; line-height: 1.6; margin: 0 0 24px;">
                  Six sections, built from all 12 of your scores, specific to your profile.
                </p>
                <a href="${resultsUrl}#compass"
                  style="display: block; width: 100%; box-sizing: border-box; text-align: center; background: #722F37; color: white; font-size: 15px; font-weight: 600; text-decoration: none; padding: 16px 28px; border-radius: 8px;">
                  Unlock My Noble Compass →
                </a>
                <p style="color: #334155; font-size: 14px; line-height: 1.5; text-align: center; margin: 14px 0 10px;">
                  $47, or <strong>$37</strong> when you subscribe to the newsletter.
                </p>
                <p style="color: #475569; font-size: 14px; line-height: 1.5; text-align: center; margin: 0;">
                  One hour with a sales coach costs more, and tells you less.
                </p>
              </div>
            </div>

              <div style="border-top: 1px solid #e2e8f0; margin-top: 28px; padding-top: 24px; text-align: center;">
                <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin: 0 0 16px;">
                  Know another AE who should know their archetype?
                </p>
                <a href="https://www.linkedin.com/sharing/share-offsite/?url=${resultsUrl}"
                  style="display: inline-block; background: #0A66C2; color: white; font-size: 14px; font-weight: 600; text-decoration: none; padding: 12px 24px; border-radius: 8px;">
                  Share Your Result on LinkedIn →
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
  const html = buildAssessmentConfirmationHtml({ primaryArchetype, resultsUrl })

  if (!isResendConfigured()) {
    logEmailToConsole({ to: email, subject, html })
    return
  }

  const resend = new Resend(process.env.RESEND_API_KEY!)
  await resend.emails.send({ from: FROM, to: email, subject, html })
}

/**
 * Sends a Compass delivery email after payment.
 */
export async function sendCompassDelivery({
  email,
  primaryArchetype,
  compassUrl,
}: {
  email: string
  primaryArchetype: string
  compassUrl: string
}): Promise<void> {
  const subject = `Your Noble Compass is ready`
  const html = `
      <!DOCTYPE html>
      <html>
        <body style="font-family: system-ui, sans-serif; background: #f8fafc; margin: 0; padding: 0;">
          <div style="max-width: 560px; margin: 40px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <div style="background: #722F37; padding: 32px 40px;">
              <p style="color: rgba(255,255,255,0.75); font-size: 13px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; margin: 0 0 8px;">The Noble Seller</p>
              <h1 style="color: white; font-size: 24px; font-weight: 700; margin: 0;">Your Noble Compass is ready.</h1>
            </div>
            <div style="padding: 40px;">
              <p style="color: #334155; font-size: 16px; line-height: 1.6; margin: 0 0 16px;">
                Your personalized <strong>${primaryArchetype}</strong> Compass has been generated. It includes 6 sections tailored specifically to your Noble Quotient scores.
              </p>
              <a href="${compassUrl}"
                style="display: inline-block; background: #722F37; color: white; font-size: 15px; font-weight: 600; text-decoration: none; padding: 14px 28px; border-radius: 8px; margin: 8px 0 24px;">
                Open My Noble Compass →
              </a>
              <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin: 0;">
                Bookmark this link. You can return anytime to re-read or print your Noble Compass.
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
