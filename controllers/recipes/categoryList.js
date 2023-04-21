// const { wrapper } = require("../../middlewares/wrapper");
// const { Recipe } = require("../../models/Recipe");
// const { HttpError } = require("../../utils/HttpError");

// let getCategoryList = async (req, res, next) => {
//   const categories = await Recipe.find({}, { category: 1, _id: 0 }).sort({
//     category: 1,
//   });

//   if (!categories) {
//     throw new HttpError(404, "Not found");
//   }

//   const uniqueCategories = categories
//     .map((category) => {
//       return category.category;
//     })
//     .filter((category, index, array) => array.indexOf(category) === index);

//   res.status(200).json(uniqueCategories);
// };

// getCategoryList = wrapper(getCategoryList);

// module.exports = { getCategoryList };
