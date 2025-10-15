import { loadDashboardData } from "../../../js/services/dataService.js";

const PAGE_SIZE = 10;

function renderRows(tbody, rows) {
  tbody.innerHTML = rows
    .map(
      (p) => `
    <tr>
      <td>${p.sku}</td>
      <td>${p.name}</td>
      <td class="text-end">$${Number(p.price).toFixed(2)}</td>
      <td class="text-end">${Number(p.sold).toLocaleString()}</td>
    </tr>`
    )
    .join("");
}

function renderPagination(container, total, currentPage, onPage) {
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  container.innerHTML = Array.from({ length: totalPages }, (_, i) => i + 1)
    .map(
      (page) => `
    <li class="page-item ${page === currentPage ? "active" : ""}">
      <a class="page-link" href="#" data-page="${page}">${page}</a>
    </li>`
    )
    .join("");

  container.querySelectorAll('a[data-page]').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      onPage(parseInt(a.dataset.page, 10));
    });
  });
}

(async function initProducts() {
  const tbody = document.querySelector('#productsTable tbody');
  const pagination = document.querySelector('#productsPagination');
  const search = document.querySelector('#productsSearch');
  if (!tbody || !pagination) return;

  const { topProducts } = await loadDashboardData();

  let query = '';
  let currentPage = 1;

  function apply() {
    const filtered = topProducts.filter((p) =>
      [p.sku, p.name].join(' ').toLowerCase().includes(query.toLowerCase())
    );
    const start = (currentPage - 1) * PAGE_SIZE;
    const pageRows = filtered.slice(start, start + PAGE_SIZE);
    renderRows(tbody, pageRows);
    renderPagination(pagination, filtered.length, currentPage, (page) => {
      currentPage = page;
      apply();
    });
  }

  search?.addEventListener('input', () => {
    query = search.value || '';
    currentPage = 1;
    apply();
  });

  apply();
})();


