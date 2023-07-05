import User from '../../models/schemas/user.js';

export const getFavoriteProducts = async (req, res) => {
  try {
    const { uid } = req.params; 
    const user = await User.findOne({ uid }); 

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const favoriteProducts = user.favorites; 

    res.status(200).json(favoriteProducts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch favorite products', error: error.message });
  }
};
