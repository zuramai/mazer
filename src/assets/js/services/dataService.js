export async function loadDashboardData() {
    const response = await fetch('/assets/data/data.json', { cache: 'no-store' });
    if (!response.ok) throw new Error(`Failed to load data.json: ${response.status}`);
    return await response.json();
  }