import { Request, Response } from "express";
import { IColor } from "../../types/color";
import Color from "../../models/color";

const getColors = async (req: Request, res: Response): Promise<void> => {
  try {
    const colors = await Color?.find({});
    res.status(200).json(colors);
  } catch (err) {
    const error = err as Error;
    res.status(500).send(error.message);
  }
};

const getMaxVotesColor = async (req: Request, res: Response): Promise<void> => {
  try {
    const color = await Color.find({}).sort({ votes: -1 }).limit(1);
    res.status(200).json(color[0].votes);
  } catch (err) {
    console.log(err);
    const error = err as Error;
    res.status(500).send(error.message);
  }
};

const addColor = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<IColor, "colorName" | "colorCode">;
    const color: IColor = new Color({
      colorCode: body.colorCode,
      colorName: body.colorName,
      votes: 0,
    });

    const newColor: IColor = await color.save();
    const allColors: IColor[] = await Color?.find({});

    res
      .status(201)
      .json({ message: "Color added", Color: newColor, Colors: allColors });
  } catch (error) {
    throw error;
  }
};

const updateColor = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
    } = req;
    const updateColor: IColor | null = await Color.findByIdAndUpdate(
      { _id: id },
      { $inc: { votes: 1 } }
    );
    const allColors: IColor[] = await Color.find();
    res.status(200).json({
      message: "Color updated",
      color: updateColor,
      colors: allColors,
    });
  } catch (error) {
    throw error;
  }
};

const deleteColor = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedColor: IColor | null = await Color.findByIdAndRemove(
            req.params.id
        )
        const allColors: IColor[] = await Color.find()
        res.status(200).json({
            message: 'Color deleted',
            color: deletedColor,
            colors:allColors,
        })
    } catch (error) {
        throw error
    }
};

export { getColors, addColor, updateColor, getMaxVotesColor,deleteColor };
