'use server';

import { FavoriteItem } from '@/store/store';

export async function convertToCSVString(items: FavoriteItem[]) {
  if (!items.length) return null;

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
  return csvString;
}
