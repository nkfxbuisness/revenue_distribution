const fs = require("fs");
const moment = require("moment");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const WithdrawalRequest = require("../../models/withdrawalRequestModel");
const Variable = require("../../models/variableModel");
/**
 * Route     /api/admin/getAllWithdrawalRequests
 * Des       get All Withdrawal Requests that are not paid yet
 * Params    none
 * Access    private
 * Method    get
 */

const getAllWithdrawalRequests = async (req, res) => {
    try {
      const requests = await WithdrawalRequest.find({ paid: false }).populate(
        "user",
        "name mobileNo accountNo IFSCcode bank activationStatus"
      );
  
      // Filter out requests where the user is suspended
      const filteredRequests = requests.filter(
        (request) => request.user && !request.user.activationStatus.suspended
      );
  
      return res.status(200).json({
        success: true,
        message: "withdrawal requests featched successfully",
        data: filteredRequests,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  /**
   * Route     /api/admin/download-pending-requests
   * Des       download all pending requests in CSV format
   * Params    none
   * Access    private
   * Method    post
   */
  
  const downloadInCSVformat = async (req, res) => {
    try {
      // Get pendingRequests data from the request body
      const { pendingRequests } = req.body;
  
      if (!pendingRequests || !pendingRequests.length) {
        return res.json({
          success: false,
          message: "No pending requests provided",
        });
      }
  
      // Define the path and filename for the CSV
      const filePath = "pending_requests.csv";
  
      // Prepare data for CSV
      const csvData = pendingRequests.map((request, index) => ({
        No: index + 1,
        Name: request.user.name,
        "Account Number": `="${request.user.accountNo}"`, // Format account number to avoid scientific notation
        "IFSC Code": request.user.IFSCcode,
        Bank: request.user.bank,
        Date: getFormattedDate(request.date),
        Amount: request.amount,
      }));
  
      // Define the structure of the CSV
      const csvWriter = createCsvWriter({
        path: filePath,
        header: [
          { id: "No", title: "No." },
          { id: "Name", title: "Name" },
          { id: "Account Number", title: "Account Number" },
          { id: "IFSC Code", title: "IFSC Code" },
          { id: "Bank", title: "Bank" },
          { id: "Date", title: "Date" },
          { id: "Amount", title: "Amount" },
        ],
        alwaysQuote: false, // Ensure fields are not always quoted
      });
  
      // Write data to CSV
      await csvWriter.writeRecords(csvData);
  
      // Set headers for the response to prompt a download
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", `attachment; filename="${filePath}"`);
  
      // Stream the file to the response
      fs.createReadStream(filePath).pipe(res);
    } catch (error) {
      console.error("Error generating CSV file:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  /**
   * Route     /api/admin/update-paid-status
   * Des       update as paid to all pending requests
   * Params    none
   * Access    private
   * Method    put
   */
  
  const updatePaidStatus = async (req, res) => {
    const { ids } = req.body; // Array of withdrawal request IDs
  
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No IDs provided or invalid data format",
      });
    }
  
    try {
      // First, find all the withdrawal requests to get their associated users
      const requests = await WithdrawalRequest.find({ _id: { $in: ids } })
        .select("user")
        .lean(); // Use .lean() to return plain JavaScript objects for performance
  
      const userIds = [...new Set(requests.map((req) => req.user.toString()))]; // Get unique user IDs
  
      // Create bulk operations for withdrawal requests
      const bulkWithdrawals = ids.map((id) => ({
        updateOne: {
          filter: { _id: id },
          update: { $set: { paid: true, paidOn: new Date() } },
        },
      }));
  
      // Create bulk operations for user updates
      const bulkUsers = userIds.map((userId) => ({
        updateOne: {
          filter: { _id: userId },
          update: { $set: { withdrawalRequestSubmitted: false } },
        },
      }));
  
      // Perform bulk write for both withdrawal requests and users
      const [withdrawalResult, userResult] = await Promise.all([
        WithdrawalRequest.bulkWrite(bulkWithdrawals),
        User.bulkWrite(bulkUsers),
      ]);
  
      res.status(200).json({
        success: true,
        message: `Successfully updated ${withdrawalResult.modifiedCount} withdrawal requests and ${userResult.modifiedCount} users.`,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error updating records",
        error: error.message,
      });
    }
  };

  module.exports = {
    getAllWithdrawalRequests,
    downloadInCSVformat,
    updatePaidStatus
  }