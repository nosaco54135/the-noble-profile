import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

export const maxDuration = 60

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: NextRequest) {
  try {
    const { systemPrompt, userMessage, maxTokens = 2000 } = await req.json()

    if (!systemPrompt || !userMessage) {
      return NextResponse.json({ error: 'systemPrompt and userMessage are required' }, { status: 400 })
    }

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: maxTokens,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }],
    })

    const text = message.content[0].type === 'text' ? message.content[0].text : ''

    // Strip markdown code fences if Claude wraps the JSON
    const cleaned = text.replace(/^```(?:json)?\n?/i, '').replace(/\n?```$/i, '').trim()

    let result: unknown
    try {
      result = JSON.parse(cleaned)
    } catch {
      return NextResponse.json({ error: 'Claude returned non-JSON response', raw: text }, { status: 502 })
    }

    return NextResponse.json({ result })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
