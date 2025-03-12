import organizationGasModel from "../models/OrganizationGasStock.js";

const getOrganziationGasDetails = async(req , res) =>
{
    try 
    {
        const gasTypes = await organizationGasModel.find({}) //get all the gas details

        res.status(200).json({ success: true, gasTypes })
    } catch (error) 
    {
        console.error("Error fetching organization gas data:", error);

        res.status(500).json({ success: false, message: "Error fetching organization gas data" });
    }
}

export {getOrganziationGasDetails}

