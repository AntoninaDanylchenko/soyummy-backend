const { wrapper } = require("../../middlewares/wrapper");
const { Recipe } = require("../../models/Recipe");

let getCategoryList = async (req, res, next) => {
  const categories = await Recipe.find({}, { category: 1, _id: 0 }).sort({
    category: 1,
  });
  const uniqueCategories = categories.map((category) =>
    Object.values(category)
  );
  //   console.log(uniqueCategories);
  res.status(200).json(uniqueCategories);
};

getCategoryList = wrapper(getCategoryList);

module.exports = { getCategoryList };
