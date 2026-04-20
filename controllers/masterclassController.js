const DataService = require('../services/DataService');
const FilterService = require('../services/FilterService');

exports.getMasterclasses = (req, res) => {
  try {
    const masterclasses = DataService.getMasterclasses();
    const options = {
      category: req.query.category,
      q: req.query.q,
      sortBy: req.query.sort || 'latest',
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 4,
    };

    const result = FilterService.process(masterclasses, options);

    return res.json(result.data);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch masterclasses' });
  }
};

exports.getMasterclassById = (req, res) => {
  try {
    const masterclasses = DataService.getMasterclasses();
    const masterclass = masterclasses.find((m) => m.id === req.params.id);

    if (!masterclass) {
      return res.status(404).json({ error: 'Masterclass not found' });
    }

    return res.json(masterclass);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch masterclass' });
  }
};

exports.getMasterclassCategories = (req, res) => {
  try {
    const masterclasses = DataService.getMasterclasses();
    const categories = {};

    masterclasses.forEach((mc) => {
      if (!categories[mc.category]) {
        categories[mc.category] = {
          name: mc.category,
          count: 0,
        };
      }
      categories[mc.category].count++;
    });

    const result = Object.values(categories).map((cat) => ({
      name: cat.name,
      count: cat.count,
    }));

    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

exports.recordEnrollment = (req, res) => {
  try {
    const { id } = req.params;
    const masterclasses = DataService.getMasterclasses();
    const masterclass = masterclasses.find((m) => m.id === id);

    if (!masterclass) {
      return res.status(404).json({ error: 'Masterclass not found' });
    }

    masterclass.enrollments = (masterclass.enrollments || 0) + 1;
    masterclass.currentEnrollments = (masterclass.currentEnrollments || 0) + 1;
    DataService.recordClick('masterclasses', id);

    return res.json({
      message: 'Enrollment recorded',
      masterclassId: id,
      enrollments: masterclass.enrollments,
      currentEnrollments: masterclass.currentEnrollments,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to record enrollment' });
  }
};
