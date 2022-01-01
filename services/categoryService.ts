import Category, { CategoryDocument } from '../models/categoryModel';

const save = async (category: CategoryDocument): Promise<CategoryDocument> => {
    return category.save();
};

const findByName = async (name: string): Promise<CategoryDocument> => {
    return Category.findOne({ name: name.toLowerCase() });
};

const findById = async (_id: string): Promise<CategoryDocument> => {
    return Category.findById(_id);
};

const getAllCategories = async (): Promise<CategoryDocument[]> => {
    return Category.find({});
};

const updateCategory = async (
    _id: string,
    variables: CategoryDocument
): Promise<CategoryDocument> => {
    return Category.findByIdAndUpdate(_id, variables, {
        new: true,
        runValidators: true,
    });
};

const deleteCategory = async (_id: string): Promise<CategoryDocument> => {
    return Category.findByIdAndDelete(_id);
};

const categoryService = {
    save,
    findByName,
    findById,
    getAllCategories,
    updateCategory,
    deleteCategory,
};

export default categoryService;
