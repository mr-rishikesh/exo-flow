const DataService = require('../services/DataService');
const FilterService = require('../services/FilterService');

exports.getArticles = (req, res) => {
  try {
    const articles = DataService.getArticles();
    const options = {
      category: req.query.category,
      subcategory: req.query.subcategory,
      q: req.query.q,
      sortBy: req.query.sort || 'latest',
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 4,
    };

    const result = FilterService.process(articles, options);

    return res.json(result.data);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch articles' });
  }
};

exports.getArticleById = (req, res) => {
  try {
    const articles = DataService.getArticles();
    const article = articles.find((a) => a.id === req.params.id);

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    return res.json(article);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch article' });
  }
};

exports.recordClick = (req, res) => {
  try {
    const { id } = req.params;
    const articles = DataService.getArticles();
    const article = articles.find((a) => a.id === id);

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    article.clicks = (article.clicks || 0) + 1;
    DataService.recordClick('articles', id);

    return res.json({
      message: 'Click recorded',
      articleId: id,
      clicks: article.clicks,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to record click' });
  }
};

exports.getCategories = (req, res) => {
  try {
    const articles = DataService.getArticles();
    const categories = {};

    articles.forEach((article) => {
      if (!categories[article.category]) {
        categories[article.category] = {
          name: article.category,
          subcategories: new Set(),
          count: 0,
        };
      }
      categories[article.category].subcategories.add(article.subcategory);
      categories[article.category].count++;
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
