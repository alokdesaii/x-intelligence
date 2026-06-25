/**
 * X-Intelligence Admin Shell Layout Injector
 * Adheres to DESIGN.md constraints:
 * - 256px rigid Navy (#001741) sidebar
 * - 64px white top bar
 * - High-contrast text colors (#b3c5d0 on Navy)
 * - Display headings font weights and spacing
 */

document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;
  const pageName = currentPath.split("/").pop() || "admin-dashboard.html";

  // Navigation Items Definitions
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
    { name: "Admin User Mgmt", url: "admin-user-mgmt.html", icon: "shield-check", disabled: true },
    { name: "User Manager", url: "admin-user-manager.html", icon: "users", disabled: true },
    { name: "Admin Reports", url: "admin-reports.html", icon: "bar-chart-3", disabled: true }
  ];

  const activeNavItems = adminNavItems;

  // Create Shell structure
  const appContainer = document.getElementById("app");
  if (!appContainer) return;

  const mainContent = document.getElementById("main-content");
  if (!mainContent) return;

  // Helper to generate sidebar menu HTML
  const generateMenuHtml = () => {
    return activeNavItems.map(item => {
      if (item.subItems) {
        // Check if any sub-item is active
        const isChildActive = item.subItems.some(sub => pageName === sub.url || (pageName + window.location.search) === sub.url);
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
                const isSubActive = pageName === sub.url || (pageName + window.location.search) === sub.url;
                const subLinkClass = isSubActive
                  ? "flex items-center gap-3 px-3 py-2 rounded-md text-white bg-[#001f5c] font-medium transition-colors"
                  : "flex items-center gap-3 px-3 py-2 rounded-md text-[#b3c5d0] hover:text-white hover:bg-[#00143a] transition-colors";
                return `
                  <a href="${sub.url}" class="${subLinkClass} group relative">
                    <i data-lucide="${sub.icon || 'circle'}" class="w-4 h-4 ${isSubActive ? 'text-teal' : 'text-[#8ba2b1] group-hover:text-white'}"></i>
                    <span class="text-xs">${sub.name}</span>
                    ${sub.showLock ? '<i data-lucide="lock" class="w-3 h-3 absolute right-3 text-[#5b7383]"></i>' : ''}
                  </a>
                `;
              }).join('')}
            </div>
          </div>
        `;
      } else {
        const isActive = pageName === item.url;
        const linkClass = isActive 
          ? "flex items-center gap-3 px-3 py-2.5 rounded-md text-white bg-[#001f5c] border-l-4 border-teal font-medium transition-colors"
          : "flex items-center gap-3 px-3 py-2.5 rounded-md text-[#b3c5d0] hover:text-white hover:bg-[#00143a] transition-colors" + (item.disabled ? " opacity-50 cursor-not-allowed pointer-events-none" : "");
        
        return `
          <a href="${item.disabled ? '#' : item.url}" class="${linkClass} group relative">
            <i data-lucide="${item.icon}" class="w-5 h-5 ${isActive ? 'text-teal' : 'text-[#8ba2b1] group-hover:text-white'}"></i>
            <span class="text-sm">${item.name}</span>
          </a>
        `;
      }
    }).join('');
  };

  // 1. Sidebar HTML
  const sidebarHtml = `
    <div class="w-64 bg-[#001741] flex flex-col justify-between shrink-0 border-r border-[#e5e5e5] h-full text-[#b3c5d0]">
      <div>
        <!-- Brand Header -->
        <div class="h-16 flex items-center px-6 border-b border-[#00276e]">
          <span class="text-white font-semibold text-lg tracking-[-0.5px] flex items-center gap-2">
            <span class="w-3 h-3 bg-teal rounded-full animate-pulse"></span>
            X-INTELLIGENCE
          </span>
        </div>

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
        <div class="bg-[#00276e] border border-[#00308a] rounded-md py-2 px-3 text-center">
          <span class="text-[10px] font-semibold tracking-wider text-teal uppercase block mb-0.5">Role Authorization</span>
          <span class="text-white text-xs font-semibold font-mono">System Administrator</span>
        </div>
      </div>
    </div>
  `;

  // Insert Sidebar
  appContainer.insertAdjacentHTML("afterbegin", sidebarHtml);

  // 2. Topbar HTML (Without portal switcher toggle)
  const topbarHtml = `
    <header class="h-16 bg-white border-b border-[#e5e5e5] flex items-center justify-between px-6 shrink-0">
      <div class="flex items-center gap-3">
        <h1 class="text-lg font-semibold tracking-[-0.3px] text-gray-900 capitalize" id="shell-title">
          ${pageName.replace('.html', '').replace('admin-', '').replace('-', ' ')}
        </h1>
        <span class="text-xs text-gray-400 font-mono">|</span>
        <span class="text-xs text-gray-500 font-mono bg-gray-100 border border-gray-200 px-2 py-0.5 rounded">ENV: Production</span>
      </div>

      <div class="flex items-center gap-4">
        <!-- Date display -->
        <div class="text-right hidden sm:block">
          <p class="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Current Audit Period</p>
          <p class="text-xs font-semibold text-gray-700 font-mono" id="audit-date">Q2 2026</p>
        </div>

        <!-- Vertical border -->
        <div class="h-8 w-px bg-[#e5e5e5]"></div>

        <!-- Help & Notifications -->
        <button class="text-gray-500 hover:text-gray-900 transition-colors p-1" title="Notification Log">
          <i data-lucide="bell" class="w-5 h-5"></i>
        </button>
        <button class="text-gray-500 hover:text-gray-900 transition-colors p-1" title="API Status">
          <i data-lucide="terminal" class="w-5 h-5"></i>
        </button>
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
});
