const express = require('express');
const router = express.Router();
const Visitor = require('../models/Visitor');
const crypto = require('crypto');

// Helper to parse user agent
const parseUserAgent = (ua) => {
  if (!ua) return { type: 'unknown', browser: 'unknown', os: 'unknown' };
  
  let type = 'desktop';
  if (/mobile/i.test(ua)) type = 'mobile';
  else if (/tablet|ipad/i.test(ua)) type = 'tablet';
  
  let browser = 'unknown';
  if (/chrome/i.test(ua) && !/edge/i.test(ua)) browser = 'Chrome';
  else if (/firefox/i.test(ua)) browser = 'Firefox';
  else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browser = 'Safari';
  else if (/edge/i.test(ua)) browser = 'Edge';
  else if (/opera|opr/i.test(ua)) browser = 'Opera';
  
  let os = 'unknown';
  if (/windows/i.test(ua)) os = 'Windows';
  else if (/mac/i.test(ua)) os = 'macOS';
  else if (/linux/i.test(ua)) os = 'Linux';
  else if (/android/i.test(ua)) os = 'Android';
  else if (/ios|iphone|ipad/i.test(ua)) os = 'iOS';
  
  return { type, browser, os, userAgent: ua };
};

// Generate session ID
const generateSessionId = () => {
  return crypto.randomBytes(16).toString('hex');
};

// POST /api/visitors/track - Track a page visit
router.post('/track', async (req, res) => {
  try {
    const {
      sessionId,
      path,
      title,
      referrer,
      screen,
      language,
      utm
    } = req.body;
    
    const userAgent = req.get('user-agent');
    const ipAddress = req.ip || req.connection.remoteAddress || 'unknown';
    const device = parseUserAgent(userAgent);
    
    let visitor;
    let newSessionId = sessionId;
    
    if (sessionId) {
      // Find existing visitor
      visitor = await Visitor.findOne({ sessionId });
    }
    
    if (visitor) {
      // Update existing visitor
      visitor.lastActivity = new Date();
      visitor.pageViews += 1;
      visitor.pages.push({
        path,
        title,
        visitedAt: new Date()
      });
      
      // Keep only last 50 pages
      if (visitor.pages.length > 50) {
        visitor.pages = visitor.pages.slice(-50);
      }
      
      await visitor.save();
    } else {
      // Create new visitor
      newSessionId = generateSessionId();
      
      visitor = new Visitor({
        sessionId: newSessionId,
        ipAddress,
        device,
        referrer: referrer || 'direct',
        language,
        screen,
        utm,
        pages: [{
          path,
          title,
          visitedAt: new Date()
        }],
        pageViews: 1
      });
      
      await visitor.save();
    }
    
    res.json({
      success: true,
      sessionId: newSessionId || sessionId,
      visitorId: visitor._id
    });
    
  } catch (error) {
    console.error('Visitor tracking error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur de tracking'
    });
  }
});

// POST /api/visitors/heartbeat - Update last activity
router.post('/heartbeat', async (req, res) => {
  try {
    const { sessionId, path, duration } = req.body;
    
    if (!sessionId) {
      return res.status(400).json({ success: false, message: 'Session ID required' });
    }
    
    const visitor = await Visitor.findOne({ sessionId });
    
    if (visitor) {
      visitor.lastActivity = new Date();
      
      // Update duration for current page
      if (path && visitor.pages.length > 0) {
        const lastPage = visitor.pages[visitor.pages.length - 1];
        if (lastPage.path === path) {
          lastPage.duration = duration;
        }
      }
      
      await visitor.save();
    }
    
    res.json({ success: true });
    
  } catch (error) {
    console.error('Heartbeat error:', error);
    res.status(500).json({ success: false });
  }
});

// GET /api/visitors - Get all visitors (admin)
router.get('/', async (req, res) => {
  try {
    const { limit = 100, page = 1, days = 30 } = req.query;
    
    const dateFilter = new Date();
    dateFilter.setDate(dateFilter.getDate() - parseInt(days));
    
    const query = { lastActivity: { $gte: dateFilter } };
    
    const visitors = await Visitor.find(query)
      .sort({ lastActivity: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .select('-pages'); // Exclude pages array for list view
    
    const total = await Visitor.countDocuments(query);
    
    res.json({
      success: true,
      data: visitors,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
    
  } catch (error) {
    console.error('Get visitors error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des visiteurs'
    });
  }
});

// GET /api/visitors/stats - Get visitor statistics
router.get('/stats', async (req, res) => {
  try {
    const { days = 30 } = req.query;
    
    const dateFilter = new Date();
    dateFilter.setDate(dateFilter.getDate() - parseInt(days));
    
    // Total visitors
    const totalVisitors = await Visitor.countDocuments({
      lastActivity: { $gte: dateFilter }
    });
    
    // Today's visitors
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayVisitors = await Visitor.countDocuments({
      lastActivity: { $gte: today }
    });
    
    // Total page views
    const pageViewsAgg = await Visitor.aggregate([
      { $match: { lastActivity: { $gte: dateFilter } } },
      { $group: { _id: null, total: { $sum: '$pageViews' } } }
    ]);
    const totalPageViews = pageViewsAgg[0]?.total || 0;
    
    // Device breakdown
    const deviceStats = await Visitor.aggregate([
      { $match: { lastActivity: { $gte: dateFilter } } },
      { $group: { _id: '$device.type', count: { $sum: 1 } } }
    ]);
    
    // Browser breakdown
    const browserStats = await Visitor.aggregate([
      { $match: { lastActivity: { $gte: dateFilter } } },
      { $group: { _id: '$device.browser', count: { $sum: 1 } } }
    ]);
    
    // Visitors by day (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const dailyVisitors = await Visitor.aggregate([
      { $match: { firstVisit: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$firstVisit' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    
    // Top pages
    const topPages = await Visitor.aggregate([
      { $match: { lastActivity: { $gte: dateFilter } } },
      { $unwind: '$pages' },
      { $group: { _id: '$pages.path', views: { $sum: 1 } } },
      { $sort: { views: -1 } },
      { $limit: 10 }
    ]);
    
    // Returning vs new visitors
    const returningCount = await Visitor.countDocuments({
      lastActivity: { $gte: dateFilter },
      visitCount: { $gt: 1 }
    });
    
    res.json({
      success: true,
      data: {
        totalVisitors,
        todayVisitors,
        totalPageViews,
        returningVisitors: returningCount,
        newVisitors: totalVisitors - returningCount,
        deviceStats: deviceStats.reduce((acc, d) => {
          acc[d._id || 'unknown'] = d.count;
          return acc;
        }, {}),
        browserStats: browserStats.reduce((acc, b) => {
          acc[b._id || 'unknown'] = b.count;
          return acc;
        }, {}),
        dailyVisitors,
        topPages
      }
    });
    
  } catch (error) {
    console.error('Visitor stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des statistiques'
    });
  }
});

// GET /api/visitors/:id - Get visitor details
router.get('/:id', async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id);
    
    if (!visitor) {
      return res.status(404).json({
        success: false,
        message: 'Visiteur non trouvé'
      });
    }
    
    res.json({
      success: true,
      data: visitor
    });
    
  } catch (error) {
    console.error('Get visitor error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du visiteur'
    });
  }
});

// DELETE /api/visitors/:id - Delete a visitor
router.delete('/:id', async (req, res) => {
  try {
    await Visitor.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Visiteur supprimé' });
  } catch (error) {
    console.error('Delete visitor error:', error);
    res.status(500).json({ success: false, message: 'Erreur de suppression' });
  }
});

module.exports = router;
