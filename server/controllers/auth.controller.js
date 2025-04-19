

export const getHomePage = (req, res) => {

  try {
    res.status(200).send("Home page 'api/auth' router root.");
  } catch (error) {
    console.log(error);
  }
};

export const getRegisterPage = (req, res) => {

  try {
    console.log(req.body);
    // res.status(200).json({ message: req.body });
    res.status(200).json(req.body);
  } catch (error) {
    res.status(404).json({ message: "this api root not found" });
    console.log(error);
  }
};