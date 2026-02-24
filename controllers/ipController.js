const axios = require('axios');
const IPAnalysis = require('../models/IPanalysis');

// analyze an IP — calls AbuseIPDB, saves to DB, returns result
const analyzeIP = async (req, res) => {
  try {
    const ip = req.params.ip;

    // call AbuseIPDB
    const response = await axios.get('https://api.abuseipdb.com/api/v2/check', {
      headers: {
        'Key': process.env.ABUSEIPDB_API_KEY,
        'Accept': 'application/json'
      },
      params: {
        ipAddress: ip,
        maxAgeInDays: 90
      }
    });

    const data = response.data.data;

    // save result to MongoDB
    const saved = await IPAnalysis.create({
      ipAddress: data.ipAddress,
      abuseScore: data.abuseConfidenceScore,
      country: data.countryCode,
      isp: data.isp,
      totalReports: data.totalReports
    });

    // send back to frontend
    res.status(200).json(saved);

  } catch (err) {
    console.error('analyzeIP error:', err.message);
    res.status(500).json({ error: err.message });
  }
};

// get all previously analyzed IPs from database
const getHistory = async (req, res) => {
  try {
    const history = await IPAnalysis.find().sort({ analyzedAt: -1 });
    res.status(200).json(history);
  } catch (err) {
    console.error('getHistory error:', err.message);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { analyzeIP, getHistory };