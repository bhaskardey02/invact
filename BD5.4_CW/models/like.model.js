 let { DataTypes, sequelize } = require("../ib");
 let { user } = require("./user.model");
 let { track } = require("./track.model");

 let like = sequelize.define("like," {
   userId: {
     type: DataTypes.INTEGER,
     reference: {
       model: user,
       key: "id",
     },
   },
   trackId:{
     type: DataTypes.INTEGER,
     references: {
       model: track,
       key: "id",
     },
   },
 });

 user.belongsToMany(user, { through: like});
 user.belongsToMany(track, { through: like});

 module.exports = { like };