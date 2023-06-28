const Blog = require("../models/blog");
const Category = require("../models/category");

const { Op } = require("sequelize");
const Comment = require("../models/comment");
const User = require("../models/user");

exports.blogs_details = async function (req, res) {
  const slug = req.params.slug;
  try {
    const blog = await Blog.findOne({
      where: {
        url: slug,
      },
      raw: true,
    });

    const blogComments = await Comment.findAll({
      //hatirla commentleri blog ve user bilgileri ile beraber almaya yariyor onemli
      where: {
        blogId: blog.id,
      },
      include: [
        { model: User, as: "user", attributes: ["fullname"] }, // Sadece kullanıcının ismini alın
        { model: Blog, as: "blog", attributes: ["baslik"] }, // Sadece blogun başlığını alın
      ],
    });

    if (blog) {
      return res.render("users/blog-details", {
        title: blog.baslik,
        blog: blog,
        comment: blogComments,
      });
    }
    res.redirect("/404");
  } catch (err) {
    console.log(err);
  }
};
exports.blogs_details_comment = async function (req, res) {
  const slug = req.params.slug;
  const content = req.body.content;
  const userid = req.session.userid;
  const blogid = req.body.blogid;

  try {
    const comment = await Comment.create({
      content: content,
      userId: userid,
      blogId: blogid,
    });
    await comment.addUser(userid);
    await comment.addBlog(blogid);

    res.redirect(slug);
  } catch (err) {
    console.log(err);
  }
};

exports.blog_list = async function (req, res) {
  const size = 3;
  const { page = 0 } = req.query;
  const slug = req.params.slug;

  try {
    const { rows, count } = await Blog.findAndCountAll({
      where: { onay: { [Op.eq]: true } },
      raw: true,
      include: slug ? { model: Category, where: { url: slug } } : null,
      limit: size,
      offset: page * size,
    });
    const categories = await Category.findAll({ raw: true });

    res.render("users/blogs", {
      title: "Tüm Kurslar",
      blogs: rows,
      totalItem: count,
      totalPages: Math.ceil(count / size),
      currentPage: page,
      categories: categories,
      selectedCategory: slug,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.index = async function (req, res) {
  try {
    const blogs = await Blog.findAll({
      where: {
        [Op.and]: [{ anasayfa: true }, { onay: true }],
      },
      raw: true,
    });
    const categories = await Category.findAll({ raw: true });

    res.render("users/index", {
      title: "Popüler Kurslar",
      blogs: blogs,
      categories: categories,
      selectedCategory: null,
    });
  } catch (err) {
    console.log(err);
  }
};
