import { Request, Response } from 'express';
import { ClothesService } from '../services/clothesService.js';
import supabase from '../utils/supaBaseClient.js';

const clothesService = new ClothesService();

export const getAllClothes = async (req: Request, res: Response) => {
  try {
    const clothes = await clothesService.getAllClothes();
    console.log('Clothes fetched from database:', clothes); // Debug log
    res.json(clothes);
  } catch (error) {
    console.error('Error fetching clothes:', error); // Log the actual error
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getClothesById = async (req: Request, res: Response) => {
  try {
    const clothes = await clothesService.getClothesById(req.params.id);
    if (clothes) {
      res.json(clothes);
    } else {
      res.status(404).json({ message: 'Clothes not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const searchClothes = async (req: Request, res: Response) => {
  try {
    const clothes = await clothesService.searchClothes(req.params.term);
    res.json(clothes);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getClothesByTag = async (req: Request, res: Response) => {
  try {
    const tag = req.params.tag;
    const clothes = await clothesService.getClothesByTag(tag);
    if (clothes.length > 0) {
      res.json(clothes);
    } else {
      res
        .status(404)
        .json({ message: 'No clothes found with the specified tag' });
    }
  } catch (error) {
    console.error('Error fetching clothes by tag:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createClothes = async (req: Request, res: Response) => {
  try {
    const newClothes = await clothesService.createClothes(req.body);
    res.status(201).json(newClothes);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const updateClothes = async (req: Request, res: Response) => {
  try {
    const updatedClothes = await clothesService.updateClothes(
      req.params.id,
      req.body
    );
    if (updatedClothes) {
      res.json(updatedClothes);
    } else {
      res.status(404).json({ message: 'Clothes not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const deleteClothes = async (req: Request, res: Response) => {
  try {
    const deletedClothes = await clothesService.deleteClothes(req.params.id);
    if (deletedClothes) {
      res.json({ message: 'Clothes deleted' });
    } else {
      res.status(404).json({ message: 'Clothes not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getAllTags = async (req: Request, res: Response) => {
  try {
    console.log('Fetching tags from Supabase...');
    const { data, error } = await supabase.from('clothes').select('tags');

    if (error) {
      console.error('Supabase error while fetching tags:', error.message);
      return res
        .status(500)
        .json({ message: 'Error fetching tags from database' });
    }

    console.log('Supabase returned data:', JSON.stringify(data, null, 2));

    if (!data || data.length === 0) {
      return res.status(404).json({ message: 'No clothes found' });
    }

    // Flatten tags array and count occurrences
    const tagCounts = data
      .flatMap((item: any) => item.tags || [])
      .reduce((acc: Record<string, number>, tag: string) => {
        acc[tag] = (acc[tag] || 0) + 1;
        return acc;
      }, {});

    // Convert tagCounts object to array of { name, count }
    const tags = Object.keys(tagCounts).map((key) => ({
      name: key,
      count: tagCounts[key],
    }));

    console.log('Extracted unique tags with counts:', tags);

    res.json(tags);
  } catch (err) {
    console.error('Unexpected error in getAllTags:', err);
    res.status(500).json({ message: 'Server Error', error: err });
  }
};
