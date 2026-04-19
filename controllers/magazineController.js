const DataService = require('../services/DataService');
const FilterService = require('../services/FilterService');

exports.getMagazines = (req, res) => {
  try {
    const magazines = DataService.getMagazines();
    const options = {
      category: req.query.category,
      q: req.query.q,
      sortBy: req.query.sort || 'latest',
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 4,
    };

    const result = FilterService.process(magazines, options);

    return res.json(result.data);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch magazines' });
  }
};

exports.getMagazineById = (req, res) => {
  try {
    const magazines = DataService.getMagazines();
    const magazine = magazines.find((m) => m.id === req.params.id);

    if (!magazine) {
      return res.status(404).json({ error: 'Magazine not found' });
    }

    return res.json(magazine);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch magazine' });
  }
};

exports.getMagazineCategories = (req, res) => {
  try {
    const magazines = DataService.getMagazines();
    const categories = {};

    magazines.forEach((mag) => {
      if (!categories[mag.category]) {
        categories[mag.category] = {
          name: mag.category,
          count: 0,
          label: getCategoryLabel(mag.category),
        };
      }
      categories[mag.category].count++;
    });

    const result = Object.values(categories).map((cat) => ({
      name: cat.name,
      label: cat.label,
      count: cat.count,
    }));

    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

exports.recordDownload = (req, res) => {
  try {
    const { id } = req.params;
    const magazines = DataService.getMagazines();
    const magazine = magazines.find((m) => m.id === id);

    if (!magazine) {
      return res.status(404).json({ error: 'Magazine not found' });
    }

    magazine.downloads = (magazine.downloads || 0) + 1;
    DataService.recordClick('magazines', id);

    return res.json({
      message: 'Download recorded',
      magazineId: id,
      downloads: magazine.downloads,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to record download' });
  }
};

function getCategoryLabel(category) {
  const labels = {
    flagship: 'Flagship Editions (General C-Suite)',
    sustainability: 'Sustainable Tech (ESG & Green IT)',
    ai: 'AI & DeepTech (Future of Work)',
    verticals: 'Industry Deep-Dives (Verticals)',
    premium: 'Premium Insights (Coffee Table & Research)',
  };
  return labels[category] || category;
}
