import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginate',
  standalone: true
})
export class PaginatePipe implements PipeTransform {

  transform(items: any[], currentPage: number, itemsPerPage: number): any[] {
    if (!items || items.length === 0) {
      return [];
    }

    const page = Number(currentPage);
    const perPage = Number(itemsPerPage);

    const start = (page - 1) * perPage;
    const end = start + perPage;

    return items.slice(start, end);
  }
}