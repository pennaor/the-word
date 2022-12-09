'use strict';

module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    categoryId: {
      field: 'category_id',
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
    },
    postId: {
      field: 'post_id',
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
    },
  },
  {
    timestamps: false,
    tableName: 'posts_categories',
    underscored: true,
  });

  PostCategory.associate = ({ BlogPost, Category }) => {
    BlogPost.belongsToMany(Category, {
      as: 'categories',
      foreignKey: 'post_id',
      otherKey: 'category_id',
      through: PostCategory,
    });
    Category.belongsToMany(BlogPost, {
      as: 'blogs',
      foreignKey: 'category_id',
      otherKey: 'post_id',
      through: PostCategory,
    });
  }

  return PostCategory;
};
