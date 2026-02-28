const ANTHROPIC_API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY

export function isAPIConfigured() {
  return Boolean(ANTHROPIC_API_KEY && ANTHROPIC_API_KEY.startsWith('sk-ant-'))
}

export async function callClaude(systemPrompt, userMessage) {
  if (!isAPIConfigured()) {
    return null
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6-20250620',
        max_tokens: 1024,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: userMessage,
          },
        ],
      }),
    })

    if (!response.ok) {
      console.error('Anthropic API error:', response.status)
      return null
    }

    const data = await response.json()
    return data.content?.[0]?.text ?? null
  } catch (error) {
    console.error('Anthropic API call failed:', error)
    return null
  }
}
