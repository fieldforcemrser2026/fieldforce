export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Se è una chiamata API, fai da proxy
    if (url.pathname === '/api') {
      const API_URL = 'https://script.google.com/macros/s/AKfycbwWke2ScBtrV4cjdMsx1f-diEabp2v_rEUTuTBE5zKv4wfxcvXpTfiO5A3Q6q_lIJC8Kg/exec';
      
      const targetUrl = API_URL + url.search;
      
      const response = await fetch(targetUrl, {
        method: request.method,
        headers: request.headers,
        body: request.method !== 'GET' ? await request.text() : null
      });
      
      const data = await response.text();
      
      return new Response(data, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
    
    // Altrimenti servi i file statici
    return env.ASSETS.fetch(request);
  }
};
