import Contact from "../models/contact.model.js";

export const postContactForm = async (req, res) => {

  try {
    // console.log(req.body);
    const { name, email, phone, message } = req.body;

    const contactCreated = await Contact.create({ name, email, phone, message });

    return res.status(200).json({
      status: "200",
      message: "Contact Create Successfully",
      // Id: contactCreated._id.toString(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};