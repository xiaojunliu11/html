export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (!url.pathname.startsWith('/_AMapService/')) return new Response('Not found', { status: 404 });
    const target = 'https://restapi.amap.com' + url.pathname.replace('/_AMapService', '') + url.search;
    const upstream = await fetch(target, { headers: { 'X-Security-JS-Code': env.AMAP_SECURITY_JS_CODE } });
    return new Response(upstream.body, { status: upstream.status, headers: { 'Access-Control-Allow-Origin': 'https://xiaojunliu11.github.io', 'Content-Type': upstream.headers.get('Content-Type') || 'application/json' } });
  }
};
