class FilterService {
  filter(items, options = {}) {
    let filtered = [...items];

    if (options.category) {
      filtered = filtered.filter(
        (item) => item.category === options.category
      );
    }

    if (options.subcategory) {
      filtered = filtered.filter(
        (item) => item.subcategory === options.subcategory
      );
    }

    if (options.type) {
      filtered = filtered.filter((item) => item.type === options.type);
    }

    if (options.q) {
      const query = options.q.toLowerCase();
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query) ||
        item.summary?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }

  sort(items, sortBy = 'latest') {
    const sorted = [...items];

    if (sortBy === 'trending') {
      sorted.sort((a, b) => (b.clicks || 0) - (a.clicks || 0));
    } else if (sortBy === 'latest') {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'registrations') {
      sorted.sort((a, b) => (b.registrations || 0) - (a.registrations || 0));
    } else if (sortBy === 'downloads') {
      sorted.sort((a, b) => (b.downloads || 0) - (a.downloads || 0));
    }

    return sorted;
  }

  paginate(items, page = 1, limit = 4) {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return {
      data: items.slice(startIndex, endIndex),
      pagination: {
        page,
        limit,
        total: items.length,
        pages: Math.ceil(items.length / limit),
      },
    };
  }

  process(items, options = {}) {
    let result = this.filter(items, options);
    result = this.sort(result, options.sortBy || 'latest');

    const limit = options.limit || 4;
    const page = options.page || 1;
    return this.paginate(result, page, limit);
  }
}

module.exports = new FilterService();
