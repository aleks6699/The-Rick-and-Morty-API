import type { FavoriteItem } from '../store/store';

export function convertToCSVBlob(items: FavoriteItem[]): Blob {
  const headers = ['ID', 'Name', 'Status', 'Species', 'Gender', 'Image'];
  const rows = items.map((item) => [
    item.id,
    item.name,
    item.status,
    item.species,
    item.gender,
    item.image,
  ]);

  const csvString = [headers.join(';'), ...rows.map((r) => r.join(';'))].join(
    '\n'
  );
  return new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
}
