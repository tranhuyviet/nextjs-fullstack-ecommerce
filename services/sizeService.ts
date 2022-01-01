import Size, { SizeDocument } from '../models/sizeModel';

const save = async (size: SizeDocument): Promise<SizeDocument> => {
    return size.save();
};

const findByName = async (name: string): Promise<SizeDocument> => {
    return Size.findOne({ name: name.toLowerCase() });
};

const findById = async (_id: string): Promise<SizeDocument> => {
    return Size.findById(_id);
};

const getAllSizes = async (): Promise<SizeDocument[]> => {
    return Size.find({});
};

const updateSize = async (
    _id: string,
    variables: SizeDocument
): Promise<SizeDocument> => {
    return Size.findByIdAndUpdate(_id, variables, {
        new: true,
        runValidators: true,
    });
};

const deleteSize = async (_id: string): Promise<SizeDocument> => {
    return Size.findByIdAndDelete(_id);
};

const sizeService = {
    save,
    findByName,
    findById,
    getAllSizes,
    updateSize,
    deleteSize,
};

export default sizeService;
