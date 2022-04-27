const router = require("express").Router();

// imports for sale transactions
const getJobStocks = require("../controllers/sales/getJobStocks");
const addChallan = require("../controllers/sales/addChallan");
const getChallan = require("../controllers/sales/getChallan");
const getChallanDetails = require("../controllers/sales/getChallanDetails");
const makeBill = require("../controllers/sales/makeBill");

// routes for sale transactions
router.get("/jobStocks/:clothType", getJobStocks);
router.post("", addChallan); // adds data to sales_order
router.get("/sales_order/:status", getChallan); // fetch from sales_order
router.get("/sales_detail/:BILL_NO", getChallanDetails); // fetch from sales_order_details
router.post("/transact", makeBill); //make the bill and call transaction service

module.exports = router;
