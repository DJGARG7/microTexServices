const sendResponse = (res, err, data) => {
    if(err) {
        res.error(err);
    } else {
        res.send(data);
    }
}

module.exports = sendResponse;
