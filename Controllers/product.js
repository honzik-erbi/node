const Product = require("../Models/product");

exports.getAllProducts = async (req, res) => {
  try {
    const Data = await Product.find();
    if (Data) {
      return res.status(200).send({
        msg: "Produkty nalezeny",
        Data,
      });
    }
    res.status(500).send({
      msg: "product failed",
    });
  } catch (error) {
    res.status(500).send({
      error,
    });
  };
};

exports.getProductsByID = async (req, res) => {
    try {
        const Data = await Product.findById(req.params.id)
        if(Data){
            return res.status(200).send({
                msg: "Produkt nalezen",
                Data,
            });
        };
      res.status(500).send({
        msg: "Product Failed"
      });  
    } 
    catch (error) {
        res.status(500).send({
            error
        });
    };
};

exports.createProduct = async (req, res) => {
    try {
        const Data = new Product({
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity,
            smallDescription: req.body.smallDescription,
            description: req.body.description,
        });
        const result = await Data.save();
        if (result){
            return res.status(201).send({
                msg: "Produkt byl vytvořen",
                Data,
                createdProduct: {
                    url: `http://localhost:3000/users/${result._id}`,
                    result,
                  }
            });
        };
        res.status(500).send({
            msg: "Prduct Failed"
        });
    }
    catch (error) {
        res.status(500).send({
            error
        });
    };
};

exports.updateProduct = async (req, res) => {
    try {
        const Data = {
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity,
            smallDescription: req.body.smallDescription,
            description: req.body.description,
        }
        const result = await Product.findByIdAndUpdate(req.params.id, Data)
        if (result) {
            return res.status(201).send({
              msg: "Produkt byl aktualizován",
              Data,
            });
          }
        if(Data)
        res.status(500).send({
            msg: "Produkt Failed"
        })
    } catch (error) {
        res.status(500).send({
            error
        })
    }
}

exports.patchProduct = async (req, res) => {
    const update = {};
    for (const ops of req.body){
        update[ops.propName] = ops.value;
    }
    const result = await Product.findByIdAndUpdate(req.params.id, update)
    try {
        if(result){
            return res.status(201).send({
                msg: "Produkt patched",
                createdProduct: {
                    url: `http://localhost:3000/users/${result._id}`,
                    result,
                  },
            })
        }
    } 
    catch (error) {
        res.status(500).send({
            error
        })
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const Data = await Product.findByIdAndDelete(req.params.id)
        if(Data){
            return res.status(200).send({
                msg: "Produkt byl odstraněn",
                Data
            })
        }
        res.status(500).send({
            msg: "Produkt Failed"
        })
    } catch (error) {
        res.status(500).send({
            error
        })
    }
}
