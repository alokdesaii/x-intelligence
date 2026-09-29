/**
 * X-Intelligence Shell Layout Injector (Merged)
 * Dynamically switches layout configuration between Customer and Admin portals.
 */

document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;
  const pageName = currentPath.split("/").pop() || "";
  
  // Detect if we are in the Admin console
  const isAdmin = pageName.startsWith("admin-");
  const fallbackPage = isAdmin ? "admin-dashboard.html" : "dashboard.html";
  const activePage = pageName || fallbackPage;


  // Navigation Items Definitions
  const customerNavItems = [
    { name: "Dashboard", url: "dashboard.html", icon: "layout-dashboard" },
    { name: "Name Screening", url: "screening-setup.html", icon: "search" },
    { 
      name: "Bulk & Monitoring", 
      icon: "layers",
      subItems: [
        { name: "Bulk Screening", url: "bulk-screening.html", icon: "files" },
        { name: "Ongoing Monitoring", url: "ongoing-monitoring.html", icon: "activity" }
      ]
    },
    { name: "Case Manager", url: "case-management.html", icon: "shield-alert" },
    { name: "Profile Manager", url: "profile-manager.html", icon: "users" },
    { name: "Reports", url: "reports.html", icon: "bar-chart-3" }
  ];

  const adminNavItems = [
    { name: "Admin Dashboard", url: "admin-dashboard.html", icon: "layout-dashboard" },
    { 
      name: "Masters", 
      icon: "database",
      subItems: [
        { name: "Product Master", url: "admin-masters.html?tab=products", icon: "package" },
        { name: "Country Master DB", url: "admin-masters.html?tab=countries", icon: "globe" },
        { name: "Country Risk Rating", url: "admin-masters.html?tab=risks", icon: "sliders" },
        { name: "Sanctions Registry", url: "admin-masters.html?tab=sanctions", icon: "shield-ban" }
      ]
    },
    { name: "Subscription Manager", url: "admin-subscriptions.html", icon: "credit-card" },
    { name: "Package Manager", url: "admin-packages.html", icon: "package-plus" },
    { name: "Admin Settings", url: "admin-settings.html", icon: "settings" },
    { name: "Admin User Mgmt", url: "admin-user-mgmt.html", icon: "shield-check" },
    { name: "User Manager", url: "admin-user-manager.html", icon: "users" },
    { name: "Admin Reports", url: "admin-reports.html", icon: "bar-chart-3" }
  ];

  const activeNavItems = isAdmin ? adminNavItems : customerNavItems;

  // 3. Global Toast HTML element injection
  if (!document.getElementById("toast")) {
    const toastHtml = `
      <div id="toast" class="fixed bottom-6 right-6 bg-navy text-white text-xs px-4 py-3 rounded border border-[#00276e] flex items-center gap-2 transform translate-y-12 opacity-0 transition-all duration-300 z-50 pointer-events-none select-none" style="box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.08), 0 2px 8px -1px rgba(0, 0, 0, 0.04), 0 0 1px 0 rgba(0, 0, 0, 0.1);">
        <i data-lucide="check-circle-2" class="w-4 h-4 text-teal"></i>
        <span class="font-medium"></span>
      </div>
    `;
    document.body.insertAdjacentHTML("beforeend", toastHtml);
  }

  // Define global showToast helper
  window.showToast = (message) => {
    const toast = document.getElementById("toast");
    if (toast) {
      toast.querySelector("span").textContent = message;
      toast.classList.remove("translate-y-12", "opacity-0");
      setTimeout(() => {
        toast.classList.add("translate-y-12", "opacity-0");
      }, 3000);
    }
  };

  // Create Shell structure
  const appContainer = document.getElementById("app");
  if (!appContainer) {
    if (window.lucide) {
      window.lucide.createIcons();
    }
    return;
  }

  const mainContent = document.getElementById("main-content");
  if (!mainContent) return;

  // Helper to generate sidebar menu HTML
  const generateMenuHtml = () => {
    return activeNavItems.map(item => {
      // Check if URL matches the item
      const isActiveUrl = (url) => {
        if (!url) return false;
        // Exact match or query parameter match
        if (activePage === url) return true;
        const normalizedUrl = url.split("?")[0];
        const normalizedActive = activePage.split("?")[0];
        return normalizedActive === normalizedUrl && (url.includes("?") ? window.location.search === url.substring(url.indexOf("?")) : true);
      };

      if (item.subItems) {
        // Check if any sub-item is active
        const isChildActive = item.subItems.some(sub => isActiveUrl(sub.url));
        const subMenuId = `submenu-${item.name.replace(/\s+/g, '-').toLowerCase()}`;
        
        return `
          <div class="space-y-1">
            <button onclick="toggleSubMenu('${subMenuId}')" class="w-full flex items-center justify-between px-3 py-2.5 rounded-md text-[#b3c5d0] hover:text-white hover:bg-[#00143a] transition-colors group">
              <div class="flex items-center gap-3">
                <i data-lucide="${item.icon}" class="w-5 h-5 text-[#8ba2b1] group-hover:text-white"></i>
                <span class="text-sm">${item.name}</span>
              </div>
              <i data-lucide="chevron-down" id="arrow-${subMenuId}" class="w-4 h-4 transition-transform ${isChildActive ? 'rotate-180' : ''}"></i>
            </button>
            <div id="${subMenuId}" class="${isChildActive ? '' : 'hidden'} pl-4 space-y-1 border-l border-[#00276e] ml-5 mt-1">
              ${item.subItems.map(sub => {
                const isSubActive = isActiveUrl(sub.url);
                const subLinkClass = isSubActive
                  ? "flex items-center gap-3 px-3 py-2 rounded-md text-white bg-[#001f5c] font-medium transition-colors"
                  : "flex items-center gap-3 px-3 py-2 rounded-md text-[#b3c5d0] hover:text-white hover:bg-[#00143a] transition-colors" + (sub.disabled ? " opacity-50 cursor-not-allowed pointer-events-none" : "");
                return `
                  <a href="${sub.disabled ? '#' : sub.url}" class="${subLinkClass} group relative">
                    <i data-lucide="${sub.icon || 'circle'}" class="w-4 h-4 ${isSubActive ? 'text-teal' : 'text-[#8ba2b1] group-hover:text-white'}"></i>
                    <span class="text-xs">${sub.name}</span>
                    ${(sub.showLock || sub.disabled) ? '<i data-lucide="lock" class="w-3 h-3 absolute right-3 text-[#5b7383]"></i>' : ''}
                  </a>
                `;
              }).join('')}
            </div>
          </div>
        `;
      } else {
        const isActive = isActiveUrl(item.url);
        const linkClass = isActive 
          ? "flex items-center justify-between px-3 py-2.5 rounded-md text-white bg-[#001f5c]" + (isAdmin ? " border-l-4 border-teal" : "") + " font-medium transition-colors"
          : "flex items-center justify-between px-3 py-2.5 rounded-md text-[#b3c5d0] hover:text-white hover:bg-[#00143a] transition-colors" + (item.disabled ? " opacity-50 cursor-not-allowed pointer-events-none" : "");
        
        return `
          <a href="${item.disabled ? '#' : item.url}" class="${linkClass} group relative">
            <div class="flex items-center gap-3">
              <i data-lucide="${item.icon}" class="w-5 h-5 ${isActive ? 'text-teal' : 'text-[#8ba2b1] group-hover:text-white'}"></i>
              <span class="text-sm">${item.name}</span>
            </div>
            ${isActive && !isAdmin ? '<span class="w-2 h-2 bg-teal rounded-full shadow-[0_0_8px_#00dc8d] shrink-0 mr-1"></span>' : ''}
            ${item.disabled ? '<i data-lucide="lock" class="w-3 h-3 text-[#5b7383] shrink-0"></i>' : ''}
          </a>
        `;
      }
    }).join('');
  };

  // 1. Sidebar HTML
  // Both portals use the real X-Intelligence logo asset. The admin console adds a caption
  // underneath so it stays distinguishable from the customer portal at a glance.
  const sidebarHeaderHtml = `
      <div class="flex flex-col items-center justify-center border-b border-[#00276e] px-4 ${isAdmin ? 'pt-8 pb-5' : 'py-8'}">
        <img src="logo/x-logo-white.svg" alt="X-Intelligence" class="h-24 w-auto">
        ${isAdmin ? `
        <span class="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#00276e] border border-[#00308a]">
          <span class="w-1.5 h-1.5 bg-teal rounded-full"></span>
          <span class="text-[10px] font-semibold tracking-[0.12em] text-teal uppercase">Admin Console</span>
        </span>` : ''}
      </div>
    `;

  const roleBadgeHtml = isAdmin
    ? `
      <div class="bg-[#00276e] border border-[#00308a] rounded-md py-2 px-3 text-center">
        <span class="text-[10px] font-semibold tracking-wider text-teal uppercase block mb-0.5">Role Authorization</span>
        <span class="text-white text-xs font-semibold font-mono">System Administrator</span>
      </div>
    `
    : `
      <div class="bg-[#00276e] border border-[#00308a] rounded-md py-2 px-3 text-center">
        <span class="text-[10px] font-semibold tracking-wider text-teal uppercase block mb-0.5">Role Authorization</span>
        <span class="text-white text-xs font-semibold font-mono">Compliance Analyst</span>
      </div>
    `;

  const sidebarHtml = `
    <div class="w-64 bg-[#001741] flex flex-col justify-between shrink-0 border-r border-[#e5e5e5] h-full text-[#b3c5d0]">
      <div>
        <!-- Brand Header -->
        ${sidebarHeaderHtml}

        <!-- Nav Links -->
        <nav class="mt-6 px-3 space-y-1">
          ${generateMenuHtml()}
        </nav>
      </div>

      <!-- Footer User Panel & Role Badge -->
      <div class="border-t border-[#00276e] p-4 flex flex-col gap-3">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-full bg-[#002b7a] border border-[#003b9c] flex items-center justify-center text-white font-semibold text-sm">
            AD
          </div>
          <div class="overflow-hidden">
            <p class="text-white text-xs font-semibold truncate leading-none mb-1">Alok Desai</p>
            <p class="text-[10px] text-[#8ba2b1] truncate leading-none">alok.desai@xirni.com</p>
          </div>
        </div>
        
        <!-- Safety Role Badge -->
        ${roleBadgeHtml}
      </div>
    </div>
  `;

  // Insert Sidebar
  appContainer.insertAdjacentHTML("afterbegin", sidebarHtml);

  // 2. Topbar HTML
  const topbarTitle = activePage.replace('.html', '').replace('admin-', '').replace('-', ' ');
  const topbarHtml = `
    <header class="h-16 bg-white border-b border-[#e5e5e5] flex items-center justify-between px-6 shrink-0 relative">
      <div class="flex items-center gap-3">
        <h1 class="text-lg font-semibold tracking-[-0.3px] text-gray-900 capitalize" id="shell-title">
          ${topbarTitle}
        </h1>
        <span class="text-xs text-[#737373] font-mono">|</span>
        <span class="text-xs text-[#525252] font-mono bg-gray-100 border border-gray-200 px-2 py-0.5 rounded">ENV: Production</span>
      </div>

      <div class="flex items-center gap-4">
        <!-- Date display -->
        <div class="text-right hidden sm:block">
          <p class="text-[10px] text-[#737373] uppercase tracking-wider font-semibold">Current Audit Period</p>
          <p class="text-xs font-semibold text-gray-700 font-mono" id="audit-date">Q2 2026</p>
        </div>

        <!-- Vertical border -->
        <div class="h-8 w-px bg-[#e5e5e5]"></div>

        <!-- Help & Notifications -->
        <div class="relative">
          <button id="notification-bell-btn" class="text-gray-500 hover:text-gray-900 transition-colors p-1 relative flex items-center justify-center" title="Notification Log">
            <i data-lucide="bell" class="w-5 h-5"></i>
            <span id="notification-badge" class="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
          </button>
          
          <!-- Dropdown Popup -->
          <div id="notification-dropdown" class="hidden absolute right-0 mt-3 w-80 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden transition-all duration-200 origin-top-right transform scale-95 opacity-0">
            <div class="p-4 border-b border-gray-100 flex items-center justify-between">
              <span class="font-semibold text-gray-900 text-sm">Notifications</span>
              <button id="mark-all-read-btn" class="text-xs text-[#00276e] hover:underline font-semibold">Mark all read</button>
            </div>
            
            <div class="max-h-80 overflow-y-auto divide-y divide-gray-50" id="notification-list">
              <!-- Item 1 -->
              <div class="p-3.5 hover:bg-gray-50 transition-colors flex gap-3 relative cursor-pointer notification-item">
                <span class="w-2 h-2 bg-rose-500 rounded-full mt-1.5 shrink-0 notification-dot"></span>
                <div>
                  <p class="text-xs font-semibold text-gray-900">Critical PEP Match Detected</p>
                  <p class="text-[11px] text-gray-500 mt-0.5">High-risk PEP match identified in batch screening upload #4812.</p>
                  <span class="text-[9px] text-[#737373] font-mono mt-1 block">5m ago</span>
                </div>
              </div>
              <!-- Item 2 -->
              <div class="p-3.5 hover:bg-gray-50 transition-colors flex gap-3 relative cursor-pointer notification-item">
                <span class="w-2 h-2 bg-amber-500 rounded-full mt-1.5 shrink-0 notification-dot"></span>
                <div>
                  <p class="text-xs font-semibold text-gray-900">New Adverse Media Alert</p>
                  <p class="text-[11px] text-gray-500 mt-0.5">New Adverse Media article published regarding profile "Marcus Vance".</p>
                  <span class="text-[9px] text-[#737373] font-mono mt-1 block">1h ago</span>
                </div>
              </div>
              <!-- Item 3 -->
              <div class="p-3.5 hover:bg-gray-50 transition-colors flex gap-3 relative cursor-pointer notification-item">
                <span class="w-2 h-2 bg-[#00dc8d] rounded-full mt-1.5 shrink-0 notification-dot"></span>
                <div>
                  <p class="text-xs font-semibold text-gray-900">Database Sync Complete</p>
                  <p class="text-[11px] text-gray-500 mt-0.5">Global Sanctions database sync succeeded. 1,429 records updated.</p>
                  <span class="text-[9px] text-[#737373] font-mono mt-1 block">3h ago</span>
                </div>
              </div>
            </div>
            
            <div class="p-3 border-t border-gray-100 text-center bg-gray-50">
              <a href="case-management.html" class="text-xs font-semibold text-[#00276e] hover:underline">View all in Case Manager</a>
            </div>
          </div>
        </div>
        
        <!-- API / service status -->
        <div class="relative">
          <button id="api-status-btn" class="text-[#525252] hover:text-gray-900 transition-colors p-1 relative flex items-center justify-center" title="API &amp; Service Status">
            <i data-lucide="terminal" class="w-5 h-5"></i>
            <span id="api-status-dot" class="absolute top-1 right-1 w-2 h-2 bg-[#00dc8d] rounded-full border border-white"></span>
          </button>

          <div id="api-status-dropdown" class="hidden absolute right-0 mt-3 w-80 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden transition-all duration-200 origin-top-right transform scale-95 opacity-0">
            <div class="p-4 border-b border-gray-100 flex items-center justify-between">
              <span class="font-semibold text-gray-900 text-sm">API &amp; Service Status</span>
              <span id="api-overall-pill" class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#dcfce7] text-[#166534] border border-[#22c55e]/20">
                <span class="w-1.5 h-1.5 rounded-full bg-[#22c55e]"></span>
                All Operational
              </span>
            </div>

            <div class="divide-y divide-gray-50" id="api-status-list"></div>

            <div class="p-3 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
              <span class="text-[10px] text-[#737373] font-mono" id="api-last-checked">—</span>
              <button id="api-recheck-btn" class="text-xs font-semibold text-[#00276e] hover:underline flex items-center gap-1">
                <i data-lucide="refresh-cw" class="w-3 h-3" id="api-recheck-icon"></i> Re-check
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  `;

  // Insert Topbar before page-specific content
  mainContent.insertAdjacentHTML("afterbegin", topbarHtml);

  // Define global submenu toggle function
  window.toggleSubMenu = (menuId) => {
    const submenu = document.getElementById(menuId);
    const arrow = document.getElementById(`arrow-${menuId}`);
    if (submenu && arrow) {
      const isHidden = submenu.classList.contains("hidden");
      if (isHidden) {
        submenu.classList.remove("hidden");
        arrow.classList.add("rotate-180");
      } else {
        submenu.classList.add("hidden");
        arrow.classList.remove("rotate-180");
      }
    }
  };

  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Handle notification dropdown
  const bellBtn = document.getElementById("notification-bell-btn");
  const dropdown = document.getElementById("notification-dropdown");
  const badge = document.getElementById("notification-badge");
  const markReadBtn = document.getElementById("mark-all-read-btn");
  const notificationDots = document.querySelectorAll(".notification-dot");

  if (bellBtn && dropdown) {
    const toggleDropdown = (show) => {
      if (show) {
        dropdown.classList.remove("hidden");
        // Trigger reflow/animation
        setTimeout(() => {
          dropdown.classList.remove("scale-95", "opacity-0");
          dropdown.classList.add("scale-100", "opacity-100");
        }, 10);
      } else {
        dropdown.classList.remove("scale-100", "opacity-100");
        dropdown.classList.add("scale-95", "opacity-0");
        setTimeout(() => {
          dropdown.classList.add("hidden");
        }, 150);
      }
    };

    bellBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      // only one topbar popover open at a time
      const api = document.getElementById("api-status-dropdown");
      if (api && !api.classList.contains("hidden")) {
        api.classList.remove("scale-100", "opacity-100");
        api.classList.add("scale-95", "opacity-0");
        setTimeout(() => api.classList.add("hidden"), 150);
      }
      const isHidden = dropdown.classList.contains("hidden");
      toggleDropdown(isHidden);
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target) && !bellBtn.contains(e.target)) {
        toggleDropdown(false);
      }
    });

    // Mark all as read
    if (markReadBtn) {
      markReadBtn.addEventListener("click", () => {
        if (badge) {
          badge.classList.add("hidden");
        }
        notificationDots.forEach(dot => {
          dot.classList.remove("bg-rose-500", "bg-amber-500", "bg-[#00dc8d]");
          dot.classList.add("bg-gray-200");
        });
        window.showToast("All notifications marked as read");
      });
    }

    // Individual click to mark as read
    const items = document.querySelectorAll(".notification-item");
    items.forEach(item => {
      item.addEventListener("click", () => {
        const dot = item.querySelector(".notification-dot");
        if (dot) {
          dot.classList.remove("bg-rose-500", "bg-amber-500", "bg-[#00dc8d]");
          dot.classList.add("bg-gray-200");
        }
        // Check if there are any remaining unread dots
        const remainingUnread = Array.from(notificationDots).some(d => d.classList.contains("bg-rose-500") || d.classList.contains("bg-amber-500"));
        if (!remainingUnread && badge) {
          badge.classList.add("hidden");
        }
      });
    });
  }

  // ── API / service status dropdown ──
  const apiBtn = document.getElementById("api-status-btn");
  const apiDropdown = document.getElementById("api-status-dropdown");

  if (apiBtn && apiDropdown) {
    // Screening-path services the compliance team cares about
    const services = [
      { name: "Screening API Gateway", detail: "Name & entity screening endpoint", state: "ok",    metric: "42ms" },
      { name: "Bulk Upload Processor",  detail: "Batch roster ingestion workers",   state: "ok",    metric: "3 queued" },
      { name: "Ongoing Monitoring",     detail: "Scheduled re-screening service",   state: "ok",    metric: "On schedule" },
      { name: "Watchlist Sync",         detail: "OFAC · UN · EU · HMT feeds",       state: "warn",  metric: "1 feed stale" },
      { name: "Adverse Media Index",    detail: "News & media aggregation",         state: "ok",    metric: "118ms" }
    ];

    const STATE = {
      ok:   { dot: "bg-[#22c55e]", text: "text-[#15803d]", label: "Operational" },
      warn: { dot: "bg-[#f59e0b]", text: "text-[#b45309]", label: "Degraded" },
      down: { dot: "bg-[#ef4444]", text: "text-[#b91c1c]", label: "Outage" }
    };

    const renderApiStatus = () => {
      document.getElementById("api-status-list").innerHTML = services.map(s => {
        const st = STATE[s.state];
        return `
          <div class="p-3.5 flex items-start gap-3">
            <span class="w-2 h-2 ${st.dot} rounded-full mt-1.5 shrink-0"></span>
            <div class="flex-1 min-w-0">
              <p class="text-xs font-semibold text-gray-900">${s.name}</p>
              <p class="text-[11px] text-[#737373] mt-0.5">${s.detail}</p>
            </div>
            <div class="text-right shrink-0">
              <p class="text-[10px] font-semibold ${st.text} uppercase tracking-wider">${st.label}</p>
              <p class="text-[10px] text-[#737373] font-mono mt-0.5">${s.metric}</p>
            </div>
          </div>`;
      }).join("");

      // Overall pill + the dot on the topbar button reflect the worst service state
      const worst = services.some(s => s.state === "down") ? "down"
                  : services.some(s => s.state === "warn") ? "warn" : "ok";
      const pill = document.getElementById("api-overall-pill");
      const dot = document.getElementById("api-status-dot");
      const pillStyles = {
        ok:   ["bg-[#dcfce7] text-[#166534] border-[#22c55e]/20", "bg-[#22c55e]", "All Operational"],
        warn: ["bg-[#fef3c7] text-[#b45309] border-[#f59e0b]/20", "bg-[#f59e0b]", "Degraded"],
        down: ["bg-[#fee2e2] text-[#b91c1c] border-[#ef4444]/20", "bg-[#ef4444]", "Outage"]
      }[worst];
      pill.className = `inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${pillStyles[0]}`;
      pill.innerHTML = `<span class="w-1.5 h-1.5 rounded-full ${pillStyles[1]}"></span>${pillStyles[2]}`;
      if (dot) dot.className = `absolute top-1 right-1 w-2 h-2 ${pillStyles[1]} rounded-full border border-white`;

      const now = new Date();
      const pad = (n) => String(n).padStart(2, "0");
      document.getElementById("api-last-checked").innerText =
        `LAST CHECKED ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    };

    const toggleApi = (show) => {
      if (show) {
        renderApiStatus();
        apiDropdown.classList.remove("hidden");
        setTimeout(() => {
          apiDropdown.classList.remove("scale-95", "opacity-0");
          apiDropdown.classList.add("scale-100", "opacity-100");
        }, 10);
      } else {
        apiDropdown.classList.remove("scale-100", "opacity-100");
        apiDropdown.classList.add("scale-95", "opacity-0");
        setTimeout(() => apiDropdown.classList.add("hidden"), 150);
      }
      if (window.lucide) window.lucide.createIcons();
    };

    apiBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      // only one topbar popover open at a time
      if (dropdown && !dropdown.classList.contains("hidden")) {
        dropdown.classList.add("scale-95", "opacity-0");
        setTimeout(() => dropdown.classList.add("hidden"), 150);
      }
      toggleApi(apiDropdown.classList.contains("hidden"));
    });

    document.addEventListener("click", (e) => {
      if (!apiDropdown.contains(e.target) && !apiBtn.contains(e.target)) {
        toggleApi(false);
      }
    });

    // Re-check probes the services again
    const recheckBtn = document.getElementById("api-recheck-btn");
    if (recheckBtn) {
      recheckBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const icon = document.getElementById("api-recheck-icon");
        if (icon) icon.classList.add("animate-spin");
        recheckBtn.disabled = true;

        setTimeout(() => {
          // the stale feed clears on re-check
          const sync = services.find(s => s.name === "Watchlist Sync");
          if (sync) { sync.state = "ok"; sync.metric = "All feeds current"; }
          renderApiStatus();
          recheckBtn.disabled = false;
          if (window.lucide) window.lucide.createIcons();
          window.showToast("Service health re-checked — all systems operational.");
        }, 1200);
      });
    }

    renderApiStatus();
  }
});
