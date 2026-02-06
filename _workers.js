export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    if (url.pathname === '/api') {
      const API_URL = 'https://script.google.com/macros/s/AKfycbwWke2ScBtrV4cjdMsx1f-diEabp2v_rEUTuTBE5zKv4wfxcvXpTfiO5A3Q6q_lIJC8Kg/exec';
      
      let targetUrl = API_URL + url.search;
      let response;
      
      if (request.method === 'POST') {
        const body = await request.text();
        response = await fetch(targetUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: body,
          redirect: 'follow'
        });
      } else {
        response = await fetch(targetUrl, { redirect: 'follow' });
      }
      
      const data = await response.text();
      
      return new Response(data, {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });
    }
    
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });
    }
    
    return env.ASSETS.fetch(request);
  }
};
