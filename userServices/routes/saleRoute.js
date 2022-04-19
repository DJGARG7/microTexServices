const router = require("express").Router();

// imports for sale transactions
const makeBill = require("../controllers/sales/makeBill");
const addChallan = require("../controllers/sales/addChallan");
const getChallan = require("../controllers/sales/getChallan");
const getChallanDetails = require("../controllers/sales/getChallanDetails");

// routes for sale transactions
router.get("/sales_order", getChallan); // all the bill info detched
router.get("/sales_detail/:BILL_NO", getChallanDetails); // all the bill info detched
router.post("", addChallan); // adds data to greypurchase table
router.post("/transact", makeBill); //make the bill and call transaction service

module.exports = router;
