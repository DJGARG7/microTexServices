const sendResponse = (res, err, data) => {
    if(err) {
        res.status(400).send(err);
    } else {
        res.send(data);
    }
}

module.exports = {sendResponse};
