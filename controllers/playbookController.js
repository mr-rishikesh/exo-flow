const DataService = require('../services/DataService');
const FilterService = require('../services/FilterService');

exports.getPlaybooks = async (req, res) => {
  try {
    const playbooks = await DataService.getPlaybooks();
    const options = {
      category: req.query.category,
      subcategory: req.query.subcategory,
      q: req.query.q,
      sortBy: req.query.sort || 'latest',
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 4,
    };

    const result = FilterService.process(playbooks, options);

    return res.json(result.data);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch playbooks' });
  }
};

exports.getPlaybookById = async (req, res) => {
  try {
    const playbooks = await DataService.getPlaybooks();
    const playbook = playbooks.find((p) => p.id === req.params.id);

    if (!playbook) {
      return res.status(404).json({ error: 'Playbook not found' });
    }

    return res.json(playbook);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch playbook' });
  }
};

exports.recordDownload = async (req, res) => {
  try {
    const { id } = req.params;
    const playbooks = await DataService.getPlaybooks();
    const playbook = playbooks.find((p) => p.id === id);

    if (!playbook) {
      return res.status(404).json({ error: 'Playbook not found' });
    }

    playbook.downloads = (playbook.downloads || 0) + 1;
    DataService.recordClick('playbooks', id);

    return res.json({
      message: 'Download recorded',
      playbookId: id,
      downloads: playbook.downloads,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to record download' });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const playbooks = await DataService.getPlaybooks();
    const categories = {};

    playbooks.forEach((pb) => {
      if (!categories[pb.category]) {
        categories[pb.category] = {
          name: pb.category,
          subcategories: new Set(),
          count: 0,
        };
      }
      categories[pb.category].subcategories.add(pb.subcategory);
      categories[pb.category].count++;
    });

    const result = Object.values(categories).map((cat) => ({
      name: cat.name,
      count: cat.count,
      subcategories: Array.from(cat.subcategories),
    }));

    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch categories' });
  }
};
