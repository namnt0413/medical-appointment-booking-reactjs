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

let getAllSpecialty = async (req, res) => {
    try {
        let response = await specialtyService.getAllSpecialty();
        return res.status(200).json(response)
    } catch (error) {
        console.error(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let handleDeleteSpecialty = async (req, res) => {
    try {
        let response = await specialtyService.deleteSpecialty(req.body.id);
        return res.status(200).json(response)
    } catch (error) {
        console.error(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let handleUpdateSpecialty = async (req, res) => {
    try {
        let data = req.body;
        // console.log(data)
        let response = await specialtyService.updateSpecialty(data);
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
    createNewSpecailty , getAllSpecialty , handleDeleteSpecialty, handleUpdateSpecialty
}