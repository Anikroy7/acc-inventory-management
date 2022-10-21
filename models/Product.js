
const mongoose = require("mongoose")

// schema design

const productSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Please provide a name of this product'],
        trim: true,
        minLength: [3, 'Name must be at least 3 characters'],
        maxLength: [30, "Name is too long"],
        unique: [true, "Product name must be unique"]
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        minLength: [0, "Price couldn't be negative"]
    },
    unit: {
        type: String,
        required: true,
        enum: {
            values: ['pcs', 'kg', 'ltr'],
            message: "Unit value can't be {VALUE} must be kg/lg/pcs"
        }
    },

    quantity: {
        type: Number,
        required: true,
        min: [0, "Quantity can't be nagative"],
        validate: {
            validator: (value) => {
                const isInteger = Number.isInteger(value);
                if (isInteger) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        message: "Quantity must be an integer"
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ['in-stock', 'out-of-stock', 'discontinued'],
            message: "Status can't be {VALUE    }"
        }
    },
    /*     createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        } */
    /*   supplier: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Supplier"
      },
      categories: [{
          name: {
              type: String,
              required: true,
          },
          _id: mongoose.Schema.Types.ObjectId
      }] */

}, {
    timestamps: true,
})

// mongoose middleware for saving data: pre/post

// ------> pre
productSchema.pre('save', function (next) {
    console.log('Before saving data');

    if (this.quantity == 0) {
        this.status = "out-of-stock-f"
    }

    next()
})

// ------->post
productSchema.post('save', function (doc, next) {
    console.log('After saving data');
    console.log(doc, "this is doc");
    next()
})


// inject methods to productSchema
productSchema.methods.logger = function () {
    console.log(`Data save for ${this.name}`);

}


// Schema -> model -> Query

const Product = mongoose.model('Product', productSchema);


module.exports = Product;