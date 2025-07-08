
export const validate = (schema) => async (req, res, next) => {

  try {
    const parseBody = await schema.parseAsync(req.body)
    req.body = parseBody;
    next();
  } catch (err) {
    // console.error(err);
    const status = 422;
    const message = "Fill the input proper"
    const extraDetails = err.errors[0].message;

    const error = {
      status,
      message,
      extraDetails,
    }

    // console.log(message);
    // res.status(400).json({ message: message });
    next(error);
  }
}