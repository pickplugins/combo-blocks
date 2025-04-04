import { applyFilters } from '@wordpress/hooks';
const paginationTypesBasic = {
  none: { label: 'None', value: 'none', isPro: false },
  normal: { label: 'Normal Pagination', value: 'normal', isPro: false },
  ajax: { label: 'Ajax Pagination', value: 'ajax', isPro: true },
  next_previous: { label: 'Next-Previous', value: 'next_previous', isPro: true },
  loadmore: { label: 'Load More', value: 'loadmore', isPro: true },
  infinite: { label: 'Infinite Load', value: 'infinite', isPro: true },
  filterable: { label: 'Filterable', value: 'filterable', isPro: true },
};
let paginationTypes = applyFilters('paginationTypes', paginationTypesBasic);
export default paginationTypes;