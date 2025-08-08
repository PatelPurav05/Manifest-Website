export async function POST(req: Request) {
  try {
    const body = await req.json()
    // Minimal validation
    const required = ["name", "email", "year", "focus", "brief", "problem", "progress"]
    for (const key of required) {
      if (!body?.[key]) {
        return new Response(JSON.stringify({ error: `Missing ${key}` }), { status: 400 })
      }
    }
    // Generate a mock application ID
    const appId = `app_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
    console.log("New application:", { appId, ...body })
    return new Response(JSON.stringify({ appId }), { status: 200, headers: { "content-type": "application/json" } })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message ?? "Invalid request" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    })
  }
}
