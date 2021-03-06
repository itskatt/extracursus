importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js")

// cache index page and pdf viewer
workbox.routing.registerRoute(
    ({ url }) =>
        url.pathname == "/" ||
        url.pathname.endsWith("viewer.html"),

    new workbox.strategies.NetworkFirst({
        cacheName: "non-custom-html"
    })
)

// cache scripts and stylesheets
workbox.routing.registerRoute(
    ({ request }) =>
        request.destination == "style" ||
        request.destination == "script",

    new workbox.strategies.NetworkFirst({
        cacheName: "script-style",
        plugins: [
            new workbox.expiration.ExpirationPlugin({
              maxEntries: 10,
            })
          ]
    })
)

// cache fonts and images
workbox.routing.registerRoute(
    ({ request }) =>
        request.destination == "font" ||
        request.destination == "image",

    new workbox.strategies.StaleWhileRevalidate({
        cacheName: "font-image"
    })
)
