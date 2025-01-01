const Profit = require("../../models/profitModel");
const { hasDateExceededToday, compareDates } = require("../../config/dates/compareDates")


/**
 * Route     /api/admin/getLastProfitEntry
 * Des       get the last profit entry
 * Params    none
 * Access    private
 * Method    get
 */
const getLastProfitEntry = async (req, res) => {
    try {
      const lastEntry = await Profit.findOne().sort({ createdAt: -1 });
      // console.log(lastEntry);
      if (!lastEntry) {
        return res.status(400).json({
          success: false,
          message: "last entry not found",
          data: {},
        });
      }
      return res.status(200).json({
        success: true,
        message: `the last entry is on ${lastEntry.date}`,
        data: lastEntry,
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  /**
   * Route     /api/admin/profitUpdate
   * Des       update daily profit
   * Params    none
   * Access    private
   * Method    post
   */
  
  const profitUpdate = async (req, res) => {
    const { date, profit } = req.body;
    console.log(date);
  
    if (!date || !profit) {
      return res.status(400).json({
        success: false,
        message: "Date and profit are required.",
        data: {},
      });
    }
    if (hasDateExceededToday(date)) {
      return res.json({
        success: false,
        message: "profit cannot be updated for day after today   !",
      });
    }
    try {
      const lastEntry = await Profit.findOne().sort({ createdAt: -1 });
      // console.log(lastEntry);
  
      if (!lastEntry) {
        const todaysProfit = await Profit.create({
          masterProfit: profit,
          date: date,
        });
        console.log(todaysProfit);
  
        return res.status(200).json({
          success: true,
          message: `profit updated for ${date}`,
          data: todaysProfit,
        });
      } else if (!compareDates(date, lastEntry.date)) {
        const todaysProfit = await Profit.create({
          masterProfit: profit,
          date: date,
        });
        console.log(todaysProfit);
  
        return res.status(200).json({
          success: true,
          message: `profit updated for ${date}`,
          data: todaysProfit,
        });
      } else if (compareDates(date, lastEntry.date)) {
        console.log("case 3");
  
        return res.status(200).json({
          success: false,
          message: `profit already been updated for ${date}`,
          data: {},
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

  module.exports = {
    getLastProfitEntry,
    profitUpdate
  }