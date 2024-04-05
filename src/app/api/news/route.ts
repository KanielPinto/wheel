export async function GET(request: Request) {
    const res = await fetch('http://127.0.0.1:5000/news/')

    const news = await res.json()
   
    return Response.json({ news })
  }