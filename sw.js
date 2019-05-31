/**
 * QCObjects SDK 1.0
 * ________________
 *
 * Author: Jean Machuca <correojean@gmail.com>
 *
 * Cross Browser Javascript Framework for MVC Patterns
 * QuickCorp/QCObjects is licensed under the
 * GNU Lesser General Public License v3.0
 * [LICENSE] (https://github.com/QuickCorp/QCObjects/blob/master/LICENSE.txt)
 *
 * Permissions of this copyleft license are conditioned on making available
 * complete source code of licensed works and modifications under the same
 * license or the GNU GPLv3. Copyright and license notices must be preserved.
 * Contributors provide an express grant of patent rights. However, a larger
 * work using the licensed work through interfaces provided by the licensed
 * work may be distributed under different terms and without source code for
 * the larger work.
 *
 * Copyright (C) 2015 Jean Machuca,<correojean@gmail.com>
 *
 * Everyone is permitted to copy and distribute verbatim copies of this
 * license document, but changing it is not allowed.
*/
"use strict";
const version = "0.0.1";
const appName = "Crypt";
const cacheName = `qcobjects-qpp-${appName}-${version}`;
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        '/js/packages/installer.js',
        '/img/icons/icon-192x192.png',
        '/js/packages/codemirror/javascript.js',
        '/js/packages/codemirror/active-line.js',
        '/js/packages/codemirror/codemirror.js',
        '/css/form.css',
        '/css/codemirror/blackboard.css',
        '/css/codemirror/codemirror.css',
        '/js/packages/codemirror/matchbrackets.js',
        '/',
        '/manifest.json',
        '/favicon.ico',
        '/index.html',
        '/css/desktop/content.css',
        '/css/desktop/container.css',
        '/css/desktop/navbar.css',
        '/css/desktop/index.css',
        '/css/desktop/sidebar.css',
        '/css/desktop/footer.css',
        '/css/index.css',
        '/css/components/card.css',
        '/css/theme/redlight/style.css',
        '/css/theme/xtra/style.css',
        '/css/theme/cyan/style.css',
        '/css/theme/basic/style.css',
        '/css/mobile/content.css',
        '/css/mobile/navbar.css',
        '/css/mobile/index.css',
        '/css/mobile/sidebar.css',
        '/css/mobile/footer.css',
        '/js/init.js',
        '/js/packages/org.quickcorp.custom.controllers.js',
        '/js/packages/org.quickcorp.custom.models.js',
        '/js/packages/org.quickcorp.custom.js',
        '/js/packages/org.quickcorp.custom.components.js',
        '/js/packages/org.quickcorp.custom.views.js',
        '/img/Q_web.svg',
        '/img/Q_web.png',
        '/img/logo.png',
        '/templates/components/main.tpl.html',
        '/templates/components/card.tpl.html',
        '/templates/components/section1.tpl.html',
        '/templates/components/article1.tpl.html',
        '/templates/components/blank.tpl.html',
        '/templates/components/contentblock.tpl.html',
        '/templates/components/nav.tpl.html',
        '/templates/components/footer.tpl.html',
        '/templates/components/header.tpl.html',
        '/templates/components/pages/page1.tpl.html',
        'https://sdk.qcobjects.dev/css/basic-layout.css',
        'https://qcobjects.dev/QCObjects.js',
        'https://sdk.qcobjects.dev/QCObjects-SDK.js',
        'https://sdk.qcobjects.dev/js/org.quickcorp.models.js',
        'https://sdk.qcobjects.dev/js/org.quickcorp.models.js',
        'https://sdk.qcobjects.dev/js/org.quickcorp.components.js',
        'https://sdk.qcobjects.dev/js/org.quickcorp.controllers.js',
        'https://sdk.qcobjects.dev/js/org.quickcorp.views.js',
        'https://sdk.qcobjects.dev/js/org.quickcorp.effects.js',
        'https://sdk.qcobjects.dev/js/org.quickcorp.tools.canvas.js',
        'https://sdk.qcobjects.dev/js/org.quickcorp.tools.layouts.js'
      ])
          .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, {ignoreSearch: true}))
      .then(response => {
      return response || fetch(event.request);
    })
  );
});
