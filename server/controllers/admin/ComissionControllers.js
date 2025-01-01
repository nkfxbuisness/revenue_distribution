// const { createObjectCsvWriter, createObjectCsvStringifier } = require("csv-writer");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const fs = require("fs");
// const path = require("path"); // Import the path module
const Profit = require("../../models/profitModel");
const User = require("../../models/userModel");
let mongoose = require("mongoose");
const getFormattedDate = require("../../config/dates/getFormattedDate");
const { log } = require("console");
const Progress = require("../../models/progressModel");

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// calculate monthly profit
const totalProfitForAMonth = async (req, res) => {
  const { month } = req.params; // month format: "YYYY-MM"
  const startOfMonth = new Date(`${month}-01`);
  const endOfMonth = new Date(startOfMonth);
  endOfMonth.setMonth(endOfMonth.getMonth() + 1);

  try {
    const totalProfit = await Profit.aggregate([
      {
        $match: {
          date: { $gte: startOfMonth, $lt: endOfMonth },
        },
      },
      {
        $group: {
          _id: null,
          totalProfit: { $sum: "$masterProfit" },
        },
      },
    ]);

    const result = totalProfit.length > 0 ? totalProfit[0].totalProfit : 0;

    res.status(200).json({
      success: true,
      totalProfit: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving profits",
      error: error.message,
    });
  }
};


// Route to calculate commission
const calculateComission = async (req, res) => {
  const {totalProfit , arr , month} = req.body;
  try {
    
    // const totalProfit = 200;
    // const arr = [40, 20, 10, 8, 4, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 0.6, 0.6, 0.6, 0.6, 0.6,];
    // const month = "2024-12";

    const batchSize = 2;

    // Step 1: Initialize or retrieve progress tracking
    let progress = await Progress.findOne({ taskName: `commissionCalculation${month}` });

    if(progress && progress.status==="completed"){
      return res.status(200).json({
        success:false,
        message:`comission already distributed for ${month}`
      })
    }
    if (!progress) {
      const totalUsers = await User.countDocuments({
        "activationStatus.active": true,
        "activationStatus.suspended": false,
      });
      progress = await Progress.create({
        taskName: `commissionCalculation${month}`,
        totalUsers,
        totalProfit,
        processedUsers: 0,
      });
    }

    // Initialize grand total
    let grandTotal = 0;

    // Step 2: Process users in batches
    const { totalUsers, processedUsers } = progress;

    while (progress.processedUsers < totalUsers) {
      await delay(10000);
      const users = await User.find(
        {
          "activationStatus.active": true,
          "activationStatus.suspended": false,
        },
        { _id: 1, name: 1 }
      )
        .limit(batchSize)
        .skip(progress.processedUsers)
        .lean();

      const bulkOps = [];

      for (let user of users) {
        const result = await User.aggregate([
          { $match: { _id: user._id } },
          {
            $graphLookup: {
              from: "users",
              startWith: "$_id",
              connectFromField: "_id",
              connectToField: "parent",
              depthField: "level",
              maxDepth: 20,
              as: "descendants",
              restrictSearchWithMatch: {
                "activationStatus.active": true,
                "activationStatus.suspended": false,
              },
            },
          },
          {
            $project: {
              "descendants.copyProportion": 1,
              "descendants.level": 1,
              "descendants._id": 1,
            },
          },
        ]);

        let totalCommission = 0;
        result[0]?.descendants.forEach((child) => {
          const level = child.level;
          if (level < arr.length) {
            const commission =
              totalProfit *
              child.copyProportion *
              (50 / 100) *
              (35 / 100) *
              (arr[level] / 100);
            totalCommission += commission;
          }
        });

        // Accumulate the user's total commission to the grand total
        grandTotal += totalCommission;
        console.log(user, totalCommission);

        bulkOps.push({
          updateOne: {
            filter: { _id: user._id },
            update: {
              $inc: { walletBalance: totalCommission },
              $push: {
                creditData: {
                  amount: totalCommission,
                  month: month,
                  date: new Date(),
                },
              },
            },
          },
        });
      }

      // Execute bulk operations
      if (bulkOps.length > 0) {
        await User.bulkWrite(bulkOps);
      }

      // Update progress in the database
      progress.processedUsers += users.length;
      progress.lastUpdated = new Date();
      await progress.save();

      console.log(
        `Progress: ${(progress.processedUsers / totalUsers) * 100}% completed`
      );
    }

    // Mark the task as completed
    progress.status = "completed";
    progress.totalComissionDistributed = grandTotal;
    progress.lastUpdated = new Date();
    await progress.save();

    return res
      .status(200)
      .json({success:true,grandTotal: grandTotal, message: "Commission calculation completed successfully" });
  } catch (error) {
    console.error("Error calculating commissions:", error);

    // Update progress with failure status
    await Progress.updateOne(
      { taskName: `commissionCalculation${month}` },
      { status: "failed", lastUpdated: new Date() }
    );

    return res
      .status(500)
      .json({ message: "An error occurred during commission calculation" });
  }
};

// track progress 
const trackProgress = async(req,res)=>{
  const {month} = req.params;
  try {
    const progress = await Progress.findOne({
      taskName: `commissionCalculation${month}`,
    });
    if (!progress) {
      return res.json({success:false, message: "No task progress found" });
    }
    return res.status(200).json({
      success:true,
      totalUsers: progress.totalUsers,
      processedUsers: progress.processedUsers,
      status: progress.status,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching progress data" });
  }
}


// const downloadComissionRepost = async (req, res) => {
//   const monthInput = req.params.month; // e.g., "2018-03"

//   try {
//     // Parse the input month into start and end dates
//     const startDate = new Date(`${monthInput}-01`);
//     const endDate = new Date(startDate);
//     endDate.setMonth(endDate.getMonth() + 1); // Move to the next month

//     // MongoDB aggregation pipeline
//     // const users = await User.aggregate([
//     //   {
//     //     $match: {
//     //       "activationStatus.active": true,
//     //       "activationStatus.suspended": false,
//     //     },
//     //   },
//     //   {
//     //     $project: {
//     //       name: 1, // Include the name field
//     //       creditData: {
//     //         $filter: {
//     //           input: "$creditData",
//     //           as: "credit",
//     //           cond: {
//     //             $and: [
//     //               { $gte: ["$$credit.month", startDate] },
//     //               { $lt: ["$$credit.month", endDate] },
//     //             ],
//     //           },
//     //         },
//     //       },
//     //     },
//     //   },
//     //   { $unwind: "$creditData" }, // Flatten the creditData array
//     //   {
//     //     $project: {
//     //       name: 1,
//     //       amount: "$creditData.amount",
//     //       date: "$creditData.date",
//     //     },
//     //   },
//     // ]);

//     // // If no data is found
//     // if (users.length === 0) {
//     //   return res.status(404).json({
//     //     success: false,
//     //     message: "No data found for the given month.",
//     //   });
//     // }

//     // // Format the data for CSV
//     // const formattedUsers = users.map((user) => ({
//     //   name: user.name,
//     //   amount: user.amount,
//     //   date: getFormattedDate(user.date), // Format the date
//     // }));

//     const formattedUsers = [
//       { name: "0_Root ", amount: 49, date: "18 December, 2024" },
//       { name: "level1 user1 ", amount: 42, date: "18 December, 2024" },
//       { name: "level2 user1 ", amount: 28, date: "18 December, 2024" },
//       { name: "level3 user1 ", amount: 0, date: "18 December, 2024" },
//       { name: "level10 user1 ", amount: 0, date: "18 December, 2024" },
//       { name: "0_Root ", amount: 49, date: "18 December, 2024" },
//       { name: "level1 user1 ", amount: 42, date: "18 December, 2024" },
//       { name: "level2 user1 ", amount: 28, date: "18 December, 2024" },
//       { name: "level3 user1 ", amount: 0, date: "18 December, 2024" },
//       { name: "level10 user1 ", amount: 0, date: "18 December, 2024" },
//       { name: "0_Root ", amount: 49, date: "18 December, 2024" },
//       { name: "level1 user1 ", amount: 42, date: "18 December, 2024" },
//       { name: "level2 user1 ", amount: 28, date: "18 December, 2024" },
//       { name: "level3 user1 ", amount: 0, date: "18 December, 2024" },
//       { name: "level10 user1 ", amount: 0, date: "18 December, 2024" },
//       { name: "0_Root ", amount: 49, date: "18 December, 2024" },
//       { name: "level1 user1 ", amount: 42, date: "18 December, 2024" },
//       { name: "level2 user1 ", amount: 28, date: "18 December, 2024" },
//       { name: "level3 user1 ", amount: 0, date: "18 December, 2024" },
//       { name: "level10 user1 ", amount: 0, date: "18 December, 2024" },
//     ];
//     try {
//       const records = await csvWriter.writeRecords(formattedUsers);
//       const csvContent = records.join('\n');
  
//       res.setHeader('Content-Type', 'text/csv');
//       res.setHeader('Content-Disposition', 'attachment; filename="data.csv"');
//       res.send(csvContent);
//     } catch (error) {
//       console.error('Error generating CSV file:', error);
//       res.status(500).send('Error generating CSV file');
//     }
//     // Create the CSV stringifier
//     // const csvStringifier = createObjectCsvStringifier({
//     //   header: [
//     //     { id: "name", title: "Name" },
//     //     { id: "amount", title: "Amount" },
//     //     { id: "date", title: "Date" },
//     //   ],
//     //   alwaysQuote: false, // Ensure fields are not always quoted
//     // });

//     // // Generate the CSV string
//     // const csvHeader = csvStringifier.getHeaderString();
//     // const csvBody = csvStringifier.stringifyRecords(formattedUsers);

//     // const csvContent = csvHeader + csvBody;
//     // console.log(csvContent);

//     // // Set headers to prompt a download
//     // res.setHeader("Content-Type", "text/csv");
//     // res.setHeader(
//     //   "Content-Disposition",
//     //   `attachment; filename="credit-data-${monthInput}.csv"`
//     // );

//     // // Send the CSV content
//     // return res.status(200).send(csvContent);
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ message: "An error occurred.", error });
//   }
// };

const downloadComissionRepost = async (req, res) => {
  const monthInput = req.params.month; // e.g., "2018-03"

  try {
    // Parse the input month into start and end dates
    const startDate = new Date(`${monthInput}-01`);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1); // Move to the next month

    // MongoDB aggregation pipeline
    const users = await User.aggregate([
      {
        $match: {
          active: true,
          suspended: false,
        },
      },
      {
        $project: {
          name: 1, // Include the name field
          creditData: {
            $filter: {
              input: "$creditData",
              as: "credit",
              cond: {
                $and: [
                  { $gte: ["$$credit.month", startDate] },
                  { $lt: ["$$credit.month", endDate] },
                ],
              },
            },
          },
        },
      },
      { $unwind: "$creditData" }, // Flatten the creditData array
      {
        $project: {
          name: 1,
          amount: "$creditData.amount",
          date: "$creditData.date",
        },
      },
    ]);

    //  If no data is found
    if (users.length === 0) {
      return res.json({
        success: false,
        message: "No data found for the given month."
      });
    }
    console.log(users);
    

    // // Post-process to format the date using getFormattedDate
    // const formattedUsers = users.map((user) => ({
    //   name: user.name,
    //   amount: user.amount,
    //   date: getFormattedDate(user.date), // Apply your custom date formatting
    // }));

    // // Define the CSV file path
    // const filePath = path.join(__dirname, `credit-data-${monthInput}.csv`);

    // // Create the CSV file using csv-writer
    // const csvWriter = createObjectCsvWriter({
    //   path: filePath,
    //   header: [
    //     { id: "name", title: "Name" },
    //     { id: "amount", title: "Amount" },
    //     { id: "date", title: "Date" },
    //   ],
    // });

    // // Write the formatted data into the CSV file
    // await csvWriter.writeRecords(formattedUsers);

    // // Send the file as a downloadable response
    // res.setHeader("Content-Disposition", `attachment; filename="credit-data-${monthInput}.csv"`);
    // res.setHeader("Content-Type", "text/csv");

    // res.download(filePath, (err) => {
    //   if (err) {
    //     console.error("Error downloading the file:", err);
    //     res.status(500).send({ message: "Error while downloading the file." });
    //   } else {
    //     // Ensure the file is deleted after download is complete
    //     setTimeout(() => {
    //       fs.unlink(filePath, (err) => {
    //         if (err) console.error("Error deleting the file:", err);
    //       });
    //     }, 1000); // Add a small delay to ensure download completion
    //   }
    // });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "An error occurred.", error });
  }
};


module.exports = {
  totalProfitForAMonth,
  calculateComission,
  trackProgress,
  downloadComissionRepost,
};
