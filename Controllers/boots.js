const Boot = require("../models/boots");

exports.getAllBoots = async (req, res) => {
  try {
    const data = await Boot.find();
    if (data && data.lenght !== 0) {
      return res.status(200).send({
        msg: "Boty nalezeny",
        payload: data,
      });
    }
    res.status(500).send({
      msg: "Boty nebyly nalazeny",
    });
  } catch (error) {
    res.status(500).send({
      error,
    });
  };
};

exports.getBootByID = async (req, res) => {
    try {
        const data = await Boot.findById(req.params.id)
        if(data){
            return res.status(200).send({
                msg: "Boty nalezeny",
                payload: data,
            });
        };
      res.status(500).send({
        msg: "Boty nebyly nalazeny",
      });  
    } 
    catch (error) {
        res.status(500).send({
            error
        });
    };
};

exports.createBoot = async (req, res) => {
    try {
        const data = new Boot({
            bootsName: req.body.bootsName,
            color: req.body.color,
            size: req.body.size,
            style: req.body.style,
            bootsDescription: req.body.bootsDescription,
            brand: req.body.brand,
        });
        const result = await data.save();
        if (result){
            return res.status(201).send({
                msg: "Boty byly vytvořeny",
                payload: data,
            });
        };
        res.status(500).send({
            msg: "Boty nebyly nalezeny",
        });
    }
    catch (error) {
        res.status(500).send({
            error
        });
    };
};

exports.updateBoot = async (req, res) => {
    try {
        const data = {
            bootsName: req.body.bootsName,
            color: req.body.color,
            size: req.body.size,
            style: req.body.style,
            bootsDescription: req.body.bootsDescription,
            brand: req.body.brand,
        }
        const result = await Boot.findByIdAndUpdate(req.params.id, data)
        if (result) {
            return res.status(201).send({
              msg: "Boty byly aktualizovány",
              payload: result,
            });
          }
        if(data)
        res.status(500).send({
            msg: "Boty nebyly nalezeny",
        })
    } catch (error) {
        res.status(500).send({
            error
        })
    }
}

exports.patchBoot = async (req, res) => {
    try {
    const update = {};
    for (const ops of req.body){
        update[ops.propName] = ops.value;
    }
    const result = await Boot.findByIdAndUpdate(req.params.id, update)
        if(result){
            return res.status(201).send({
                msg: "Boty patched",
                createdBoot: {
                    url: `http://localhost:3000/boots/${result._id}`,
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

exports.deleteBoot = async (req, res) => {
    try {
        const data = await Boot.findByIdAndDelete(req.params.id)
        if(data){
            return res.status(200).send({
                msg: "Boty byly odstraněny",
                payload: data,
            })
        }
        res.status(500).send({
            msg: "Boty Failed"
        })
    } catch (error) {
        res.status(500).send({
            error
        })
    }
}
