import Service from "../models/service.model.js";

export const getServices = async (req, res) => {

  try {

    const response = await Service.find();

    if (!response) {
      res.status(404).json({ message: "No Service Found data" });
      return
    }

    res.status(200).json({ message: response });
  } catch (error) {
    res.status(404).json({ message: "Internal Server Error" });
    console.error(error);
  }

}