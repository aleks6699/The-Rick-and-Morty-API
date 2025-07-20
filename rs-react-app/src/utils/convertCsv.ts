import type { FavoriteItem } from '../store/store';

export function convertToCSV(items: FavoriteItem[]) {
  const headers = ['ID', 'Name', 'Status', 'Species', 'Gender', 'Image'];
  const rows = items.map((item) => [
    item.name,
    item.status,
    item.species,
    item.gender,
    item.image,
  ]);

  const csvContent =
    'data:text/csv;charset=utf-8,' +
    [headers.join(';'), ...rows.map((e) => e.join(';'))].join('\n');
  return encodeURI(csvContent);
}
