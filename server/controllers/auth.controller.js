

export const getHomePage = (req, res) => {

  try {
    res.status(200).send("Home page 'api/auth' router root.");
  } catch (error) {
    console.log(error);
  }
};

export const getRegisterPage = (req, res) => {

  try {
    res.status(200).send("Register page 'api/auth' router root.");
  } catch (error) {
    res.status(404).send({ message: "this api root not found" });
    console.log(error);
  }
};