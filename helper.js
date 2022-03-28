const sendResponse = (res, err, data) => {
    if(err) {
        console.log(err)
        res.status(400).send(err);
    } else {
        res.send(data);
    }
}

module.exports = {sendResponse};
