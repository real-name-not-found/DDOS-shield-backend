const mongoose = require('mongoose');

const ipAnalysisSchema = new mongoose.Schema({
  ipAddress: {
     type: String, 
     required: true 
    },
  abuseScore: { 
    type: Number, 
    required: true
    },
  country: { 
    type: String 
    },
  isp: {
     type: String 
    },
  totalReports: {
     type: Number 
    },
  analyzedAt: {
     type: Date, 
     default: Date.now 
    }
});


const IPAnalysis = mongoose.model('IPAnalysis', ipAnalysisSchema);
module.exports = IPAnalysis;