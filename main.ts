import { serveFile } from "jsr:@std/http/file-server";

Deno.serve((req: Request) => {
    return serveFile(req, "./index.html");
});
// This is a complete, standalone Deno server that you can deploy separately
// Deploy this to Deno Deploy as a new project (e.g., "otto-redirects")

const SUCCESS_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmed - Otto Art Studio</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    // Auto-redirect to main app after 5 seconds
    setTimeout(() => {
      window.location.href = 'https://cold-pig-81-08w4rker0e4m.deno.dev/Store';
    }, 5000);
  </script>
</head>
<body class="bg-gray-50 min-h-screen flex items-center justify-center p-4">
  <div class="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
    <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
      <svg class="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
    </div>
    
    <h1 class="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
    <p class="text-gray-600 mb-6">
      Thank you for your purchase! Your payment has been processed successfully.
    </p>
    
    <div class="bg-gray-50 rounded-lg p-4 mb-6">
      <p class="text-sm text-gray-600">
        You will receive an email confirmation shortly with your order details.
      </p>
    </div>
    
    <div class="space-y-3">
      <a href__="https://cold-pig-81-08w4rker0e4m.deno.dev/Store" 
         class="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors">
        Continue Shopping
      </a>
      <a href__="https://cold-pig-81-08w4rker0e4m.deno.dev/Home" 
         class="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors">
        Back to Home
      </a>
    </div>
    
    <p class="text-xs text-gray-500 mt-4">
      Redirecting automatically in <span id="countdown">5</span> seconds...
    </p>
  </div>

  <script>
    let seconds = 5;
    const countdown = document.getElementById('countdown');
    setInterval(() => {
      seconds--;
      countdown.textContent = seconds;
      if (seconds <= 0) countdown.textContent = 'now';
    }, 1000);
  </script>
</body>
</html>
`;

const CANCEL_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Cancelled - Otto Art Studio</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 min-h-screen flex items-center justify-center p-4">
  <div class="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
    <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
      <svg class="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </div>
    
    <h1 class="text-2xl font-bold text-gray-900 mb-2">Order Cancelled</h1>
    <p class="text-gray-600 mb-6">
      Your order has been cancelled. You have not been charged.
    </p>
    
    <div class="space-y-3">
      <a href__="https://cold-pig-81-08w4rker0e4m.deno.dev/Store" 
         class="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors">
        Return to Store
      </a>
      <a href__="https://cold-pig-81-08w4rker0e4m.deno.dev/Home" 
         class="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors">
        Back to Home
      </a>
    </div>
  </div>
</body>
</html>
`;

Deno.serve((req) => {
  const url = new URL(req.url);
  
  if (url.pathname === '/success') {
    return new Response(SUCCESS_HTML, {
      headers: { 'Content-Type': 'text/html' }
    });
  }
  
  if (url.pathname === '/cancel') {
    return new Response(CANCEL_HTML, {
      headers: { 'Content-Type': 'text/html' }
    });
  }
  
  // Default redirect to main app
  return Response.redirect('https://cold-pig-81-08w4rker0e4m.deno.dev/Home', 302);
});