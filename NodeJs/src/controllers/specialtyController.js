import specialtyService from '../services/specialtyService'

let createNewSpecailty = async (req, res) => {
    try {
        let response = await specialtyService.createNewSpecailty(req.body);
        return res.status(200).json(response)
    } catch (error) {
        console.error(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

module.exports = {
    createNewSpecailty
}