const Product = require("../models/product");

exports.getAllProducts = async (req, res) => {
  try {
    const data = await Product.find();
    if (data && data.lenght !== 0) {
      return res.status(200).send({
        msg: "Produkty nalezeny",
        payload: data,
      });
    }
    res.status(500).send({
      msg: "Produkt nebyl nalazen",
    });
  } catch (error) {
    res.status(500).send({
      error,
    });
  };
};

exports.getProductsByID = async (req, res) => {
    try {
        const data = await Product.findById(req.params.id)
        if(data){
            return res.status(200).send({
                msg: "Produkt nalezen",
                payload: data,
            });
        };
      res.status(500).send({
        msg: "Produkt nebyl nalazen",
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
        const data = new Product({
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity,
            smallDescription: req.body.smallDescription,
            description: req.body.description,
        });
        const result = await data.save();
        if (result){
            return res.status(201).send({
                msg: "Produkt byl vytvořen",
                payload: data,
            });
        };
        res.status(500).send({
            msg: "Produkt nebyl nalezen",
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
        const data = {
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
              payload: result,
            });
          }
        if(data)
        res.status(500).send({
            msg: "Produkt nebyl nalezen",
        })
    } catch (error) {
        res.status(500).send({
            error
        })
    }
}

exports.patchProduct = async (req, res) => {
    try {
    const update = {};
    for (const ops of req.body){
        update[ops.propName] = ops.value;
    }
    const result = await Product.findByIdAndUpdate(req.params.id, update)
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
        const data = await Product.findByIdAndDelete(req.params.id)
        if(data){
            return res.status(200).send({
                msg: "Produkt byl odstraněn",
                payload: data,
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
