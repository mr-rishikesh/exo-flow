const DataService = require('../services/DataService');
const FilterService = require('../services/FilterService');

exports.getEvents = (req, res) => {
  try {
    const events = DataService.getEvents();
    const options = {
      type: req.query.type,
      category: req.query.category,
      q: req.query.q,
      sortBy: req.query.sort || 'latest',
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 4,
    };

    const result = FilterService.process(events, options);

    return res.json(result.data);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch events' });
  }
};

exports.getEventById = (req, res) => {
  try {
    const events = DataService.getEvents();
    const event = events.find((e) => e.id === req.params.id);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    return res.json(event);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch event' });
  }
};

exports.getEventTypes = (req, res) => {
  try {
    const events = DataService.getEvents();
    const types = new Set();
    const categories = new Set();

    events.forEach((event) => {
      types.add(event.type);
      categories.add(event.category);
    });

    return res.json({
      types: Array.from(types),
      categories: Array.from(categories),
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch event types' });
  }
};

exports.recordRegistration = (req, res) => {
  try {
    const { id } = req.params;
    const events = DataService.getEvents();
    const event = events.find((e) => e.id === id);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    event.registrations = (event.registrations || 0) + 1;
    DataService.recordClick('events', id);

    return res.json({
      message: 'Registration recorded',
      eventId: id,
      registrations: event.registrations,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to record registration' });
  }
};
