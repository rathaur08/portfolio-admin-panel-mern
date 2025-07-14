import Contact from "../models/contact.model.js";
import User from "../models/user.model.js";

// Function to get all users , getAllUsers
export const getAllUsers = async (req, res) => {

  try {
    // const allUser = await User.find();
    const allUser = await User.find({}, { password: 0 });

    if (!allUser || allUser.length === 0) {
      return res.status(404).json({
        status: "404",
        message: "No Users Found",
      });
    }

    return res.status(200).json({
      status: "200",
      message: "All Users",
      data: allUser,
    });

  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
    console.error(error);
    next(error);
  }
};


// getUserById
export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findOne({ _id: id }, { password: 0 })


    if (!data || data.length === 0) {
      return res.status(404).json({
        status: "404",
        message: "No Users Found",
      });
    }

    return res.status(200).json({
      status: "200",
      message: "Users data",
      data: data,
    });

  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
    console.error(error);
    next(error);
  }
};


// updateUserById
export const updateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const Updateddata = await User.updateOne({ _id: id }, {
      $set: data,
    })

    if (!Updateddata || Updateddata.length === 0) {
      return res.status(404).json({
        status: "404",
        message: "No Users Found",
      });
    }

    return res.status(200).json({
      status: "200",
      message: "Users data",
      data: Updateddata,
    });

  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
    console.error(error);
    next(error);
  }
};

// deleteUserById

export const deleteUserById = async (req, res) => {

  try {
    const id = req.params.id;

    await User.deleteOne({ _id: id })

    return res.status(200).json({
      status: "200",
      message: "User Deleted",
    });

  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
    console.error(error);
    next(error);
  }

}

// Function to get all contacts, getAllContacts
export const getAllContacts = async (req, res, next) => {
  try {
    // Assuming you have a Contact model to fetch contacts
    const allContacts = await Contact.find();

    if (!allContacts || allContacts.length === 0) {
      return res.status(404).json({
        status: "404",
        message: "No Contacts Found",
      });
    }

    return res.status(200).json({
      status: "200",
      message: "All Contacts",
      data: allContacts,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
}