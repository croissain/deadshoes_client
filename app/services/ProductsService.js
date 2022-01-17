const { models } = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// exports.pagin = async (term, color, price_start, price_end, limit = 2, skip) => {
//     const condition = (term||color||price_start||price_end) ? {
//         [Op.or]: [
//             { productname: { [Op.iLike]: `%${term}%` } },
//             { color: { [Op.iLike]: `%${color}%` } },
//             { price: {
//                 [Op.between]: [price_start, price_end]
//             } }
//         ]
//     } : null;
//     const result = await models.products.findAndCountAll({
//         where: condition,
//         limit: 2,
//         offset: skip,
//         raw: true,
//     });

//     console.log(result);
//     return result;
// }

exports.listProduct = (term, limit, offset) => {
    const condition = term ? {
        productname: { [Op.iLike]: `%${term}%` },
    } : null;

    return models.products.findAndCountAll({
        where: condition,
        limit: limit,
        offset: offset,
        raw: true,
    });
}

exports.filter = async (color, price_start, price_end, name, brand, sortByPrice, limit, offset) => {
    if(!sortByPrice) {
        sortByPrice ='ASC'
    }
    const result = await models.products.findAndCountAll({
        where: {
            color: { [Op.iLike]: `%${color}%` },
            productname: { [Op.iLike]: `%${name}%` },
            price: {
                [Op.between]: [price_start, price_end]
            },
            brand: { [Op.iLike]: `%${brand}%` },
        },
        order: [
            ['price', sortByPrice],
        ],
        limit: limit,
        offset: offset,
        raw: true,
    });
    
    return result;
}



exports.loadShoeSize = async(id) => {
    return await models.shoessize.findAndCountAll({
        where: {
            productid: id
        },
        order: [['size', 'ASC']],
        raw: true
    });
}

exports.searchByName = (term, page = 0, itemPerPage = 9) => {
    return models.products.findAndCountAll({
        where: {
            productname: { [Op.iLike]: '%' + term + '%' }
        },
        offset: (page * itemPerPage),
        limit: itemPerPage,
        raw: true,
    });
}

exports.show = async (id) => {
    return await models.products.findOne({
        where: { productid: id },
        raw: true,
    });
}

exports.index = (page = 0, itemPerPage = 9) => {

    return models.products.findAll({
        offset: (page * itemPerPage),
        limit: itemPerPage,
        raw: true,
    });
};

exports.createFeedback = async (data) => {
    return models.comments.create({name: data.username, content: data.feedback, productid: data.productid, account_id: data.accountid});
}

exports.loadFeedbacks = async(id) => {
    return await models.comments.findAndCountAll({
        where: {
            productid: id
        },
        raw: true
    });
}


exports.loadRelatedProducts = async(id, brand, price, limit) => {
    const result = await models.products.findAll({
        where: {
            productid: {  [Op.ne]: id  },
            [Op.or]: [
                {
                    brand: { [Op.iLike]: `%${brand}%` },
                },
                {
                  price: price
                }
              ]
        },
        raw: true,
        limit: limit,
    });
    return result;
}